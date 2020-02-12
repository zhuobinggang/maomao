import React from 'react'
import { Text, View } from 'react-native';

export default ({size = 'small'}) => {
  switch(size){
    case 'small':
      return <View style={{height: 8}}></View>
    case 'big':
      return <View style={{height: 16}}></View>
    case 'xbig':
      return <View style={{height: 24}}></View>
    default:
      return <View style={{height: 8}}></View>
  }
}