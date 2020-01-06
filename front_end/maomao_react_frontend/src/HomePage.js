import React from 'react';
import {Flex, Grid, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import RegisterTab from './RegisterTab';
import LoginTab from './LoginTab';
import $ from 'jquery';
import OrdersPage from './components/OrdersPage';

const tabs = {
  main: 1,
  register: 2,
  login: 3,
  orders: 4,
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
      if(this.props.context.userinfo != null){ //Logined
        const welcome = (<p key="1">歡迎, {this.props.context.userinfo.nick} </p>)
        const orderList = (<p key="2" className="link" onClick={() => {
          this.setState({
            currentTab: tabs.orders
          })
        }}>訂單一覽</p>)
        result.push(welcome, comma, orderList)
      }else{
        const loginLink = (<p className="link" key="1" onClick={() => {
          this.setState({
            currentTab: tabs.login
          })
        }}>登錄</p>)
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
    
            <WhiteSpace size="lg" />
    
            {(() => {
              if(this.props.viewCount == null){
    
              }else{
                return <div className="sub-title">今日縂訪問數: {this.props.viewCount}</div>
              }
            })()}

            <WhiteSpace size="lg" />

            <div className="sub-title">
              <p>欢迎来到猫猫网, 按照下列流程, 享受最简洁可控的海淘购物体验: </p>
              <p>1. 点击右上角按钮注册猫猫网会员</p>
              <p>2. 通过转运公司, 获取您的专属转运地址(推荐使用<a target="_blank" href="https://www.leyifan.com/cht/reg">乐一番</a>)</p>
              <p>3. 点击"煤炉商品搜索", 输入商品名, 如"omega seamaster"(因为都是日本卖家, 中文是搜不出商品来的哦), 找到想要的商品</p>
              <p>4. 确认商品价格后, 点击购买!</p>
            </div>
    
          </WingBlank>
        </div>

        <RegisterTab successCallback={() => {
          // this.getLoginInfo();
          this.props.getLoginInfo()
          this.setState({currentTab: tabs.main});
        }} navBack={() => {
          this.setState({currentTab: tabs.main});
        }} className={this.state.currentTab == tabs.register ? "" : "invisible"}></RegisterTab>

        <LoginTab successCallback={() => {
          this.props.getLoginInfo();
          this.setState({currentTab: tabs.main});
        }} navBack={() => {
          this.setState({currentTab: tabs.main});
        }} className={this.state.currentTab == tabs.login ? "" : "invisible"}></LoginTab>

        {/* 由於order tab需要在加載時進行數據獲取操作，所以應當作爲page處理 */}
        {this.state.currentTab == tabs.orders ? 
          <OrdersPage navBack={() => {
            this.setState({currentTab: tabs.main});
          }}></OrdersPage>
          :
          <div/>
        }
        

      </div>
    )
  }
}

export default HomePage