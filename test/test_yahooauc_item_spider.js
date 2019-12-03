const spider = require('../spiders/yahooauc_item_spider')

spider.getWholeItemInfo('g389045696', new Date().getTime()).then(info => {
  console.log(JSON.stringify(info))
})

