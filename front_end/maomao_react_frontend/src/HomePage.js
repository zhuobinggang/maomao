import React from 'react';
import {Flex, Grid, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import RegisterTab from './RegisterTab';

const tabs = {
  main: 1,
  register: 2,
  login: 3,
}

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userinfo: null,
      currentTab: tabs.main,
    }
  }

  render(){
    const navRightElements = (() => {
      const result = []
      const comma = (<p className="margin-right-small" key="99">, </p>)
      if(this.state.userinfo != null){ //Logined
        const welcome = (<p key="1">歡迎, {this.state.userinfo.nick} </p>)
        const orderList = (<p key="2" className="link">訂單一覽</p>)
        result.push(welcome, comma, orderList)
      }else{
        const loginLink = (<p className="link" key="1">登錄</p>)
        const registerLink = (<p className="link" key="2" onClick={() => {
          this.setState({
            currentTab: tabs.register
          })
        }}>注冊</p>)
        result.push(loginLink, comma, registerLink)
      }
      return result
    })()

    return (
      <div>
        <div className={this.state.currentTab == tabs.main ? "" : "invisible"}>
          <WingBlank>
  
            <Flex justify="end">
              {navRightElements}
            </Flex>
  
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
        </div>
        <RegisterTab className={this.state.currentTab == tabs.register ? "" : "invisible"}></RegisterTab>
      </div>
    )
  }
}

export default HomePage