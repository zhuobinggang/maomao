const cheerio = require('cheerio')
const axios = require('axios')

function getItemInfo(itemId){
  return axios.get(`https://item.mercari.com/jp/${itemId}/`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      // 'Cookie': 'PHPSESSID=rknpmnslog20jn37fj1t7n0db1; MJP_SID=159a0280e7e2770ac8025dcce07b29dc; mwfv=never; merCtx=""; _ga=GA1.2.228326440.1575122486; _gcl_au=1.1.1871803825.1575122487; _gid=GA1.2.1569836138.1575798801; _gcl_aw=GCL.1575806683.CjwKCAiA27LvBRB0EiwAPc8XWRehHlmjG9K60e77L0HxvJnQBWQD8gSyrO-ZLyDBPeOYYKZsZiwTCRoCwAMQAvD_BwE; _gac_UA-50190241-1=1.1575806685.CjwKCAiA27LvBRB0EiwAPc8XWRehHlmjG9K60e77L0HxvJnQBWQD8gSyrO-ZLyDBPeOYYKZsZiwTCRoCwAMQAvD_BwE; _gat=1',
      'Accept-encoding': 'gzip, deflate, br',
      // 'Accept-language': 'zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7,la;q=0.6',
    }
  }).then((res) => {
    console.log('mother fucker')
    const $ = cheerio.load(res.data)
    const itemName = $('.item-name').text()
    const itemWording = $('.item-wording').text()
    const itemPrice = $($('.item-price')[0]).text()
    const itemTax = $($('.item-tax')[0]).text()
    const itemShippingFee = $($('.item-shipping-fee')[0]).text()
    const itemDescription = $('.item-description-inner').text()
    const likes = $('span[data-num="like"]').text()
    return {itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes}
  })
}

module.exports = {
  getItemInfo
}