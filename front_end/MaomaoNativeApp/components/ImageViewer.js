import React,{useEffect, useState} from 'react'
import {Dimensions, View, Text, PanResponder, Image} from 'react-native';
// import Image from './Image'
import Modal from './MyModal'

const doubleClickHandlerCreate = (
  doSomeThing = () => {console.warn('Double clicked but nothing will happen!')}, 
  threshold = 200,
) => {
  let lastPressTime = 0
  return () => {
    console.log('FFFFFFFFF', lastPressTime)
    const now = new Date().getTime()
    if(now - lastPressTime < threshold){
      doSomeThing();
    }else{
      lastPressTime = now;
    }
  }
}

const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => {return true },
    onMoveShouldSetPanResponder: () => {return true},
    onPanResponderGrant: ( event, gestureState,) => {
      console.log('Here grant')
      // console.log(gestureState.x0, gestureState.y0)
    },
    onPanResponderMove: (event, gestureState) => {
      console.log(gestureState)
    },
    // onPanResponderRelease: this._handlePanResponderEnd,
    // onPanResponderTerminate: this._handlePanResponderEnd,
});

const zoomToggle = (imgWidth, setImgWidth) => {
  const screenWidth = Dimensions.get('window').width;
  if(imgWidth > screenWidth){
    console.log('zoom out')
    setImgWidth(screenWidth)
  }else{
    console.log('zoom in')
    setImgWidth(screenWidth * 2)
  }
}

function getHeightByWidth(uri,width){
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (originWidth, orginHeight) => {
      const ratio = parseFloat(orginHeight) / parseFloat(originWidth);
      const height  = Math.floor(parseFloat(width) * ratio)
      resolve(height)
    })
  })
}

export default ({imgs}) => {
  const [imgIndex, setimgIndex] = useState(0)
  // TODO: Do not depend on screen but use layout listener instead.
  /**
    <View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        console.log('height:', layout.height);
        console.log('width:', layout.width);
        console.log('x:', layout.x);
        console.log('y:', layout.y);
      }}
    >
   */
  // const [imgWidth, setImgWidth] = useState(Dimensions.get('window').width)
  const [imgHeight, setImgHeight] = useState(0)
  const [imgX, setImgX] = useState(0)
  const [imgY, setImgY] = useState(0)
  
  useEffect(() => {
    getHeightByWidth(imgs[imgIndex], imgWidth).then(height => {
      setImgHeight(height)
      return Promise.resolve()
    }).then(() => {
      //Set position placing the picture center
    })
  },[imgWidth])


  const component = (
    //TODO: Add layout listener
    <View style={{backgroundColor:'red', width:"100%", height: '100%'}} {...responder.panHandlers}>
      <Image style={{width: imgWidth, height: imgHeight, position: 'absolute', top: imgY, left: imgX}}  source={{uri: imgs[imgIndex]}} />
    </View>
  )

  return (
    <Modal verticalOffset={64} component={component} />
  )
}