import { connect } from 'react-redux'
import Register from '../components/Register'
import actions from '../actions/index'
import TYPES from '../TYPES'

const shaper = ({register, logined}, ownProps) => {
  return { ...register, logined }
}

const dispatcher = (dispatch, ownProps) => {
  return {
    register: (user, pass, nick) => {
      dispatch({type: TYPES.REGISTER, status: 'pending'})
      actions.register(user, pass, nick).then(() => {
        dispatch({type: TYPES.REGISTER, status: 'ok'})
        //Auto login
        actions.login(dispatch, user, pass)
      }).catch(() => {
        dispatch({type: TYPES.REGISTER, status: 'fail'})
        console.log('Register fail')
      })
    }
  }
}

export default connect(shaper, dispatcher)(Register);