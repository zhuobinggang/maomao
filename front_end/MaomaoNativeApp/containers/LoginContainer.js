import { connect } from 'react-redux'
import Login from '../components/Login'
import actions from '../actions/index'
import TYPES from '../TYPES'

const shaper = ({login, logined}, ownProps) => {
  return { ...login, logined }
}

const dispatcher = (dispatch, ownProps) => {
  return {
    login: (user, pass) => {
      actions.login(dispatch, user, pass)
    }
  }
}

export default connect(shaper, dispatcher)(Login);