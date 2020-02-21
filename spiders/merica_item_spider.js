const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const HEADER = {
  'User-Agent': 'Mozilla/5.0',
  // !Important, we will receive 403 resp without this
  'Accept-encoding': 'gzip, deflate, br',
  // 'Accept-language': 'zh-CN,zh;q=0.9,ja;q=0.8,zh-TW;q=0.7,la;q=0.6',
}

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

function getImgsOnLocal(orgImgs, targetFoldPathExist, httpPrefix='/temp_imgs/'){
  const promises = orgImgs.map(orgSrc => {
    const name = orgSrc.match(/(m[0-9]{8,}.*jpg)/)[0]
    const pathOnServer = targetFoldPathExist + name
    const httpSrc = httpPrefix + name

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
    headers: HEADER
  }).then((res) => {
    const $ = cheerio.load(res.data)
    const itemName = $('.item-name').text()
    const itemWording = $('.item-wording').text()
    const itemPrice = $($('.item-price')[0]).text()
    const itemTax = $($('.item-tax')[0]).text()
    const itemShippingFee = $($('.item-shipping-fee')[0]).text()
    const itemDescription = $('.item-description-inner').text()
    const likes = $('span[data-num="like"]').text()
    const sold = $($('.item-buy-btn')[0]).text() == '売り切れました'
    const orgImgs = (() => {
      const result = []
      $('.owl-item-inner').each((id, item) => {
        const img = $(item).find('img')
        result.push(img.attr('data-src'))
      })
      return result
    })();

    // 需要对图片进行代理
    return getImgsOnLocal(orgImgs, './static_storage/temp_imgs/').then(imgs => {
      return {itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes, imgs, sold}
    })
  }).catch(err => {
    return Promise.resolve({
      err: '商品id不正确',
    })
  })
}

function extractedMid(str){
  if(str == null){
    return null;
  }else return str.match(/(m[0-9]{8,})/)[0]
}

function getSearchResult(keyword='', page=1){
  keyword = keyword.replace(' ', '+')
  const url = `https://www.mercari.com/jp/search/?page=${page}&keyword=${keyword}`
  console.log(url)
  return axios.get(encodeURI(url), {
    headers: HEADER
  }).then(res => {
    const result = {items: []};
    const $ = cheerio.load(res.data)
    $('.items-box').each((id, item) => {
      const orgSrc = $($(item).find('img')).attr('data-src')
      const price = $($(item).find('.items-box-price')).text()
      const sold = $(item).find('figcaption').length > 0;
      const mid = extractedMid($($(item).find('a')).attr('href'))
      result.items.push({orgSrc, price, sold, mid})
    })

    //为result添加分页信息
    result.currentPage = $($('.pager-cell.active')[0]).text().trim() || 1;
    result.hasNextPage = (() => {
      let flag = false
      const nextPage = parseInt(result.currentPage) + 1;
      $('.pager-cell').each((id, item) => {
        if($(item).text().trim() == nextPage){
          flag = true
        }
      })
      return flag
    })()

    return result
  }).then(result => {
    //Replace orgin src with local img src
    const orgSrcs = result.items.map(item => {return item.orgSrc})
    return getImgsOnLocal(orgSrcs, './static_storage/temp_thumb_imgs/', '/temp_thumb_imgs/').then(localSrcs => {
      localSrcs.forEach((src, id) => {
        result.items[id].src = src
      })
      return result
    })
  })
}

function isValidId(mid){
  return /(m[0-9]{8,})/.test(mid)
}

module.exports = {
  getItemInfo,
  getSearchResult,
  isValidId,
}