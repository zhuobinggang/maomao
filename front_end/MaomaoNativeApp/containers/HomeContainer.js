import { connect } from 'react-redux'
import Home from '../components/Home'
import actions from '../actions'

const shaper = (state, ownProps) => {
  return state
}

const dispatcher = (dispatch, ownProps) => {
  return {
    getVisitCount: () => {dispatch(actions.getVisitCount)},
    getUserName: () => {dispatch(actions.getUserName)},
  }
}

export default connect(shaper, dispatcher)(Home);