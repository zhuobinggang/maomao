const express = require('express')
const yahooAucSpider = require('./spiders/yahooauc_item_spider')
const mercariSpider = require('./spiders/merica_item_spider')
const G = require('./global')
const U = require('./utils')
const stastics = require('./stastics')
const compression = require('compression')
const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './maomao.sqlite'
  })
});
const session = require('express-session')
const mailer = require('./mailer')

const app = express()

//MemoryStore Session
app.use(session({
  resave: true, saveUninitialized: true,
  unset: 'destroy', secret: 'maomaojb', cookie: { maxAge: 1000 * 60 * 30 /** 30min */ },
}))

app.use(compression()) //GZIP
app.use(express.static('static'))

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('/stastics/view', (req, res) => {
  if(G.IS_TEST_ENV){
    res.send({count: 99999})
  }else{
    stastics.incViewCount(req.ip).then(stastics.getTodayViewCnt).then(count => {
      res.send({count})
    })
  }
})

app.get('/auction/:aid', (req,res) => {
  const aid = req.params['aid']

  if(G.IS_TEST_ENV){
    const mockData = {"title":"Nikon FM3A ボディ ジャンク☆彡","price":"25,722円（税 0 円）","explain":"Nikon FM3A ボディ ジャンク☆彡商品説明 アクセスありがとうございます。当方、専門家では無い為、専門的な質問には答えらえないことがございますのでご了承ください。仕事の合間を見て、出品しておりますのでご質問に回答できない場合が多々ございます。《出品商品》Nikon FM3A ボディ ジャンク☆彡224055《商品状態》★【重要項目】必ずお読みください動作未確認に付ジャンクファインダーはクリアです☆彡裏蓋と巻上げレバーにキズ、スレが見受けられます。上記ご理解頂けるお方のみご入札お願い致します。画像の通り良いお品物で御座います。即座にご決済・受取連絡も即座に対応して頂けるお方のみ!!落札後即座にご決済、受取連絡も即座にして頂けるお方のみご入札の程お願い致します。速やかに対応出来ないお方はご遠慮願います。素人ですので専門的なご質問にはお答えできない場合がございます。画像を良くご確認頂き、納得頂いた上での入札をお願い致します。神経質なお方のご入札はお控え下さいませ。不具合があった場合は落札者様にてメンテナンスの程宜しくお願い致します。※ノークレームノーリターンにてお願い致します。　★【重要項目】必ずお読みください画像を良くご覧になられてご入札の程、宜しくお願い致します即座に発送致します☆彡【重要項目】※24時間以内にご決済お願い致します!!    ※受取連絡も速やかにお願い致します。　24時間以内にご決済頂けない場合は落札者様都合という事で　キャンセルとさせて頂きます。イタズラ多発のため(評価98点未満のお方・半年以内に悪い評価が付いておられる方　半年間お取り引きの無いお方・新規のお方) はこちらで入札削除させて頂きますので悪し　からずご了承願います。※どうしてもというお方は質問よりお願い致します。★単体でのお取り引きとなりますので他のお品物との同梱はご遠慮願います。☆彡おてがる版の発送は致しておりません!!　　　ゆうパック60サイズ発送    　お互いのトラブル防止のため、落札してからのキャンセルは一切受け付けておりませんので、よくお考えになってからご入札下さい。※現状渡しでご理解頂けるお方のみご入札お願い致します。※神経質なお方のご入札はご遠慮願います。　　※落札後間違ってしまったとかの申し出がございますが、キャンセルの申し出が　ございましてもお受けいたしませんので悪しからずご了承下さい　　しっかりと内容をご確認の上ご入札の程宜しくお願い致します。※確認後即お送り致します。注意事項 ≪注意事項≫ 納品書のご要望や領収書のご要望には対応できません事をご理解の上、ご入札ください。紛失保証が無い発送をご希望の方はご自身責任でご依頼ください。紛失事故の責任は一切、ご対応は出来ません。※迅速なお取引が可能な方、ご入札をお願い致します。また、御落札後に評価が不要な方は、当方へ評価をしないでください。評価をいただいた方に評価をさせて戴いていますのでよろしくお願いします。お支払方法 簡単決済その他 当方から最初のご連絡後、即座にご決済頂けるお方のみご入札願いますご落札後24時間以内にご決済頂けない場合は、落札者様都合という事でキャンセルとさせて頂きます。※ご入金確認後即座に発送致します。発送詳細 ≪発送≫　　　　　　※指定の発送方法のみとなります　　　　　　　ゆうパック60サイズ発送                            [ゆうパック]◆千葉県発 料金サイズ県内北海道東北関東信越北陸東海近畿中国四国九州沖縄千葉県北海道青森県岩手県秋田県宮城県山形県福島県茨城県栃木県群馬県埼玉県千葉県東京都神奈川県山梨県新潟県長野県富山県石川県福井県静岡県愛知県三重県岐阜県滋賀県京都府大阪府兵庫県奈良県和歌山県鳥取県岡山県島根県広島県山口県香川県徳島県愛媛県高知県福岡県佐賀県大分県熊本県長崎県宮崎県鹿児島県沖縄県60サイズ810円1,300円870円870円870円870円870円970円1,100円1,100円1,300円1,350円* * * この案内は、商品案内が美しくなる\nいめーじあっぷで作成しました。 （無料）* * *","imgs":["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356392rdnd6c45953.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356396rpr0pt68726.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356400bdikw445501.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356405jgyqqq45427.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-15753564085ocxwd45903.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-15753564105lbxst48272.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356413uukdvf68375.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356416n5iino16922.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356419foeiaa45743.jpg","https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356423ccqlhs45995.jpg"],"remainedTime":169807};
    res.json(mockData)
  }else{
    yahooAucSpider.getWholeItemInfo(aid, new Date().getTime()).then(info => {
      res.json(info)
    })
  }
})

