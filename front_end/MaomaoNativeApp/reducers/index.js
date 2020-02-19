import TYPES from '../TYPES'

const MOCK_STR = 'Mock data'

const initialState = {
  home: {
    visitCount: MOCK_STR,
    username: null,
  },
  login: {
    loginButtonDead: false,
  },
  logined: false,
  jwt: null,
  imgViewer: {
    imgs: [],
    bgColor: null,
    footer: null,
    footerColor: null,
    footerTextColor: null,
  },
  mercariSearch: {
    items: [],
    currentPage: 1,
    hasNextPage: false,
  }
}

const jwtTokenGot = (jwt, action) => {
  if(action.type == TYPES.JWT_TOKEN_GOT){
    console.log('fuckkkkkkk',)
    console.log(action)
    return action.jwt
  }else{
    return jwt
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
  }else{
    return state
  }
}

const home = (home, action) => {
  if(action.type == TYPES.VISIT_COUNT_GOT){
    return {
      ...home,
      visitCount: action.visitCount
    }
  }else if(action.type == TYPES.USER_NAME_GOT){
    return {
      ...home,
      username: action.username
    }
  }else{
    return home
  }
} 

const logined = ({logined}, action) => {
  if(action.type == TYPES.LOGINED){
    return true
  }else{
    return logined
  }
}

const imgViewer = (state, {
  type, 
  imgs = [], 
  bgColor= null,
  footer= null, 
  footerColor= null, 
  footerTextColor= null
}) => {
  if(type == TYPES.IMG_VIEWER_SHOW){
    return {
      ...state, imgs, bgColor, footer, footerColor, footerTextColor
    }
  }else{
    return state
  }
}

const mercariSearch = (state, {type, items, currentPage, hasNextPage}) => {
  if(type == TYPES.SEARCHED){
    return {items, currentPage, hasNextPage};
  }else{
    return state;
  }
}

const reducer = (state = initialState, action) => {
  console.log(state)
  return {
    jwt: jwtTokenGot(state.jwt, action),
    home: home(state.home, action),
    login: loginReducer(state.login, action),
    logined: logined(state, action),
    imgViewer: imgViewer(state.imgViewer, action),
    mercariSearch: mercariSearch(state.mercariSearch, action)
  }
}

export default reducer