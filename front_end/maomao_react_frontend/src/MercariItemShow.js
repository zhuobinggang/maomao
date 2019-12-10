import React from 'react';
import { Toast,Flex, SearchBar, WingBlank, NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
const $ = require('jquery');

class MercariItemShow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      itemInfo: null,
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
    
    return new Promise((resolve, reject) => {
      $.get(`/mercari/${id}`, res => {
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

  priceToRmb = (priceString) => {
    const price = Math.floor(parseFloat(priceString.slice(1).replace(',','')) * 0.065)
    return price
  }

  render(){
    return (

      <div>
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
                <div className="footer maroon bold-font">
                  <div className="width-80-percent"  >
                    <Flex className="height-100-per" justify="center" align="center" onClick={() => {
                      Toast.info('该金额不包括代购费和国际运费哦!详情请咨询客服')
                    }}>估算金额: {this.priceToRmb(this.state.itemInfo.itemPrice)} 元 </Flex>
                  </div>
        
                  <div className="width-20-percent red"  >
                    <Flex className="height-100-per" justify="center" align="center" onClick={() => {
                      Toast.info('目前只支持人工代购哦，请复制商品id并咨询客服')
                    }}> 购买 </Flex>
                  </div>
                </div>
              )
            }
          })()
        }



      </div>
    )
  }
}

export default MercariItemShow;