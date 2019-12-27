import React from 'react';
import logo from './logo.svg';
import Home from './HomePage';
import YahooItemShow from './YahooItemShow';
import MercariItemShow from './MercariItemShow';
import MercariSearch from './MercariSearchPage';
import { Toast } from 'antd-mobile';
import $ from 'jquery'

import './App.css';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'

const pages = {
  home: 0,
  yahooItemShow: 1,
  mercariItemShow: 2,
  mercariSearch: 3,
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      page: pages.home,
      initialItemId: null,
      viewCount: null,
      context: {
        userinfo: null
      }, //全局變量
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

    //顯示訪問人數
    $.get('/stastics/view', ({count}) => {
      window.viewCount = count
      this.setState({
        viewCount: count
      })
    });

    //嘗試登錄
    this.getLoginInfo()
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

  getLoginInfo = () => {
    //Check if I have logined
    console.log('Check if I have logined')
    $.get('/getLoginInfo', (res) => {
      if(res.err != null){
        Toast.info('獲取登錄信息失敗: ' + res.err)
      }else{
        const context = {...this.state.context}
        context.userinfo = res.userinfo
        this.setState({ context })
      }
    })
  }

  render(){

    return (
      <div>
        <div className={this.state.page == pages.home ? 'visible': 'invisible'}><Home context={this.state.context} getLoginInfo={() => {this.getLoginInfo()}} viewCount={this.state.viewCount} navToYahooItemShow={() => this.setState({
            page: pages.yahooItemShow
          })} navToMercariItemShow={() => this.setState({
            page: pages.mercariItemShow
          })} navToMercariSearch={() => this.setState({
            page: pages.mercariSearch
          })} /></div>
        <div className={this.state.page == pages.yahooItemShow ? 'visible': 'invisible'}><YahooItemShow itemId={this.state.initialItemId} navToHome={() => {
          this.setState({
            page: pages.home,
          })
          this.clearInitialItemId()
        }} /></div>
        <div className={this.state.page == pages.mercariItemShow ? 'visible': 'invisible'}><MercariItemShow itemId={this.state.initialItemId} navToHome={() => {
          this.setState({
            page: pages.home,
          })
          this.clearInitialItemId()
        }} /></div>
        <div className={this.state.page == pages.mercariSearch ? 'visible': 'invisible'}><MercariSearch navToHome={() => {
          this.setState({
            page: pages.home,
          })
          this.clearInitialItemId()
        }} ></MercariSearch></div>
      </div>
    )

    // switch(this.state.page){
    //   case pages.home: return <Home viewCount={this.state.viewCount} navToYahooItemShow={() => this.setState({
    //     page: pages.yahooItemShow
    //   })} navToMercariItemShow={() => this.setState({
    //     page: pages.mercariItemShow
    //   })} navToMercariSearch={() => this.setState({
    //     page: pages.mercariSearch
    //   })} />
    //   case pages.yahooItemShow: return <YahooItemShow itemId={this.state.initialItemId} navToHome={() => {
    //     this.setState({
    //       page: pages.home,
    //     })
    //     this.clearInitialItemId()
    //   }} />
    //   case pages.mercariItemShow: return <MercariItemShow itemId={this.state.initialItemId} navToHome={() => {
    //     this.setState({
    //       page: pages.home,
    //     })
    //     this.clearInitialItemId()
    //   }} />
    //   case pages.mercariSearch: return <MercariSearch navToHome={() => {
    //     this.setState({
    //       page: pages.home,
    //     })
    //     this.clearInitialItemId()
    //   }} ></MercariSearch>
    //   default: return <Home />
    // }
  }
}

export default App;
