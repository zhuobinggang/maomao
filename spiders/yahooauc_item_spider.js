const cheerio = require('cheerio')
const axios = require('axios')

function getItemInfo(aid){
  return axios.get(`https://page.auctions.yahoo.co.jp/jp/auction/${aid}`).then((res) => {
    const $ = cheerio.load(res.data)
    const info = {
      title: $('.ProductTitle__text').text(),
      price: $('.Price--current .Price__value').text().trim(),
      buyNowPrice: $('.Price--buynow .Price__value').text().trim(),
      moreInfo: $('.ProductProcedures').text().trim(),
      // postageValue: $('.Price__postageValue').text(),
      explain: $('.ProductExplanation__commentBody').text().trim(),
      imgs: (() => {
        const result = []
        $('.ProductImage__inner').each((id, item) => {
          const img = $(item).find('img')
          result.push(img.attr('src'))
        })
        return result
      })(),
    }
    return info
  })
}

function getRemainedTime(aid, nowTime){
  return axios.get(
    `https://page.auctions.yahoo.co.jp/now?aID=${aid}&nowtime=${nowTime}`
    ).then(({data}) => {
    return data
  })
}

function getWholeItemInfo(aid, nowTime = new Date().getTime()){
  return Promise.all([getRemainedTime(aid, nowTime), getItemInfo(aid)]).then(([remainedTime, infoWithoutTime]) => {
    const info = infoWithoutTime
    info.remainedTime = remainedTime
    // const parsedTime = extractedLeftTimeInfo(remainedTime)
    // info.parsedTimeString = `剩余时间: ${parsedTime.day}天 ${parsedTime.hour}时 ${parsedTime.min}分 ${parsedTime.sec}秒 `
    // console.log(info.parsedTimeString)
    
    return info
  }).catch(err => {
    return Promise.resolve({
      err: 'AID不正确',
    })
  });
}

function extractedLeftTimeInfo(timeLeft){
    var day = Math.floor(timeLeft / 86400);
    var hour = Math.floor((timeLeft - day * 86400) / 3600);
    var min = Math.floor((timeLeft - (day * 86400) - (hour * 3600)) / 60);
    var sec = timeLeft - (day * 86400) - (hour * 3600) - (min * 60);
    return {
      day, hour, min, sec
    }
}

module.exports = {
  getWholeItemInfo, extractedLeftTimeInfo
}