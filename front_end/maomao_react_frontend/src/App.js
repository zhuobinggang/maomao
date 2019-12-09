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
      page: pages.home,
      initialItemId: null,
    }
  }

  componentDidMount = () => {
    const params = new URLSearchParams(window.location.search.slice(1));
    window.params = params;
    if(params.get('mid') != null){ // mercari item id
      console.log('mid set')
      this.setState({
        page: pages.mercariItemShow,
        initialItemId: params.get('mid'),
      })
    }else if(params.get('aid') != null){ // yahoo auction item id
      console.log('aid set')
      this.setState({
        page: pages.yahooItemShow,
        initialItemId: params.get('mid'),
      })
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
  clearInitialItemId = () => {
    this.setState({
      initialItemId: null,
    })
  }
  render(){
    switch(this.state.page){
      case pages.home: return <Home navToYahooItemShow={() => this.setState({
        page: pages.yahooItemShow
      })} navToMercariItemShow={() => this.setState({
        page: pages.mercariItemShow
      })} />
      case pages.yahooItemShow: return <YahooItemShow itemId={this.state.initialItemId} navToHome={() => {
        this.setState({
          page: pages.home,
        })
        this.clearInitialItemId()
      }} />
      case pages.mercariItemShow: return <MercariItemShow itemId={this.state.initialItemId} navToHome={() => {
        this.setState({
          page: pages.home,
        })
        this.clearInitialItemId()
      }} />
      default: return <Home />
    }
  }
}

export default App;
