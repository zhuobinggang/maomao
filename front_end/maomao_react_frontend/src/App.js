import React from 'react';
import logo from './logo.svg';
import Home from './HomePage';
import YahooItemShow from './YahooItemShow';
import MercariItemShow from './MercariItemShow';

import './App.css';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

const pages = {
  home: 0,
  yahooItemShow: 1,
  mercariItemShow: 2,
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      page: pages.home
    }
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
    switch(this.state.page){
      case pages.home: return <Home navToYahooItemShow={() => this.setState({
        page: pages.yahooItemShow
      })} navToMercariItemShow={() => this.setState({
        page: pages.mercariItemShow
      })} />
      case pages.yahooItemShow: return <YahooItemShow navToHome={() => this.setState({
        page: pages.home
      })} />
      case pages.mercariItemShow: return <MercariItemShow navToHome={() => this.setState({
        page: pages.home
      })} />
      default: return <Home />
    }
  }
}

export default App;
