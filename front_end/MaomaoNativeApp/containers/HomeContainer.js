import { connect } from 'react-redux'
import Home from '../components/Home'
import actions from '../actions'
import TYPES from '../TYPES'
import myAlert from '../Alert'

const shaper = (state, ownProps) => {
  return { ...state.home, jwt: state.jwt, logined: state.logined}
}

const dispatcher = (dispatch, ownProps) => {
  return {
    getVisitCount: () => {
      actions.getVisitCount().then(visitCount => {
        dispatch({
          type: TYPES.VISIT_COUNT_GOT,
          visitCount
        })
      }).catch(err => {
        myAlert('Get visit count failed')
      })
    },
    getUserName: (jwt) => {
      actions.getUserName(jwt).then(username => {
        dispatch({
          type: TYPES.USER_NAME_GOT,
          username
        })
      }).catch(err => {
        console.log('Get user name failed, maybe have not login')
      })
    },
    imgViewerShow: (img) => {
      actions.imgViewerShow(dispatch, [img], '猫猫网购物流程')
    },
    test: () => {
      actions.fetchItemData(dispatch, 'm66184399648')
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getUserName: () => {
      dispatchProps.getUserName(stateProps.jwt);
    }
  }
}

export default connect(shaper, dispatcher, mergeProps)(Home);