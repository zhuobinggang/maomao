import React,{useEffect, useState} from 'react'
import {Dimensions, View, Text, PanResponder, Image} from 'react-native';
// import Image from './Image'
import Modal from './MyModal'

const isRemoteImg = (uri) => {
  return /^http/.test(uri)
}

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

let responder = {} ;

const zoomToggle = (containerWidth, imgWidth, setImgWidth) => {
  if(imgWidth > containerWidth){
    console.log('zoom out')
    setImgWidth(containerWidth)
  }else{
    console.log('zoom in')
    setImgWidth(containerWidth * 2)
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

function locateImageToCenter(width, height, imgWidth, imgHeight, setX, setY, ){
  console.log("diasdojgasdjgioasdog")
  console.log(width, height, imgWidth, imgHeight)
  console.log((width -imgWidth) / 2, (height -imgHeight) / 2)
  setX((width -imgWidth) / 2)
  setY((height -imgHeight) / 2)
}

function makePictureContainerWidth(uri, width, setImgWidth, setImgHeight){
  const imgWidth = width
  setImgWidth(imgWidth) //Fullfill the container
  return getHeightByWidth(uri, imgWidth).then(imgHeight => {
    setImgHeight(imgHeight)
    return Promise.resolve(imgHeight)
  })
}

export default class ImageViewer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgIndex: 0,
      width: 0,
      height: 0,
      imgWidth: 0,
      imgHeight: 0,
      imgX: 0,
      imgY: 0,
    }
  }

  componentDidMount = () => {
    let startPoint = {x: 0, y: 0}
    const doubleClickHandler = doubleClickHandlerCreate(() => {
      zoomToggle(this.state.width, this.state.imgWidth, (imgWidth) => {
        getHeightByWidth(this.props.imgs[this.state.imgIndex],imgWidth).then(imgHeight => {
          this.setState({imgWidth, imgHeight})
        })
      })
    })
    responder = PanResponder.create({
        onStartShouldSetPanResponder: () => {return true },
        onMoveShouldSetPanResponder: () => {return true},
        onPanResponderGrant: ( event, gestureState,) => {
          console.log('Here grant', this.state.imgX, this.state.imgY)
          startPoint.x = this.state.imgX
          startPoint.y = this.state.imgY
          doubleClickHandler()
        },
        onPanResponderMove: (_, gestureState) => {
          const moveX = gestureState.moveX - gestureState.x0;
          const moveY = gestureState.moveY - gestureState.y0;
          this.setState({
            imgX: startPoint.x + moveX,
            imgY: startPoint.y + moveY
          })
        },
        // onPanResponderRelease: this._handlePanResponderEnd,
        // onPanResponderTerminate: this._handlePanResponderEnd,
    })
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(prevState.width != this.state.width || prevState.height != this.state.height){
      //Do not depend on screen but use layout listener instead.
      if(this.state.width == 0 || this.state.height == 0){
        return
      }else{
        const {imgIndex, width, height, } = this.state
        const {imgs} = this.props;
        const setImgWidth = (imgWidth) => {
          this.setState({ imgWidth })
        }
        const setImgHeight = (imgHeight) => {
          this.setState({ imgHeight })
        }
        const setImgX = (imgX) => {
          this.setState({ imgX })
        }
        const setImgY = (imgY) => {
          this.setState({ imgY })
        }
        makePictureContainerWidth(imgs[imgIndex], width, setImgWidth, setImgHeight).then(imgHeight => {
          //Placing the picture centes
          locateImageToCenter(width, height, width, imgHeight, setImgX, setImgY)
        })
      }
    }
  }

  render = () => {
    const uri = this.props.imgs[this.state.imgIndex];
    const component = (
      //Add layout listener
      <View onLayout={event => {
          const {width,height} = event.nativeEvent.layout;
          console.log('height:', height);
          console.log('width:', width);
          //TODO: locate the image to center
          this.setState({height})
          this.setState({width})
        }} style={{backgroundColor:'red', width:"100%", height: '100%'}} {...responder.panHandlers}>
        <Image style={{width: this.state.imgWidth, height: this.state.imgHeight, position: 'absolute', top: this.state.imgY, left: this.state.imgX}}  source={isRemoteImg(uri) ? {uri} : uri} />
      </View>
    )
  
    return (
      <Modal verticalOffset={64} component={component} />
    )
  }
}
