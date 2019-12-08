const spider = require('../spiders/merica_item_spider')

spider.getItemInfo('m68919183505').then(info => {
  console.log(JSON.stringify(info))
}).catch(err => {
  console.log(err)
})
