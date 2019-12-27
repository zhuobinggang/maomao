import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import OrderStatus from './OrderStatus';

const Item = List.Item;

class OrdersTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inDetail: false
    }
  }

  render(){
    return <div className={this.props.className}>
      <div className={this.state.inDetail ? "invisible": ""}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.navBack()}
        >訂單一覽</NavBar>
  
        <WingBlank>
          <List renderHeader={() => '處理中的訂單'}>
            <Item onClick={() => {
              this.setState({ inDetail: true })
            }} arrow="horizontal">111</Item>
            <Item>fuck</Item>
          </List>
        </WingBlank>
      </div>
      <div className={this.state.inDetail?'':'invisible'}>
        <OrderStatus navBack={() => {
          this.setState({ inDetail: false })
        }}></OrderStatus>
      </div>
    </div>
  }
}

export default OrdersTab