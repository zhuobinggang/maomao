import React from 'react';
import {WhiteSpace, WingBlank, Button } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <WingBlank>
        <div className="sub-title fuck-padding">
          猫猫网，日本海淘就上猫猫网！
        </div>
        <Button onClick={() => {this.props.navToYahooItemShow()}} type="primary">雅虎商品查看器</Button>
        <WhiteSpace />
        <Button onClick={() => {this.props.navToMercariItemShow()}} type="primary">煤炉商品查看器</Button>
        <WhiteSpace />
        <Button onClick={() => {this.props.navToMercariSearch()}} type="primary">煤炉商品搜索</Button>

      </WingBlank>
    )
  }
}

export default HomePage