import { connect } from 'react-redux'
import Home from '../components/Home'
import actions from '../actions'
import TYPES from '../TYPES'

const shaper = (state, ownProps) => {
  return { ...state.home, jwt: state.jwt}
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
    getUserName: () => {
      console.log('bb')
      actions.getUserName(ownProps.jwt).then(username => {
        dispatch(actions.getUserNameOK(username))
      }).catch(err => {
        dispatch(actions.getUserNameFail(err))
      })
    },
  }
}

export default connect(shaper, dispatcher)(Home);