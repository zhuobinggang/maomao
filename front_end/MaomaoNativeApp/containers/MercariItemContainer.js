import { connect } from 'react-redux'
import View from '../components/MercariItem'
import TYPES from '../TYPES';
import V from '../VARS'

const stateToProps = (state, _) => {
  return {
    ...state.mercariItem,
    imgSrcs: state.mercariItem.imgs.map(src => {
      return `${V.SERVER}${src}`
    }),
  }
}

const dispatchToProps = (dispatch, _) => {
  return { }
}

export default connect(stateToProps, dispatchToProps)(View)