app.get('/mercari/:id', (req,res) => {
  const id = req.params['id']

  if(G.IS_TEST_ENV){
    const mockData = {"itemName":"BURBERRYBLUE LABELニーハイソックス","itemWording":"『BURBERRYBLUE LABELニーハイソックス』は、261回の取引実績を持つなおさんから出品されました。バーバリー ブルーレーベル（ソックス/レディース）の商品で、千葉県から2~3日で発送されます。","itemPrice":"¥1,900","itemTax":" (税込)","itemShippingFee":"送料込み","itemDescription":"ニーハイソックス(ベージュ)24㎝。\n数十年前に、西武のBURBERRYBLUE LABELで可愛いくて購入しました。可愛いすぎてはけず、、今に至ります。\n薄手の素材。\nシミや汚れは見当たりません。\n中古品、自宅保管にご理解のあるかたのご購入をお待ちしています。","likes":"1","imgs":["https://static.mercdn.net/item/detail/orig/photos/m49943271059_1.jpg?1575249631","https://static.mercdn.net/item/detail/orig/photos/m49943271059_2.jpg?1575249631","https://static.mercdn.net/item/detail/orig/photos/m49943271059_3.jpg?1575249631","https://static.mercdn.net/item/detail/orig/photos/m49943271059_4.jpg?1575249631"]};
    res.json(mockData)
  }else{
    mercariSpider.getItemInfo(id).then(info => {
      res.json(info)
    })
  }

})

app.get(`/mercari/search/keyword/:keyword/page/:page`, (req, res) => {
  if(G.IS_TEST_ENV){
    const mockItem = {"orgSrc":"https://static.mercdn.net/thumb/photos/m85127078642_1.jpg?1569063594","price":"¥140,700","sold":false,"mid":"m85127078642","src":"/temp_thumb_imgs/m85127078642_1.jpg"};
    const items = []
    for(let i = 0 ; i< 200; i++){
      items.push(mockItem)
    }
    return res.json({
      items,
      currentPage: 1,
      hasNextPage: true
    })
  }else{
    const keyword = req.params['keyword']
    const page = req.params['page']
    mercariSpider.getSearchResult(keyword, page).then(result => {
      res.json(result)
    })
  }
})

app.post('/mercari/search', (req, res) => {
  if(G.IS_TEST_ENV){
    const mockItem = {"orgSrc":"https://static.mercdn.net/thumb/photos/m85127078642_1.jpg?1569063594","price":"¥140,700","sold":false,"mid":"m85127078642","src":"/temp_thumb_imgs/m85127078642_1.jpg"};
    const items = []
    for(let i = 0 ; i< 200; i++){
      items.push(mockItem)
    }
    return res.json({
      items,
      currentPage: 1,
      hasNextPage: true
    })
  }else{
    const keyword = req.body['keyword']
    const page = req.body['page']
    mercariSpider.getSearchResult(keyword, page).then(result => {
      res.json(result)
    })
  }
})

const validators = {
  username: /[_a-zA-Z]\w{7,15}/,
  password: /[_a-zA-Z]\w{7,15}/,
}

