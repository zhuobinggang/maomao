import React from 'react';
import { Radio, ActivityIndicator, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

const RadioItem = Radio.RadioItem;

class NewPayinfoTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pay_method: 'alipay',
      pay_id: '',
    }
  }

  ajaxAddPayinfo = () => {
    const me = this
    $.post('/payinfo/add', {
      pay_method: this.state.pay_method,
      pay_id: this.state.pay_id,
    }, res => {
      if(res.err){
        Toast.info('增加支付方式失敗! ' + res.err)
      }else{
        Toast.info('增加支付方式成功')
        me.props.successCallback()
      }
    })
  }

  render(){
    return <div>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.navBack()}
      >新增支付方式</NavBar>
      <WingBlank>
        <List renderHeader={() => '選擇付款方式'}>
            <RadioItem key={1} checked={this.state.pay_method == 'alipay'} onChange={() => this.setState({pay_method: 'alipay'})}>
              支付寶
            </RadioItem>
            <RadioItem key={2} checked={this.state.pay_method == 'wechat'} onChange={() => this.setState({pay_method: 'wechat'})}>
              微信支付
            </RadioItem>
        </List>
        <WhiteSpace/>
  
        <List renderHeader={() => "請填寫相應方式的賬號ID"}>
          <InputItem placeholder="您的ID" value={this.state.pay_id} onChange={(text) => {
            this.setState({pay_id: text})}}>您的ID</InputItem>
        </List>
        <WhiteSpace/>

        <Button type="primary" onClick={() => {
          this.ajaxAddPayinfo()
        }} >確定添加</Button>

        <WhiteSpace size='lg'></WhiteSpace>
        <div className='sub-title'>
          支付方式説明: 如果您選擇了支付寶方式, 會有貓貓網的客服向您發起收款(不需要添加為好友); 如果您選擇了微信方式, 貓貓網客服會申請添加好友, 隨後向您發起收款
        </div>
        <WhiteSpace></WhiteSpace>
        <div className='sub-title'>
          請您確保填寫的ID正確哦
        </div>
        <WhiteSpace></WhiteSpace>
        <div className='sub-title'>
          Q: 在哪裏查詢自己的ID? A: 如果是微信, 在微信的底邊欄點擊“我” -> 您的昵稱下方就會顯示微信ID; 如果是支付寶, 您的賬號通常是您的手機號碼
        </div>

      </WingBlank>

    </div>
  }
}

export default NewPayinfoTab;