import React,{useEffect} from 'react';
import HomeWithUserNameAndVisitCount from '../containers/HomeContainer';
import Login from '../containers/LoginContainer'
import { StyleSheet, Text, View } from 'react-native';
import Register from './Register'
import ImgViewer from '../containers/ImgViewerContainer'
import Test from './GestureExample'

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
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeWithUserNameAndVisitCount} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ImageViewer" component={ImgViewer} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
