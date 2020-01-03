import React from 'react';
import { ActivityIndicator, Toast, WingBlank, Icon, NavBar, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import $ from 'jquery';
import NewAddress from '../components/NewAddress';

const Item = List.Item;

const tabs = {
  main: 1,
  newAddress: 2,
}

class SelectAddress extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      addresses: [],
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
    this.refreshAddresses()
  }

  refreshAddresses = () => {
    this.setLoading(true)
    $.get('/address/list', (res) => {
      this.setLoading(false)
      if(res.err){
        Toast.info('獲取地址信息失敗: ' + res.err)
      }else{
        this.setState({
          addresses: res.addresses
        })
      }
    })
  }

  addressesToItems = () => {
    const me = this;
    return this.state.addresses.map(address => {
      return (<Item arrow="horizontal" key={address.id} onClick={() => {
        me.props.successCallback(address.id)
      }} >
          {address.address}
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
      >選擇您的日本地址</NavBar>

      <WingBlank>
        <div className={this.state.loading ? 'visible': 'invisible'}><ActivityIndicator animating /><WhiteSpace/></div>
        <List renderHeader={() => '選擇您的日本地址'}>
          {this.addressesToItems()}
        </List>

        <WhiteSpace size='lg'/>
        <Button type="primary" onClick={() => {
          this.setState({
            currentTab: tabs.newAddress
          })
        }} >新增日本地址</Button>
      </WingBlank>
      </div>
      <div className={this.state.currentTab == tabs.newAddress ? 'visible' : 'invisible'}>
        <NewAddress navBack={() => {
          this.setState({
            currentTab: tabs.main
          })
        }} successCallback={() => {
          this.setState({
            currentTab: tabs.main
          })
          this.refreshAddresses()
        }}></NewAddress>
      </div>
    </div>
  }
}

export default SelectAddress;