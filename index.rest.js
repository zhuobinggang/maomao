const express = require('express')
const app = express()
app.use(express.static('static'))
app.use(express.static('static_storage'))
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

  return db.getUsersByUsernameAndPass(user, pass).then(results => {
    if(results.length < 1){
      res.status(404).send()
    }else{
      const {username, nick} = results[0];
      res.status(200).send(U.jwtFromObject({user: username,nick}, secret));
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
    db.getUsersByName(username).then(users => {
      if(users.length > 0){ //Repeated
        res.status(400).send('用户名重复')
        return false
      }else{
        //使用prepared parameter防止sql注入
        return db.insertUser(nick, username, md5Pass).then(() => {
          res.status(200).send()
        })
      }
    }).catch(e => {
      res.status(500).send('用户名重复')
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
    const payload = U.payloadFromJwt(token, secret);
    const {user,nick} = payload;
    res.send(nick)
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
  const payload = U.payloadFromJwt(req.query('jwt'));
  const username = payload ? payload.user : '';
  return db.insertSearch(keyword, username).then(() => {
    return mercari.getSearchResult(keyword, page)
  }).then(result => {
    res.json(result);
  }).catch(err => {
    console.error('Maybe insert search or get search result failed');
    res.status(400).send('Something wrong with the server');
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

app.post('/views', (req, res) => {
  db.incViewCount(req.ip).then(() => {
    res.status(200).send()
  }).catch(() => {
    res.status(500).send()
  })
})

app.get('/search/stastics', (req, res) => {
  res.status(200).json([
    {name: 'dd', num: 11}, 
    {name: 'bb', num: 9}, 
    {name:'cc', num: 5},
  ])
})



app.listen(8089, () => console.log('The refactored express '))
