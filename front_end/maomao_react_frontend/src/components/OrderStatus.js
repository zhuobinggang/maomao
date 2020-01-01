import React from 'react';
import { Steps, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';

const Step = Steps.Step;


class OrderStatus extends React.Component{
  constructor(props){
    super(props)
    this.state = {

      order: null,
      username: '',
      password: '',
    }
  }

  stateFromOrderState = () => {
    return 0
  }

  render(){
    return <div className={this.props.className}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.navBack()}
      >訂單詳情</NavBar>

      <WhiteSpace/>

      <WingBlank>
        <Steps size="small" current={this.stateFromOrderState()}>
          <Step title="等待支付" description="貓貓網客服會向您選擇的付款id發起收款" />
          <Step title="等待賣家發貨" description="..." />
          <Step title="賣家已發貨" description="(發貨單號會顯示在這裏)" />
          <Step title="已收貨" description="交易結束, 如需更多幫助請咨詢客服哦" />
        </Steps>
      </WingBlank>
    </div>
  }
}

export default OrderStatus