const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

function downLoadImg(src, targetPath){
  return axios({
    method: "get",
    url: src,
    responseType: "stream"
  }).then(function (response) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(targetPath)
      response.data.pipe(ws);
      ws.on('finish', () => {
        resolve('All done')
      })
    })
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
    const orgImgs = (() => {
      const result = []
      $('.owl-item-inner').each((id, item) => {
        const img = $(item).find('img')
        result.push(img.attr('data-src'))
      })
      return result
    })();

    // 需要对图片进行代理
    return getImgsOnLocal(orgImgs, './static/temp_imgs/').then(imgs => {
      return {itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes, imgs}
    })
  }).catch(err => {
    return Promise.resolve({
      err: '商品id不正确',
    })
  })
}

module.exports = {
  getItemInfo
}