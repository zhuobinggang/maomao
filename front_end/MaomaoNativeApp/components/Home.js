import React from 'react'
import { Text, View, Image } from 'react-native';
import Blank from './Blank';
import Grid from 'react-native-grid-configurable';

export default class Home extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    //Once got into the component, take the token out from the storage 
    this.props.getUserName()
    this.props.getVisitCount()
  }

  render = ({visitCount = 'Mock data', username} = this.props) => {
  
    const navBar = (<View style={{ flex: 1, flexDirection: 'row-reverse'}}>
      {username == null ? <Text>登陆, 注册</Text> : <Text>欢迎, {username}</Text>}
    </View>)
  
    return (
      <View>
          {navBar}
          <Blank size='big'></Blank>
          <View style={{}}><Text>海淘，就上猫猫网</Text></View>
          <Blank size='big'></Blank>
  
          <Grid cols={3} height={90} titles={['煤炉商品搜索','雅虎商品查看','购买流程', ]} imgSrcs={[
            require('../assets/app_imgs/mercari.jpg'),
            require('../assets/app_imgs/yahooauc.png'),
            require('../assets/app_imgs/questionmark.jpg'),
          ]}  callbacks={[() => {console.log('fuck')}, () => {console.log('fuck2')}]}></Grid>
  
          <Blank size='big'></Blank>
          <View><Text>今日访问次数: {visitCount}</Text></View>
          <Blank size='big'></Blank>
          <View><Text>欢迎来到猫猫网</Text></View>
      </View>
  
    );
  }
}
