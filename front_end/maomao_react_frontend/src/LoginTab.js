import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

const validators = {
  username: /[_a-zA-Z]\w{7,15}/,
  password: /[_a-zA-Z]\w{7,15}/,
}

class LoginTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  isValidInput = () => {
    if(!validators.username.test(this.state.username)){
      Toast.info('用戶名必須為: 8到16位,字母開頭的字符串')
      return false
    }else if(!validators.password.test(this.state.password)){
      Toast.info('密碼必須為: 8到16位,字母開頭的字符串')
      return false
    }else{
      return true
    }
  }

  confirmLogin = () => {
    if(this.isValidInput()){
      const me = this
      $.post('/user/login', {
        username: this.state.username, 
        password: this.state.password, 
      }, (res) => {
        if(res.err != null){
          Toast.info('登錄出錯: ' + res.err)
        }else{
          Toast.success('登錄成功')
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
      >登錄</NavBar>

      <WingBlank>
  
        <List renderHeader={() => "請填寫用戶名及密碼"}>
          <InputItem placeholder="8到16位,字母開頭" value={this.state.username} onChange={(text) => {
            this.setState({username: text})}}>用戶名</InputItem>
          <InputItem placeholder="8到16位,字母開頭" value={this.state.password} type="password" onChange={(text) => {
            this.setState({password: text})}}>密碼</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={() => {this.confirmLogin()}} >確認登錄</Button>
      </WingBlank>
    </div>
  }
}

export default LoginTab