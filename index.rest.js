const express = require('express')
const app = express()
app.use(express.static('static'))
const jwt = require('jwt-simple')
const secret = 'maomao.org by kobako'
const db = require('./db/sqlite')

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
  const token = req.params['jwt']
  try{
    const {user, pass} = jwt.decode(token, secret)
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

app.listen(8088, () => console.log('The refactored express '))