const express = require('express')
const app = express()
app.use(express.static('static'))
const jwt = require('jwt-simple')
const db = require('./db/sqlite')
const mercari = require('./spiders/merica_item_spider')
const secret = 'maomao.org by kobako'
const U = require('./utils')

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/login', (req, res) => {
  const user = req.body['user']
  const pass = req.body['pass']
  return db.isUserExist(user, pass).then(exist => {
    if(exist){
      res.status(200).send(jwt.encode({user,pass}, secret))
    }else{
      res.status(404).send()
    }
  })
})

app.post('/user/register', (req, res) => {
  if(G.IS_TEST_ENV){
    setSessionUserInfo(req, 'kobako', 'kobako')
    res.json({ok: 1, msg: '測試環境'})
  }else{

  }
})

const validators = {
  username: /[_a-zA-Z]\w{7,15}/,
  password: /[_a-zA-Z]\w{7,15}/,
}

function isValidInput(input){
  if(!validators.username.test(input.username)){
    console.info('用戶名必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(!validators.password.test(input.password)){
    console.info('密碼必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(input.nick.length < 2 || input.nick.length > 8){
    console.info('昵稱必須為: 2到8位')
    return false
  }else{
    return true
  }
}

app.post('/register', (req, res) => {
  const username = req.body['username']
  const nick = req.body['nick']
  const password = req.body['password']
  //用正則對用戶信息進行限制
  if(isValidInput({username, nick, password})){
    //Md5
    const md5Pass = U.md5hex(password)
    knex('user').where({username}).then(users => {
      if(users.length > 0){ //Repeated
        res.status(400).send('用户名重复')
      }else{
        const sql = `insert into user(nick, username, password, created_time, updated_time) values(?, ?, ?, datetime("now"), datetime("now"))`;
        //使用prepared parameter防止sql注入
        return knex.raw(sql, [nick, username, md5Pass]).then(() => {
          setSessionUserInfo(req, username, nick)
          res.status(200).send()
        })
      }
    })
  }else{
    res.status(400).send('輸入不符合規範, 請重新檢查')
  }
})

app.get('/dd', (req,res) => {
  res.send('dd')
})

app.get('/username', (req, res) => {
  const token = req.query['jwt']
  try{
    const {user} = jwt.decode(token, secret)
    res.send(user)
  }catch(e){
    res.status(404).send()
  }
})

app.get('/visits/count', (req, res) => {
  db.getViewCount().then(count => {
    console.log(count)
    res.status(200).send(String(count))
  })
})

app.get('/mercari/search/keyword/:keyword/page/:page', (req, res) => {
  const keyword = req.params['keyword'];
  const page = req.params['page'] || 1;
  mercari.getSearchResult(keyword, page).then(result => {
    res.json(result)
  })
})

app.get('/mercari/item/:mid', (req, res) => {
  const id = req.params['mid'];
  if(mercari.isValidId(id)){
    mercari.getItemInfo(id).then(info => {
      if(info.err){
        res.status(404).send(info.err)
      }else{
        res.json(info)
      }
    })
  }else{
    res.status(404).send('Bad id provied')
  }
})

app.listen(8089, () => console.log('The refactored express '))