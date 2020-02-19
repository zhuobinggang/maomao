import React,{ useEffect, useState, } from 'react'
import { Text, View, Button,  TouchableHighlight, ScrollView} from 'react-native';
import Blank from './Blank';
import Space from './Space';
import Grid from 'react-native-grid-configurable';
// import { Header } from '@react-navigation/native';

// import ImageViewer from './ImageViewer';

export default ({visitCount = 'Mock data', username, getUserName, getVisitCount, navigation, logined=false, imgViewerShow, test= () => {}}) => {
  useEffect(() => {
    //DidMount
    getVisitCount()
  }, []);

  useEffect(() => {
    //DidMount and when logined changed
    getUserName()
    console.log('GET USER NAME')
  }, [logined]);


  const navBar = (<View style={{ flexDirection: 'row-reverse'}}>
    {username == null ? 
      <View style={{flexDirection: 'row'}}>
        <Button title="登陆" onPress={() => navigation.navigate('Login')} />
        <Space width={8} />
        <Button title="注册" onPress={() => navigation.navigate('Register')} />
      </View> :
      <Text>欢迎, {username}</Text>
    }
  </View>)

  return (
    <ScrollView  style={{paddingHorizontal: 16}}>
        <Blank size='big'></Blank>
        {navBar}
        <Blank size='big'></Blank>
        <View style={{}}><Text>海淘，就上猫猫网</Text></View>
        <Blank size='big'></Blank>

        <Grid 
          cols={2} 
          height={100} 
          titles={['煤炉商品搜索', '购物流程']} 
          imgSrcs={[ require('../assets/app_imgs/mercari.jpg'), require('../assets/app_imgs/questionmark.jpg'),]}
          callbacks={[() => {navigation.navigate('MercariSearch')}, () => {
            navigation.navigate('ImageViewer', {
              title: '猫猫网购物流程'
            } )
            imgViewerShow(require('../assets/app_imgs/shop_step_fsm.jpg'))
          }]}>
        </Grid>

        {/* <Grid cols={3} height={90} titles={['煤炉商品搜索','雅虎商品查看','购买流程', '测试用']} imgSrcs={[
          require('../assets/app_imgs/mercari.jpg'),
          require('../assets/app_imgs/yahooauc.png'),
          require('../assets/app_imgs/questionmark.jpg'),
          require('../assets/app_imgs/questionmark.jpg'),
        ]}  callbacks={[() => {navigation.navigate('MercariSearch')}, () => {console.log('fuck2')}, () => {
          navigation.navigate('ImageViewer', {
            title: '猫猫网购物流程'
          } )
          imgViewerShow(require('../assets/app_imgs/shop_step_fsm.jpg'))
        }, () => {
          navigation.navigate('Test');
        }]}></Grid> */}

        <Blank size='big'></Blank>
        <View><Text>今日访问次数: {visitCount}</Text></View>
        <Blank size='big'></Blank>
        <View><Text>欢迎来到猫猫网</Text></View>

        {/** Modal for showing guide image */}
    </ScrollView>

  );
}

