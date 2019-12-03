const axios = require('axios')
const fs = require("fs");
const cheerio = require('cheerio')

function getData(){
  //axios.get('https://auctions.yahoo.co.jp/')
  return axios.get('https://page.auctions.yahoo.co.jp/jp/auction/q331259778')
    .then(res => {
      return res.data;
        
      });
}

function cheerioParseAndShow(){
  getData().then(data => {
    const $ = cheerio.load(data);
    const info = {
      title: $('.ProductTitle__text').text(),
      price: $('.Price__value').text().trim(),
      tax: $('.Price__tax').text(),
      remainedTime: $('.StickyNavigation__number').text().replace('詳細','').trim(),
      explain: $('.ProductExplanation__commentBody').text().trim(),
    }
    console.log(JSON.stringify(info))
  })
}

function writeHtmlToFile(html){
    try {
      fs.writeFileSync("yahooauc.txt", html);
      console.log('write end');
    }catch(e){
      console.log(e);
    }
}

function printInfoFetchByAxios(){
  axios.get('https://page.auctions.yahoo.co.jp/now?aID=g389045696&nowtime=' + new Date().getTime()).then(res => {
    console.log(res.data)
  })
}

//cheerioParseAndShow();
//getData().then(data => { writeHtmlToFile(data) })
//printInfoFetchByAxios()
