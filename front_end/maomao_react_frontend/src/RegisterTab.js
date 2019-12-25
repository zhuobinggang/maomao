import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

const validators = {
  username: /[_a-zA-Z]\w{7,15}/,
  password: /[_a-zA-Z]\w{7,15}/,
}

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

  isValidInput = () => {
    if(!validators.username.test(this.state.username)){
      Toast.info('用戶名必須為: 8到16位,字母開頭的字符串')
      return false
    }else if(!validators.password.test(this.state.password)){
      Toast.info('密碼必須為: 8到16位,字母開頭的字符串')
      return false
    }else if(this.state.nick.length < 2 || this.state.nick.length > 8){
      Toast.info('昵稱必須為: 2到8位')
      return false
    }else if(this.state.password != this.state.password2nd){
      Toast.info('兩次輸入的密碼不相同')
      return false
    }else{
      return true
    }
  }

  confirmRegister = () => {
    if(this.isValidInput()){
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
          Toast.success('注冊成功, 已嘗試自動登錄，請點左上角返回');
          me.props.successCallback();
        }
      })
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
          <InputItem placeholder="8到16位,字母開頭" value={this.state.username} onChange={(text) => {
            this.setState({username: text})}}>用戶名</InputItem>
          <InputItem placeholder="請不要超過8個字符" maxLength={8} value={this.state.nick} onChange={(text) => {
            this.setState({nick: text})}}>昵稱</InputItem>
          <InputItem placeholder="8到16位,字母開頭" value={this.state.password} type="password" onChange={(text) => {
            this.setState({password: text})}}>密碼</InputItem>
          <InputItem placeholder="確保跟密碼一致" value={this.state.password2nd} type="password" onChange={(text) => {
            this.setState({password2nd: text})}}>確認密碼</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={() => {this.confirmRegister()}} >確認注冊</Button>
      </WingBlank>
    </div>
  }
}

export default RegisterTab