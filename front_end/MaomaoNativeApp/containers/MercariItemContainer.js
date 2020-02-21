import { connect } from 'react-redux'
import View from '../components/MercariItem'
import TYPES from '../TYPES';
import V from '../VARS'
import action from '../actions'

const stateToProps = (state, _) => {
  return {
    ...state.mercariItem,
    imgSrcs: state.mercariItem.imgs.map(src => {
      return `${V.SERVER}${src}`
    }),
  }
}

const dispatchToProps = (dispatch, _) => {
  return {
    showImgs: (imgSrcs, imgIndex) => {
      const footer = 36;
      action.imgViewerShow(dispatch, imgSrcs, '商品图片查看', footer, imgIndex);
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    imgShowCbs: stateProps.imgSrcs.map((_, index) => {
      return () => {
        ownProps.navigation.navigate('ImageViewer');
        dispatchProps.showImgs(stateProps.imgSrcs, index);
      }
    }),
  }
}

export default connect(stateToProps, dispatchToProps, mergeProps)(View)