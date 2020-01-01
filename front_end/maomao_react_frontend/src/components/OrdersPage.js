import React from 'react';
import { Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import OrderStatus from './OrderStatus';

const Item = List.Item;

class OrdersPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inDetail: false,
      orders: [],
      selectedOrderId: null,
    }
  }

  componentDidMount = () => {
    //TODO: Fetch data of orders
    $.get('/orders', res => {
      if(res.err != null){
        Toast.info(`獲取訂單列表失敗, ${res.err}`)
      }else{ 
        this.setState({
          orders: res.orders
        })
      }
    })
  }

  itemListFromOrders = () => {
    const orders = this.state.orders;
    return orders.map((o, key) => {
      return (
        <Item key={key} onClick={() => {
          this.setState({
            inDetail: true,
            selectedOrderId: o.id,
          })
        }} arrow="horizontal">{o.item_title}</Item>
      )
    })
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
            {this.itemListFromOrders()}
          </List>
        </WingBlank>
      </div>

      {this.state.inDetail ?
        <OrderStatus orderId={this.state.selectedOrderId} navBack={() => {
          this.setState({ inDetail: false })
        }}></OrderStatus>
        :
        <div/>
      }
    </div>
  }
}

export default OrdersPage