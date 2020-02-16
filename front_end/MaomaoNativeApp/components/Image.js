import React,{useEffect, useState} from 'react'
import { View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

// const responder = PanResponder.create({
//     onStartShouldSetPanResponder: () => {return true },
//     onMoveShouldSetPanResponder: () => {return true},
//     onPanResponderGrant: ( event, gestureState,) => {
//       console.log('Here grant')
//       // console.log(gestureState.x0, gestureState.y0)
//     },
//     onPanResponderMove: (event, gestureState) => {
//       console.log(gestureState)
//     },
//     // onPanResponderRelease: this._handlePanResponderEnd,
//     // onPanResponderTerminate: this._handlePanResponderEnd,
// });

function getHeightByWidth(uri,width){
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (originWidth, orginHeight) => {
      const ratio = parseFloat(orginHeight) / parseFloat(originWidth);
      const height  = Math.floor(parseFloat(width) * ratio)
      resolve(height)
    })
  })
}

export default ({uri, width, height, x, y=0, onPressIn, onPress, }) => {

  return (
    <Image style={{width, height, position: 'absolute', top: y, left: x}}  source={{uri}} />
  )

  // if(onPress != null){
  //   return (
  //     <TouchableWithoutFeedback onPress={onPress} onPressIn={() => {
  //       console.log('pressIn')
  //       onPressIn()
  //     }} onPressOut={() => {console.log('out')}}>
  //       <Image style={{width, height, position: 'absolute', top: y, left: x}}  source={{uri}} />
  //     </TouchableWithoutFeedback>
  //   )
  // }else{
  //   return (
  //     <Image style={{width: width, height}}  source={{uri}} />
  //   )
  // }
}