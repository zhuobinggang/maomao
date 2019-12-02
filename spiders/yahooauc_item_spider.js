const cheerio = require('cheerio')
const axios = require('axios')

function syncGetItemInfo(aid){
  return axios.get(`https://page.auctions.yahoo.co.jp/jp/auction/${aid}`).then((req,res) => {
    const $ = cheerio.load(res.data)
  })
}

module.exports = {
  syncGetItemInfo
}