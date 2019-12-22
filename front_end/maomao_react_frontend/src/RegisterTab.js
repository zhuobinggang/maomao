import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

class RegisterTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      nick: '',
      password: '',
      password2nd: '',
    }
  }

  confirmRegister = () => {
    if(this.state.password == this.state.password2nd){

      const me = this
      $.post('/user/register', {
        username: this.state.username, 
        nick: this.state.nick, 
        password: this.state.password, 
      }, (res) => {
        if(res.err != null){
          Toast.info('注冊出錯: ' + res.err)
        }else{
          //TODO: 返回原頁面并且自動登錄
        }
      })
    }else{
      this.setState({password: '', password2nd: ''})
      Toast.info('兩次輸入的密碼不正確! 請重試')
    }
  }

  render(){
    return <div className={this.props.className}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.navBack()}
      >注冊</NavBar>

      <WingBlank>
  
        <List renderHeader={() => "請填寫您的信息"}>
          <InputItem value={this.state.username} onChange={(text) => {
            this.setState({username: text})}}>用戶名</InputItem>
          <InputItem value={this.state.nick} onChange={(text) => {
            this.setState({nick: text})}}>昵稱</InputItem>
          <InputItem value={this.state.password} type="password" onChange={(text) => {
            this.setState({password: text})}}>密碼</InputItem>
          <InputItem value={this.state.password2nd} type="password" onChange={(text) => {
            this.setState({password2nd: text})}}>確認密碼</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={() => {this.confirmRegister()}} >確認注冊</Button>
      </WingBlank>
    </div>
  }
}

export default RegisterTab