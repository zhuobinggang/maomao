import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

class LoginTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  confirmLogin = () => {
    const me = this
    $.post('/user/login', {
      username: this.state.username, 
      password: this.state.password, 
    }, (res) => {
      if(res.err != null){
        Toast.info('登錄出錯: ' + res.err)
      }else{
        Toast.success('登錄成功, 請點左上角返回')
        me.props.successCallback();
      }
    })
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
          <InputItem value={this.state.username} onChange={(text) => {
            this.setState({username: text})}}>用戶名</InputItem>
          <InputItem value={this.state.password} type="password" onChange={(text) => {
            this.setState({password: text})}}>密碼</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={() => {this.confirmLogin()}} >確認登錄</Button>
      </WingBlank>
    </div>
  }
}

export default LoginTab