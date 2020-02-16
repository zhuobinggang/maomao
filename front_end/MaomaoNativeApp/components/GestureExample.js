import React,{useEffect, useState} from 'react'
import {Dimensions, View, Text, PanResponder} from 'react-native';

const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => {return true },
    onMoveShouldSetPanResponder: () => {return true},
    onPanResponderGrant: ( event, gestureState,) => {
      // console.log('Here grant')
      // console.log(gestureState.x0, gestureState.y0)
    },
    onPanResponderMove: (event, gestureState) => {
      console.log(gestureState)
    },
    // onPanResponderRelease: this._handlePanResponderEnd,
    // onPanResponderTerminate: this._handlePanResponderEnd,
});

export default () => {
  return (
    <View 
      style={style}
      {...responder.panHandlers}
    ></View>
  )
}

const style = {backgroundColor:'red', width:"100%", height: '100%'}