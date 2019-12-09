import React from 'react';
import { SearchBar, WingBlank, NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
const $ = require('jquery');

class YahooItemShow extends React.Component{
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

  getItemInfo = (aid) => {
    // return Promise.resolve({
    //   title: '[O-12.2] Canon 7 シャッターOK フィルムカメラ レンジファインダー 比較的良品 売り切り 一眼レフ',
    // })
    return new Promise((resolve, reject) => {
      $.get(`/auction/${aid}`, res => {
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

  render(){
    return (

      <div>
        {/* <SearchBar onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={8} /> */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.navToHome()}
        >雅虎商品查看器</NavBar><WhiteSpace/>

        <WingBlank>
          <SearchBar value={this.state.itemId} onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={15} onChange={(newId) => {
            this.setState({
              itemId: newId,
            })
          }} />
          <WhiteSpace size='lg' />
          {(() => {
            if(this.isValidItem()){
              return (<div>
                <div className='title'>{this.state.itemInfo.title}</div>
                <WhiteSpace size='lg'></WhiteSpace>
                <div className='sub-title'>{'当前价格: ' + this.state.itemInfo.price}</div>
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
              </div>)
            }else if(this.isAidWrong()){
              return (<div className='title'>没有这个商品! 请检查商品id是否正确</div>)
            }else{
              return (<div></div>)
            }
          })()}
        </WingBlank>
      </div>
    )
  }
}

export default YahooItemShow;