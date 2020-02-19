import React,{useEffect, useState} from 'react'
import {ScrollView, Text, Dimensions, View} from 'react-native'
import {Blank} from './Space'
import Grid from 'react-native-grid-configurable'
import Indicator from './Indicator';

export default ({itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes, sold, imgSrcs = [], loading}) => {
  const padding = 8;
  const cols = 5;
  const [imgWidth, setImgWidth] = useState(null)

  const content = <ScrollView onLayout={({nativeEvent}) => {
    const {width} = nativeEvent.layout;
    setImgWidth(parseInt(width / cols) - 5);
  }} style={{position: 'absolute', left: padding, right: padding, top:0, bottom:0,}}>
    <Blank />
    <Text style={styles.title}>{itemName}</Text>
    <Blank />
    {imgWidth && <Grid height={imgWidth} cols={cols} imgSrcs={imgSrcs} ></Grid>}
    <Text>{itemWording}</Text>
    <Blank />
    <Text>{itemPrice}{itemTax && '(' + itemTax + ')'}{itemShippingFee && '(' + itemShippingFee + ')'}</Text>
    <Blank />
    <Text>喜欢该商品的人数: {likes}</Text>
    <Blank />
    <Text>{itemDescription}</Text>
    <Blank />
    <Text>{sold}</Text>
  </ScrollView>

  return (
    <View style={{flex: 1}}>
      {loading ? <Indicator/> : content}
    </View>
  )
}

const styles = {
  title: {fontSize: 20},
}