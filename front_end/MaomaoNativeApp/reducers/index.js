import app from './app'
import TYPES from '../TYPES'

const MOCK_STR = 'Mock data'

const initialState = {
  home: {
    visitCount: MOCK_STR,
  },
  login: {
    loginButtonDead: false,
  },
  jwtToken: null,
}

const jwtTokenGot = (action) => {
  if(action.type == TYPES.JWT_TOKEN_GOT){
    console.log('fuckkkkkkk',)
    console.log(action)
    return action.jwt
  }else{
    return null
  }
}

const loginReducer = (state,action) => {
  if(action.type == TYPES.LOGIN){
    if(action.status == 'dispending'){
      return {loginButtonDead: true}
    }else if(action.status == 'ok'){
      console.log('登陆成功')
      return {loginButtonDead: true}
    }else if(action.status == 'fail'){
      console.log('登陆失败')
      return {loginButtonDead: false}
    }
  }
  return state
}

const home = (_, action) => {
  if(action.type == TYPES.VISIT_COUNT_GOT){
    return {
      visitCount: action.visitCount
    }
  }
} 

const reducer = (state = initialState, action) => {
  console.log(state)
  return {
    jwtToken: jwtTokenGot(action),
    home: home(state.home, action),
    login: loginReducer(state.login, action),
  }
}

export default reducer