import React,{useEffect, useState} from 'react'
import {Dimensions, View, Text} from 'react-native';
import Image from './Image'
import Modal from './MyModal'

const imgWrappers = (imgs) => {
  return imgs.map((img, index) => {
    return <View key={index}>
      <Image uri={img}/>
    </View> 
  })
}

export default ({imgs}) => {
  const [imgWidth, setImgWidth] = useState(0)
  useEffect(() => {
    const width = Dimensions.get('window').width 
    setImgWidth(width)
  }, [])

  const component = (
    <View style={{backgroundColor:'red',}}>
      <Image uri={imgs[0]} imgWidth={imgWidth}></Image>
    </View>
  )

  return (
    <Modal verticalOffset={64} component={component} />
  )
}