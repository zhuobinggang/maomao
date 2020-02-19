import React,{useEffect} from 'react'
import {View} from 'react-native'

export default ({fetchItemData = () => {}, mid}) => {

  useEffect(() => {
    fetchItemData(mid);
  },[mid]);

  return <View style={{backgroundColor: 'gray', position: 'absolute', left: 0, right:0, top:0, bottom:0,}}>

  </View>
}