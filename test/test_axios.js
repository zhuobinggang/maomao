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

function downLoadImg(src, targetPath){
  return axios({
    method: "get",
    url: src,
    responseType: "stream"
  }).then(function (response) {
      response.data.pipe(fs.createWriteStream(targetPath));
      return Promise.resolve('All down')
  });
}

function getImgsOnLocal(orgImgs, targetFoldPathExist){
  const promises = orgImgs.map(orgSrc => {
    const name = orgSrc.match(/(m[1-9].*jpg)/)[0]
    const pathOnServer = targetFoldPathExist + name
    const httpSrc = '/temp_imgs/' + name

    return new Promise((resolve, reject) => {
      if(!fs.existsSync(pathOnServer)){
        return downLoadImg(orgSrc, pathOnServer).then(() => {
          console.log('I have download a file!')
          resolve(httpSrc)
        })
      }else{
        resolve(httpSrc)
      }
    })
  })

  return Promise.all(promises)
}

// console.log(__dirname)

//cheerioParseAndShow();
//getData().then(data => { writeHtmlToFile(data) })
//printInfoFetchByAxios()
//downLoadImg('https://static.mercdn.net/item/detail/orig/photos/m43599908368_1.jpg?1550198222', './temp/fuck.jpg')

const imgs = [
  'https://static.mercdn.net/item/detail/orig/photos/m43599908368_2.jpg?1550198222',
  'https://static.mercdn.net/item/detail/orig/photos/m43599908368_3.jpg?1550198222'
]
getImgsOnLocal(imgs, './temp/').then(srcs => {
  console.log(srcs)
})
