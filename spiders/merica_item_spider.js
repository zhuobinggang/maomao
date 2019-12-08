const cheerio = require('cheerio')
const axios = require('axios')

function getItemInfo(itemId){
  return axios.get(`https://item.mercari.com/jp/${itemId}/`, {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'}
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