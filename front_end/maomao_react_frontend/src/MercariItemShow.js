import React from 'react';
import { ActivityIndicator,Toast,Flex, SearchBar, WingBlank, NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
import BottomPriceShow from './components/BottomPriceShow'
import SelectPayinfoPage from './pages/SelectPayinfoPage'
import SelectAddressPage from './pages/SelectAddressPage'
const $ = require('jquery');


const tabs = {
  main: 1,
  selectPayinfo: 2,
  selectAddress: 3,
}

class MercariItemShow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      itemInfo: null,
      loading: false,
      currentTab: tabs.main,
    }
    this.payinfoId = null
    this.addressId = null
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.itemId != this.props.itemId && this.props.itemId != null){
      console.log('成功的嘗試')
      this.getItemInfo(this.props.itemId).then(this.renderItemInfo)
      this.setState({
        itemId: this.props.itemId,
      })
    }
  }

  validateItemId = () => {
    let id = this.state.itemId
    if(id == null){
      
    }else if(id.length > 15){ // If copy the url
      id = id.match(/\/(m[0-9]*)/)[1]
      this.setState({
        itemId: id
      })
    }
  }

  getItemInfo = (id) => {
    this.validateItemId()

    this.setState({
      loading: true
    })
    
    return new Promise((resolve, reject) => {
      $.get(`/mercari/${id}`, res => {
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
      itemInfo: info,
    })
  }
  
  isValidItem(){
    //return false;
    return this.state.itemInfo != null && this.state.itemInfo.err == null;
  }

  isAidWrong(){
    return this.state.itemInfo != null && this.state.itemInfo.err != null;
  }

  getSelectedPayinfoId = () => {
    return new Promise((resolve, reject) => {

    })
  }
  
  buy = () => {
    $.post('/buy', {
      title: this.state.itemInfo.itemName,
      url: `maomaojp.org:8088/?mid=${this.state.itemId}`,
      addressId: this.addressId,
      payinfoId: this.payinfoId,
    }, (res) => {
      if(res.err){
        Toast.info('下單錯誤: ' + res.err)
      }else{
        Toast.success('下單成功, 請返回首頁查看訂單一覽')
      }
    })
  }

  priceToRmb = (priceString) => {
    const price = Math.floor(parseFloat(priceString.slice(1).replace(',','')) * 0.065)
    if(this.state.itemInfo.sold){
      return `(已售出)${price}`
    }else{
      return price
    }
  }

  render(){
    return (

      <div>
        <div className={this.state.currentTab == tabs.main ? 'visible': 'invisible'}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.navToHome()}
        >煤炉商品查看器</NavBar><WhiteSpace/>

        <WingBlank> <div className="contents">
          <SearchBar onBlur={() => {this.validateItemId()}} onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={99} value={this.state.itemId} onChange={(newId) => {
            this.setState({
              itemId: newId,
            })
          }} />
          <div className={this.state.loading ? 'visible': 'invisible'}><ActivityIndicator animating /><WhiteSpace/></div>
          <WhiteSpace size='lg' />
          {(() => {
            if(this.isValidItem()){
              return (<div>
                <div className='title'>{this.state.itemInfo.itemName}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'简单描述: ' + this.state.itemInfo.itemWording}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'价格: ' + this.state.itemInfo.itemPrice + '(日元)'}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'税: ' + this.state.itemInfo.itemTax}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'日本国内运费: ' + this.state.itemInfo.itemShippingFee}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'喜欢该商品的人数: ' + this.state.itemInfo.likes}</div>
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
                <div className='sub-title'>{this.state.itemInfo.itemDescription}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>分享鏈接: maomaojp.org:8088/?mid={this.state.itemId}</div>
              </div>)
            }else if(this.isAidWrong()){
              return (<div className='title'>没有这个商品! 请检查商品id是否正确</div>)
            }else{
              return (<div></div>)
            }
          })()}
        </div> </WingBlank>

        {
          (() => {
            if(this.isValidItem()){
              return (
                <BottomPriceShow buyBtnClick={() => {
                  this.setState({
                    currentTab: tabs.selectPayinfo
                  })
                  // this.buy()
                }} price={this.priceToRmb(this.state.itemInfo.itemPrice)}></BottomPriceShow>
              )
            }
          })()
        }
        </div>

        {this.state.currentTab == tabs.selectPayinfo ?
          <SelectPayinfoPage navBack={() => {
            this.setState({
              currentTab: tabs.main
            })
          }} successCallback={(payinfoId) => {
            this.payinfoId = payinfoId;
            //切換到選擇郵寄方式tab
            this.setState({
              currentTab: tabs.selectAddress
            })
          }} ></SelectPayinfoPage>
          :
          <div/>
        }

        {this.state.currentTab == tabs.selectAddress ?
          <SelectAddressPage navBack={() => {
            this.setState({
              currentTab: tabs.main
            })
          }} successCallback={(addressId) => {
            this.addressId = addressId;
            //TODO: 發送購買請求
            this.setState({
              currentTab: tabs.main
            })
            this.buy()
          }} ></SelectAddressPage>
          :
          <div/>
        }
      </div>
    )
  }
}

export default MercariItemShow;