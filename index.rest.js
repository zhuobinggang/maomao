const express = require('express')
const app = express()
app.use(express.static('static'))
const jwt = require('jwt-simple')
const db = require('./db/sqlite')
const mercari = require('./spiders/merica_item_spider')
const secret = 'maomao.org by kobako'

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