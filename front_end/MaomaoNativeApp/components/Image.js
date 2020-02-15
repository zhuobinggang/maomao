import React,{useEffect, useState} from 'react'
import { View, Image, Dimensions } from 'react-native';

export default ({uri, imgWidth}) => {
  const [height, setHeight] = useState(100)

  useEffect(() => {
    //To maintain the aspect ratio
    Image.getSize(uri, (originWidth, orginHeight) => {
      const ratio = parseFloat(orginHeight) / parseFloat(originWidth);
      const height  = Math.floor(parseFloat(imgWidth) * ratio)
      setHeight(height)
    })
  })

  return (
    <Image style={{width: imgWidth, height}}  source={{uri}} />
  )
}