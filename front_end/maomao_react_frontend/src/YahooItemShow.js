import React from 'react';
import { ActivityIndicator, SearchBar, WingBlank, NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
import BottomPriceShow from './components/BottomPriceShow'
const $ = require('jquery');

class YahooItemShow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      itemInfo: null,
      loading: false,
    }
  }

  componentDidMount = () => {
    if(this.props.itemId != null){
      this.getItemInfo(this.props.itemId).then(this.renderItemInfo)
      this.setState({
        itemId: this.props.itemId,
      })
    }
  }

  getItemInfo = (aid) => {
    // return Promise.resolve({
    //   title: '[O-12.2] Canon 7 シャッターOK フィルムカメラ レンジファインダー 比較的良品 売り切り 一眼レフ',
    // })
    this.setState({
      loading: true
    })
    return new Promise((resolve, reject) => {
      $.get(`/auction/${aid}`, res => {
        this.setState({
          loading: false
        })
        resolve(res)
      })
    })
  }

  renderItemInfo = (info) => {
    window.fuck = info
    console.log('check fuck')
    this.setState({
      itemInfo: info
    })
  }
  
  isValidItem(){
    return this.state.itemInfo != null && this.state.itemInfo.err == null;
  }

  isAidWrong(){
    return this.state.itemInfo != null && this.state.itemInfo.err != null;
  }

  extractedLeftTimeInfo(timeLeft){
    var day = Math.floor(timeLeft / 86400);
    var hour = Math.floor((timeLeft - day * 86400) / 3600);
    var min = Math.floor((timeLeft - (day * 86400) - (hour * 3600)) / 60);
    var sec = timeLeft - (day * 86400) - (hour * 3600) - (min * 60);
    return {
      day, hour, min, sec
    }
  }

  timeLeftText = (timeLeft) => {
    if(timeLeft < 1){
      return '已结束'
    }else{
      const timeInfo = this.extractedLeftTimeInfo(timeLeft)
      return `${timeInfo.day} 天 ${timeInfo.hour} 小时 ${timeInfo.min} 分钟 ${timeInfo.sec} 秒`
    }
  }

  priceTextToPrice = (priceText) => {
    const noTax = priceText.search('税 0 円') > 0
    const orgPrice = (() => {
      if(noTax){
        return parseInt(priceText.trim().replace('円（税 0 円）', '').replace(',', ''))
      }else{
        return parseInt(priceText.substr(priceText.search('税')).replace('税込 ', '').replace(' 円）', '').replace(',', ''))
      }
    })()
    const price = Math.floor(parseFloat(orgPrice * 0.065))
    return price
  }

  priceToRmb = (priceText, buyNowPriceText) => {
    const current = `當前${this.priceTextToPrice(priceText)}`
    let buyNow = ''
    if(buyNowPriceText.length > 0){
      buyNow = ` / 一口價${this.priceTextToPrice(buyNowPriceText)}`
    }
    return current + buyNow
  }

  render(){
    return (

      <div>
        {/* <SearchBar onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={8} /> */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.navToHome()}
        >雅虎商品查看器</NavBar><WhiteSpace/>

        <WingBlank> <div className="contents">
          <SearchBar value={this.state.itemId} onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={15} onChange={(newId) => {
            this.setState({
              itemId: newId,
            })
          }} />
          <div className={this.state.loading ? 'visible': 'invisible'}><ActivityIndicator animating /><WhiteSpace/></div>
          <WhiteSpace size='lg' />
          {(() => {
            if(this.isValidItem()){
              return (<div>
                <div className='title'>{this.state.itemInfo.title}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'当前价格: ' + this.state.itemInfo.price}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>一口價: {this.state.itemInfo.buyNowPrice.length < 1 ? '賣家未設置一口價' : this.state.itemInfo.buyNowPrice}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'剩余时间: ' + this.timeLeftText(this.state.itemInfo.remainedTime)}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <Carousel
                  autoplay={false}
                  infinite
                >
                  {
                    this.state.itemInfo.imgs.map(imgSrc => {
                      return (<img key={imgSrc} style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                        onClick={() => {
                          window.open(imgSrc)
                        }}
                        src={imgSrc}></img>)
                    })
                  }
                </Carousel>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{this.state.itemInfo.explain}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>附加信息: </div>
                <div className='sub-title'>{this.state.itemInfo.moreInfo}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>分享鏈接: maomaojp.org:8088/?aid={this.state.itemId}</div>
              </div>)
            }else if(this.isAidWrong()){
              return (<div className='title'>没有这个商品! 请检查商品id是否正确</div>)
            }else{
              return (<div></div>)
            }
          })()}
        </div> </WingBlank>
        {(() => {
          if(this.isValidItem()){
            return <BottomPriceShow price={this.priceToRmb(this.state.itemInfo.price, this.state.itemInfo.buyNowPrice)}></BottomPriceShow>
          }else{
            return <div/>
          }
        })()}
      </div>
    )
  }
}

export default YahooItemShow;