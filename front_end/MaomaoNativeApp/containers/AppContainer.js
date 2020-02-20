import { connect } from 'react-redux'
import App from '../components/AppComponent'
import actions from '../actions/index'
import myAlert from '../Alert'

const shaper = (state, ownProps) => {
  return state
}

const dispatcher = (dispatch, ownProps) => {
  return {
    takeOutJwtToken: () => {
      actions.takeOutJwtToken().then(jwt => {
        dispatch(actions.takeOutJwtOK(jwt))
      }).catch(() => {
        myAlert('There is no jwt in the storage')
      })
    }
  }
}

export default connect(shaper, dispatcher)(App);