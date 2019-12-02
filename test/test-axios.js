const axios = require('axios')
//var fs = require("fs");
const cheerio = require('cheerio')

function getData(){
  //axios.get('https://auctions.yahoo.co.jp/')
  return axios.get('https://page.auctions.yahoo.co.jp/jp/auction/q331259778')
    .then(res => {
      return res.data;
        // let text = '';
        // Object.getOwnPropertyNames(res).map(name => {
          // text += name + ': \n\r';
          // text += res[name] + '\n\r --------------------------------- \n\r';
        // })
        // try {
          // fs.writeFileSync("yahooauc.txt", text);
          // console.log('write end');
        // }catch(e){
          // console.log(e);
        // }
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

cheerioParseAndShow();