function isValidInput(input){
  if(!validators.username.test(input.username)){
    console.info('用戶名必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(!validators.password.test(input.password)){
    console.info('密碼必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(input.nick.length < 2 || input.nick.length > 8){
    console.info('昵稱必須為: 2到8位')
    return false
  }else{
    return true
  }
}

app.post('/user/register', (req, res) => {
  if(G.IS_TEST_ENV){
    setSessionUserInfo(req, 'kobako', 'kobako')
    res.json({ok: 1, msg: '測試環境'})
  }else{
    const username = req.body['username']
    const nick = req.body['nick']
    const password = req.body['password']

    //用正則對用戶信息進行限制
    if(isValidInput({username, nick, password})){
      //Md5
      const md5Pass = U.md5hex(password)

      knex('user').where({username}).then(users => {
        if(users.length > 0){ //Repeated
          res.json({err: '用戶名已被使用'})
        }else{
          const sql = `insert into user(nick, username, password, created_time, updated_time) values(?, ?, ?, datetime("now"), datetime("now"))`;
          //使用prepared parameter防止sql注入
          return knex.raw(sql, [nick, username, md5Pass]).then(() => {
            setSessionUserInfo(req, username, nick)
            res.json({ok: 1})
          })
        }
      })
    }else{
      res.json({err: '輸入不符合規範, 請重新檢查'})
    }
  }
})

app.get('/getLoginInfo', (req,res) => {
  if(req.session.userinfo != null){
    return res.json({userinfo: req.session.userinfo})
  }else{
    return res.json({err: '您還沒有登錄'})
  }
})

function getUsersByUsernameAndPass(username, password){
  const md5Pass = U.md5hex(password)
  return knex('user').where({
    username, password: md5Pass
  })
}

app.post('/user/login', (req, res) => {
  const username = req.body['username']
  const password = req.body['password'] 

  return getUsersByUsernameAndPass(username, password).then(users => {
    if(users.length < 1){
      res.json({
        err: '錯誤的用戶名或密碼'
      })
    }else{ //Login successfully
      const user = users[0]
      req.session.userinfo = user
      res.json({
        ok: 1,
        msg: '登錄成功'
      })
    }
  })
})

function getOrdersByUserName(username){
  return knex('order').where({ username }).orderBy('created_time', 'desc')
}

app.get('/orders', (req, res) => {
  if(req.session.userinfo != null){
    return getOrdersByUserName(req.session.userinfo.username).then(orders => {
      res.json({orders})
    })
  }else{
    res.json({err: '您還沒有登錄'})
  }
})

function createOrder(username, title, url,  payinfoId, addressId,){
  const sql = 'insert into `order`(id, username, item_title, item_url, state, created_time, updated_time, payinfo_id, address_id) values(null, ?, ?, ?, 1, datetime("now"), datetime("now"), ?, ?)';
  return knex.raw(sql, [username, title, url, payinfoId, addressId])
}

function getOrderDetailById(id){
  return knex.where({
    'order.id': id
  }).from('order').leftJoin('payinfo', 'order.payinfo_id', 'payinfo.id').leftJoin('address', 'order.address_id', 'address.id');
}

function getLastOrderDetail(){
  return knex.select('*').from('order').leftJoin('payinfo', 'order.payinfo_id', 'payinfo.id').leftJoin('address', 'order.address_id', 'address.id').orderBy('id', 'desc').limit(1);
}

app.post('/buy', (req, res) => {
  //Check if logined
  if(req.session.userinfo != null){
    const username = req.session.userinfo.username
    const title = req.body['title']
    const url = req.body['url']
    const addressId = req.body['addressId']
    const payinfoId = req.body['payinfoId']
    return createOrder(username, title, url, payinfoId, addressId).then(() => {
      //Send mail to my email
      return getLastOrderDetail();
    }).then((orderDetails) => {
      const orderDetail = orderDetails[0];
      const detail = JSON.stringify(orderDetail);
      mailer.sendEmail('zhuobinggang@gmail.com', '有人買東西啦!', detail);
    }).then(() => {
      res.json({
        ok: 1
      })
    })
  }else{
    res.json({
      err: '您還沒登錄'
    })
  }
})

function createAddress(username, address){
  return knex('address').insert({
    username, address
  })
}

app.post('/address/add', (req, res) => {
  if(req.session.userinfo != null){
    const username = req.session.userinfo.username
    const address = req.body['address']
    return createAddress(username, address).then(() => {
      res.json({
        ok: 1
      })
    })
  }else{
    res.json({
      err: '您還沒登錄'
    })
  }
})

function createPayinfo(username, pay_method, pay_id){
  return knex('payinfo').insert({
    username, pay_method, pay_id
  })
}

app.post('/payinfo/add', (req, res) => {
  if(req.session.userinfo != null){
    const username = req.session.userinfo.username
    const pay_method = req.body['pay_method']
    const pay_id = req.body['pay_id']
    return createPayinfo(username, pay_method, pay_id).then(() => {
      res.json({
        ok: 1
      })
    })
  }else{
    res.json({
      err: '您還沒登錄'
    })
  }
})

function readAllAddress(username){
  return knex('address').where({username})
}

function readAllPayinfo(username){
  return knex('payinfo').where({username})
}

app.get('/address/list', (req, res) => {
  if(req.session.userinfo != null){
    const username = req.session.userinfo.username
    return readAllAddress(username).then(addresses => {
      res.json({addresses})
    })
  }else{
    res.json({
      err: '您還沒登錄'
    })
  }
})

app.get('/payinfo/list', (req, res) => {
  if(req.session.userinfo != null){
    const username = req.session.userinfo.username
    return readAllPayinfo(username).then(payinfos => {
      res.json({ payinfos})
    })
  }else{
    res.json({
      err: '您還沒登錄'
    })
  }
})

function updateOrderState(id, state){
  return knex('order').where({id}).update({state})
}

app.patch('/order/:id', (req, res) => {
  //TODO: 权限控制
  //用body获取对应的信息
  const id = req.params['id']
  const state = req.body['state']
  // console.log(id, state)
  return updateOrderState(id, state).then(() => {
    res.json({ ok: 1 })
  })
})

app.listen(8088, () => console.log('Example app listening on port 8088!'))

//Should be called when login or register successfully
function setSessionUserInfo(req, username ,nick){
  req.session.userinfo={username, nick }
}