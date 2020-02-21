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
    title: '图片查看器',
    index: 0,
  },
  mercariSearch: {
    items: [],
    currentPage: 1,
    hasNextPage: false,
    keyword: '',
    loading: false,
  },
  mercariItem: {
    itemName: '', 
    itemWording: '',
    itemPrice: '', 
    itemTax: '', 
    itemShippingFee: '', 
    itemDescription: '', 
    likes: '', 
    imgs: [], 
    sold: false,
    mid: '',
    loading: false,
  },
  register: {
    loading: false, 
  },
}

const jwtTokenGot = (jwt, action) => {
  if(action.type == TYPES.JWT_TOKEN_GOT){
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
      return {loginButtonDead: true}
    }else if(action.status == 'fail'){
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
  type, imgs = [], bgColor= null, footer= null, footerColor= null, 
  footerTextColor= null, title, index,
}) => {
  if(type == TYPES.IMG_VIEWER_SHOW){
    return {
      ...state, imgs, bgColor, footer, footerColor, footerTextColor, title, index,
    }
  }else{
    return state
  }
}

const mercariSearch = (state, action) => {
  if(action.type == TYPES.SEARCHED){
    return {...state, ...action, loading: false, };
  }else if(action.type == TYPES.SEARCH_START){
    return {...state, loading: true};
  }else{
    return state
  }
}

const mercariItem = (state, action) => {
  if(action.type == TYPES.MERCARI_ITEM_GOT){
    return {...state, ...action, loading: false}
  }else if(action.type == TYPES.MERCARI_ITEM_GETTING){
    return {...state, loading: true}
  }else{
    return state
  }
}

const register = (state, action) => {
  if(action.type == TYPES.REGISTER){
    if(action.status == 'pending'){
      return {...state, loading: true}
    }else if(action.status == 'ok'){
      return {...state, loading: false}
    }else if(action.status == 'fail'){
      return {...state, loading: false}
    }else{
      return state
    }
  }else{
    return state
  }
}

const reducer = (state = initialState, action) => {
  console.log('There is some difference here');
  return {
    jwt: jwtTokenGot(state.jwt, action),
    home: home(state.home, action),
    login: loginReducer(state.login, action),
    logined: logined(state, action),
    imgViewer: imgViewer(state.imgViewer, action),
    mercariSearch: mercariSearch(state.mercariSearch, action),
    mercariItem: mercariItem(state.mercariItem, action),
    register: register(state.register, action),
  }
}

export default reducer