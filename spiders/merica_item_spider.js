const cheerio = require('cheerio')
const axios = require('axios')

function getItemInfo(itemId){
  return axios.get(`https://item.mercari.com/jp/${itemId}/`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      // !Important, we will receive 403 resp without this
      'Accept-encoding': 'gzip, deflate, br',
      // 'Accept-language': 'zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7,la;q=0.6',
    }
  }).then((res) => {
    const $ = cheerio.load(res.data)
    const itemName = $('.item-name').text()
    const itemWording = $('.item-wording').text()
    const itemPrice = $($('.item-price')[0]).text()
    const itemTax = $($('.item-tax')[0]).text()
    const itemShippingFee = $($('.item-shipping-fee')[0]).text()
    const itemDescription = $('.item-description-inner').text()
    const likes = $('span[data-num="like"]').text()
    const imgs = (() => {
      const result = []
      $('.owl-item-inner').each((id, item) => {
        const img = $(item).find('img')
        result.push(img.attr('data-src'))
      })
      return result
    })();

    return {itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes, imgs}
  }).catch(err => {
    return Promise.resolve({
      err: '商品id不正确',
    })
  })
}

module.exports = {
  getItemInfo
}