const express = require('express')
const app = express()
const jwt = require('jwt-simple')
const secret = 'maomao.org by kobako'

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/login', (req, res) => {
  const user = req.body['user']
  const pass = req.body['pass']
  return isUserExist().then(exist => {
    if(exist){
      res.status(200).json({
        jwt: jwt.encode({user,pass}, secret)
      })
    }else{
      res.status(404).send()
    }
  })
})

app.listen(8088, () => console.log('The refactored express '))