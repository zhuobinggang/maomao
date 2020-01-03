import React from 'react';
import { ActivityIndicator, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import NewPayinfoTab from '../components/NewPayinfoTab';

const Item = List.Item;

const tabs = {
  main: 1,
  newPayinfo: 2,
}

class SelectPayinfoPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      payinfos: [],
      loading: false,
      currentTab: tabs.main,
    }
  }

  setLoading = (flag) => {
    this.setState({
      loading: flag
    })
  }

  componentDidMount = () => {
    this.refreshPayinfos()
  }

  refreshPayinfos = () => {
    this.setLoading(true)
    $.get('/payinfo/list', (res) => {
      this.setLoading(false)
      if(res.err){
        Toast.info('獲取支付信息失敗: ' + res.err)
      }else{
        this.setState({
          payinfos: res.payinfos
        })
      }
    })
  }

  payinfosToItems = () => {
    const me = this;
    return this.state.payinfos.map(payinfo => {
      return (<Item arrow="horizontal" key={payinfo.id} onClick={() => {
        me.props.successCallback(payinfo.id)
      }} >
          {payinfo.pay_method == 'alipay' ? '支付寶' : '微信'} : {payinfo.pay_id}
        </Item>)
    })
  }

  render(){
    return <div>
      <div className={this.state.currentTab == tabs.main ? 'visible' : 'invisible'}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.navBack()}
      >選擇支付方式</NavBar>

      <WingBlank>
        <div className={this.state.loading ? 'visible': 'invisible'}><ActivityIndicator animating /><WhiteSpace/></div>
        <List renderHeader={() => '您的支付方式'}>
          {this.payinfosToItems()}
          {/* <Item arrow="horizontal">支付寶: 939230966</Item> */}
        </List>

        <WhiteSpace size='lg'/>
        <Button type="primary" onClick={() => {
          this.setState({
            currentTab: tabs.newPayinfo
          })
        }} >新增支付方式</Button>
      </WingBlank>
      </div>
      <div className={this.state.currentTab == tabs.newPayinfo ? 'visible' : 'invisible'}>
        <NewPayinfoTab navBack={() => {
          this.setState({
            currentTab: tabs.main
          })
        }} successCallback={() => {
          this.setState({
            currentTab: tabs.main
          })
          this.refreshPayinfos()
        }}></NewPayinfoTab>
      </div>
    </div>
  }
}

export default SelectPayinfoPage;