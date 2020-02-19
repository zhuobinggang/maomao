import React from 'react'
import { View} from 'react-native';

const Blank = ({size = 8}) => {
  return <View style={{height: size}}></View>
}

export default ({width=8}) => {
  return <View style={{width}} />
}

export {
  Blank,
}
