import React, {useEffect, useState} from 'react'
import {Dimensions, View} from 'react-native';

export default ({verticalOffset = 0, horizonOffset = 0, component}) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const height = Dimensions.get('window').height - verticalOffset
    const width = Dimensions.get('window').width - horizonOffset
    setWidth(width)
    setHeight(height)
  },[])
  return (<View style={{backgroundColor: 'green', position: 'absolute', height, width, alignContent: 'center', justifyContent: 'center' }}>
    {component}
  </View>)
}