import React from 'react';
import { Radio, ActivityIndicator, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';

const RadioItem = Radio.RadioItem;

class NewAddress extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      address: '',
    }
  }

  ajaxAddAddress = () => {
    const me = this
    $.post('/address/add', {
      address: this.state.address,
    }, res => {
      if(res.err){
        Toast.info('增加日本地址失敗! ' + res.err)
      }else{
        Toast.info('增加日本地址成功')
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
      >新增日本轉運地址</NavBar>
      <WingBlank>
        <List renderHeader={() => "請填寫您的日本轉運地址"}>
          <InputItem placeholder="郵編 都道府縣 番地 等" value={this.state.address} onChange={(text) => {
            this.setState({address: text})}}>地址</InputItem>
        </List>
        <WhiteSpace/>

        <Button type="primary" onClick={() => {
          this.ajaxAddAddress()
        }} >確定添加</Button>

        <WhiteSpace size='lg'></WhiteSpace>
        <div className='sub-title'>
          由於貓貓網現在還沒有倉庫為客戶收貨發貨, 所以請您暫時使用轉運公司(比如樂一番)作爲中轉站哦
        </div>
      </WingBlank>

    </div>
  }
}

export default NewAddress;