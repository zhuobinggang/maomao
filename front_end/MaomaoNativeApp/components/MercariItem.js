import React,{useEffect, useState} from 'react'
import {ScrollView, Text, Dimensions, View} from 'react-native'
import {Blank} from './Space'
import Grid from 'react-native-grid-configurable'
import Indicator from './Indicator';


export default class MercariItem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgWidth: null,
    }
  }

  shouldComponentUpdate = (nextProps, _) => {
    if(nextProps.itemName == this.props.itemName && nextProps.itemPrice == this.props.itemPrice){
      return false;
    }else{
      return true;
    }
  }

  render(){
    const {itemName, itemWording, itemPrice, itemTax, itemShippingFee, itemDescription, likes, sold, imgSrcs = [], loading, imgShowCbs} = this.props;
    const padding = 8;
    const cols = 5;
    const imgWidth = parseInt((Dimensions.get('window').width - padding * 2) / cols) - 3

    const content = <ScrollView style={{position: 'absolute', left: padding, right: padding, top:0, bottom:0,}}>
      <Blank />
      <Text style={styles.title}>{itemName}</Text>
      <Blank />
      {imgWidth && <Grid height={imgWidth} cols={cols} imgSrcs={imgSrcs} callbacks={imgShowCbs} ></Grid>}
      <Text>{itemWording}</Text>
      <Blank />
      <Text>{itemPrice}{itemTax && itemTax}{itemShippingFee && '(' + itemShippingFee + ')'}</Text>
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
}

const styles = {
  title: {fontSize: 20},
}