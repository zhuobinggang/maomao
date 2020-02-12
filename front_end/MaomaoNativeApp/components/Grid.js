import React from 'react'
import { Text, View, Image } from 'react-native';

function gridImg(widthPercent, imgHeight, imgSrc){
  return <View style={{height: imgHeight, width: widthPercent + '%', flex:1, alignItems: 'center', justifyContent: 'center' }}>
    {
      imgSrc == null ? null : 
      <Image
        style={{width: imgHeight, height: imgHeight, resizeMode: 'cover'}}
        source={{uri: imgSrc}} /> 
    }
  </View>
}

function gridSubTitle(widthPercent, title){
  return <View style={{width: widthPercent+'%', flex:1, alignItems: 'center', justifyContent: 'center' }}>
    {title == null ? null : <Text>{title}</Text>}
    
  </View>
}

function imgRow(imgSrcsSlice, widthPercent, imgHeight, cols){
  const result = []
  for(let i = 0 ;i< cols; i++){
    result.push(gridImg(widthPercent, imgHeight, imgSrcsSlice[i]))
  }
  return result
}

function subtitleRow(titlesSlice, widthPercent, cols){
  const result = []
  for(let i = 0 ;i< cols; i++){
    result.push(gridSubTitle(widthPercent, titlesSlice[i]))
  }
  return result
}


function gridRows(cols, imgHeight, titles, imgSrcs){
  const rows = []
  const widthPercent = Math.floor(100 / cols);
  const gridNum = Math.max(titles.length, imgSrcs.length);
  const rowNum = gridNum / cols + 1;

  for(let i=1; i<rowNum; i++){
    const offset = (i - 1) * cols;
    const imgSrcsSlice = imgSrcs.slice(offset, offset + cols);
    const titlesSlice = titles.slice(offset, offset + cols);
    rows.push((
      <View>
        <View style={{flex: 1, flexDirection:'row', height: imgHeight}}>
          {imgRow(imgSrcsSlice, widthPercent, imgHeight, cols)}
        </View>
        <View style={{flex: 1, flexDirection:'row'}}>
          {subtitleRow(titlesSlice, widthPercent, cols)}
        </View>
      </View>
    ))
  }

  return rows
}

export default ({cols = 3, height = 100, titles = [], imgSrcs = []}) => {
  return (
    <View>
      {gridRows(cols, height, titles, imgSrcs)}
    </View>
  )
}