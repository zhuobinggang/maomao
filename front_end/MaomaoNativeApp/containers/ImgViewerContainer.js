import React,{useEffect} from 'react'
import { connect } from 'react-redux'
// import ImgViewer from '../components/ImageViewer'
import ImageViewer from 'react-native-image-viewer-web'
import actions from '../actions'
import TYPES from '../TYPES'

const shaper = (state, ownProps) => {
  return state.imgViewer
}

const dispatcher = (dispatch) => {
  return {}
}

const MyViewer = (props) => {
  useEffect(() => {
    props.navigation.setOptions({ title: props.title })
  },[]);
  return <ImageViewer {...props} />
}

export default connect(shaper, dispatcher)(MyViewer);