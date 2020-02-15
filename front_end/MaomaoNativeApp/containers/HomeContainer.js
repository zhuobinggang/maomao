import { connect } from 'react-redux'
import Home from '../components/Home'
import actions from '../actions'
import TYPES from '../TYPES'

const shaper = (state, ownProps) => {
  console.log('+++++++++++++')
  console.log(ownProps)
  return { ...state.home, jwt: state.jwt, logined: state.logined}
}

const dispatcher = (dispatch, ownProps) => {
  return {
    getVisitCount: () => {
      console.log('dd')
      actions.getVisitCount().then(visitCount => {
        dispatch({
          type: TYPES.VISIT_COUNT_GOT,
          visitCount
        })
      }).catch(err => {
        console.log('Get visit count failed')
      })
    },
    getUserName: (jwt) => {
      actions.getUserName(jwt).then(username => {
        dispatch({
          type: TYPES.USER_NAME_GOT,
          username
        })
      }).catch(err => {
        console.warn('Get user name failed')
      })
    },
    imgViewerShow: (imgs) => {
      dispatch({
        type: TYPES.IMG_VIEWER_SHOW,
        imgs
      })
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getUserName: () => {
      console.log('IN mergeProps')
      console.log(stateProps)
      dispatchProps.getUserName(stateProps.jwt);
    }
  }
}

export default connect(shaper, dispatcher, mergeProps)(Home);