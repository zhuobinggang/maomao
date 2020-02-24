import React,{useEffect} from 'react';
import HomeWithUserNameAndVisitCount from '../containers/HomeContainer';
import Login from '../containers/LoginContainer'
import { StyleSheet, Text, View } from 'react-native';
import Register from '../containers/RegisterContainer'
import ImgViewer from '../containers/ImgViewerContainer'
import Test from './Indicator'
import MercariSearch from '../containers/MercariSearchContainer'
import MercariItem from '../containers/MercariItemContainer'
import SearchStasticShow from '../containers/SearchStasticShowContainer'
import WebViewSample from './WebViewSample'

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export default ({takeOutJwtToken}) => {
  useEffect(() => {
    //Once got into the component, take the token out from the storage 
    takeOutJwtToken()
  }, [])

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="Home" options={{ title: '猫猫网' }} component={HomeWithUserNameAndVisitCount} />
          <Stack.Screen name="Login" options={{ title: '登陆' }} component={Login} />
          <Stack.Screen name="Register" options={{ title: '注册' }} component={Register} />
          <Stack.Screen name="ImageViewer" options={{ title: '图片查看' }} component={ImgViewer} />
          <Stack.Screen name="Test" options={{ title: '测试' }} component={Test} />
          <Stack.Screen name="MercariSearch" options={{ title: '煤炉商品搜索' }} component={MercariSearch} />
          <Stack.Screen name="MercariItem" options={{ title: '煤炉商品详情' }} component={MercariItem} />
          <Stack.Screen name="SearchStasticShow" options={{ title: '搜索统计分析' }} component={SearchStasticShow} />
          {/* <Stack.Screen name="SearchStasticShow" options={{ title: '搜索统计分析' }} component={WebViewSample} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
