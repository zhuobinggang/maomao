import React from 'react';
import logo from './logo.svg';
import {WingBlank, Flex, WhiteSpace, SearchBar } from 'antd-mobile';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'


const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  showItemInfo(value){
    alert(value)
  }
  getItemInfo(aid){
    return Promise.resolve({
      title: 'fuck'
    })
  }
  renderItemInfo(info){
    alert(info.title)
  }
  render(){
    return (
      <div className="flex-container">
        <div className="sub-title">
          猫猫网，日本海淘就上猫猫网！
        </div>
        <SearchBar onSubmit={aid => this.getItemInfo(aid).then(this.renderItemInfo)} placeholder="请输入客服提供的商品ID" maxLength={8} />
        {/* <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
        <Flex>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
          <Flex.Item><PlaceHolder /></Flex.Item>
        </Flex>
        <WhiteSpace size="lg" /> */}
      </div>
    )
  }
}

export default App;
