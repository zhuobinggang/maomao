import { connect } from 'react-redux'
import ImgViewer from '../components/ImageViewer'
import actions from '../actions'
import TYPES from '../TYPES'

const shaper = (state, ownProps) => {
  return state.imgViewer
}

const dispatcher = (dispatch) => {
  return {}
}

export default connect(shaper, dispatcher)(ImgViewer);