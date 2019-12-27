import React from 'react';
import { Steps, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';

const Step = Steps.Step;


class OrderStatus extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  render(){
    return <div className={this.props.className}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.navBack()}
      >訂單詳情</NavBar>

      <WingBlank>
        <Steps size="small" current={1}>
          <Step title="Finished" description="This is description" />
          <Step title="In Progress" description="This is description" />
          <Step title="Waiting" description="This is description" />
        </Steps>
      </WingBlank>
    </div>
  }
}

export default OrderStatus