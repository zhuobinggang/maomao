const cheerio = require('cheerio')


function testImgSrcParse(){
  const html = `<ul class="ProductImage__thumbnails">
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="1"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356392rdnd6c45953.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像1"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="2"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356396rpr0pt68726.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像2"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="3"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356400bdikw445501.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像3"></a></li>
  <li class="ProductImage__thumbnail is-on"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="4"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356405jgyqqq45427.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像4"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="5"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-15753564085ocxwd45903.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像5"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="6"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-15753564105lbxst48272.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像6"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="7"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356413uukdvf68375.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像7"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="8"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356416n5iino16922.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像8"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="9"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356419foeiaa45743.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像9"></a></li>
  <li class="ProductImage__thumbnail"><a href="#" class="ProductImage__link rapid-noclick-resp" onclick="javascript:ins.beaconClick('l-main','thumb',this.getAttribute('data-rapid_p'));" data-ylk="rsec:aimg;slk:thumb;pos:1" data-rapid_p="10"><img src="https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0512/users/f24a3fc98495d3ce6060a1164a9d13cb192eb8ac/i-img640x480-1575356423ccqlhs45995.jpg" width="107" alt="Nikon FM3A ボディ ジャンク☆彡_画像10"></a></li>
  </ul>`;
  
  const $ = cheerio.load(html);
  $('.ProductImage__thumbnail').each((id, item) => {
		const img = $(item).find('img')
		console.log(img.attr('src'))	
	})
}

testImgSrcParse()


