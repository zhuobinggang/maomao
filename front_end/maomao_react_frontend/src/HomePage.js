import React from 'react';
import {Grid, WhiteSpace, WingBlank, Button } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <WingBlank>
        <div className="sub-title fuck-padding">
          猫猫网，日本海淘就上猫猫网！
        </div>

        <WhiteSpace />

        <Grid data={[
          {icon: '/app_imgs/mercari.jpg', text: '煤炉商品搜索', cb: () => {this.props.navToMercariSearch()}},
          {icon: '/app_imgs/yahooauc.png', text: '雅虎商品查看', cb: () => {this.props.navToYahooItemShow()}},
          {icon: '/app_imgs/questionmark.jpg', text: '购买流程', cb: () => {window.open('/app_imgs/shop_step_fsm.jpg')}},
        ]} columnNum={3} renderItem={data => {
              return (
              <div className="merica-item-box" onClick={() => {data.cb()}} >
                <div className="merica-item-box-img">
                  <img style={{width: '100%', height: '100%'}} src={data.icon}></img>
                </div>
                <div className="merica-item-box-price">
                  {data.text}
                </div>
              </div>
              )
            }} />

        {/* <Button onClick={() => {this.props.navToYahooItemShow()}} type="primary">雅虎商品查看器</Button>
        <WhiteSpace />
        <Button onClick={() => {this.props.navToMercariItemShow()}} type="primary">煤炉商品查看器</Button>
        <WhiteSpace />
        <Button onClick={() => {this.props.navToMercariSearch()}} type="primary">煤炉商品搜索</Button> */}


        <WhiteSpace size="lg" />

        {(() => {
          if(this.props.viewCount == null){

          }else{
            return <div className="sub-title">今日縂訪問數: {this.props.viewCount}</div>
          }
        })()}

      </WingBlank>
    )
  }
}

export default HomePage