const express = require('express')
const yahooAucSpider = require('./spiders/yahooauc_item_spider')
const app = express()
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    msg: 'this is msg from index.js'
  })
})

app.get('/auction/:aid', (req,res) => {
  const aid = req.params['aid']
  res.render('item', {
    title: 'dd',
    price: 9999
  })
  // yahooAucSpider.getWholeItemInfo(aid).then(info => {
    // res.render('item', info)
  // })
})


app.listen(8088, () => console.log('Example app listening on port 3000!'))