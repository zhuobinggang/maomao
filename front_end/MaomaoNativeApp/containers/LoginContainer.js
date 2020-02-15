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
      dispatch({type: TYPES.LOGIN, status: 'dispending'})
      actions.login(user, pass).then((jwt) => {
        dispatch({type: TYPES.LOGIN, status: 'ok'})
        return actions.setJwt(jwt).then(() => {
          return jwt
        })
      }).then(jwt => {
        dispatch({type: TYPES.JWT_TOKEN_GOT, jwt})
        dispatch({type: TYPES.LOGINED})
      }).catch(() => {
        dispatch({type: TYPES.LOGIN, status: 'fail'})
        console.log('Login fail')
      })
    }
  }
}

export default connect(shaper, dispatcher)(Login);