import {AsyncStorage} from 'react-native';
import TYPES from '../TYPES'
import variables from '../VARS'
import myAlert from '../Alert';
const V = variables;

const TAKE_OUT_JWT_TOKEN = 'TAKE_OUT_JWT_TOKEN'
const TAKE_OUT_JWT_OK = 'TAKE_OUT_JWT_OK'
const GET_USER_NAME = 'GET_USER_NAME'
const GET_USER_NAME_OK = 'GET_USER_NAME_OK'
const GET_USER_NAME_FAIL = 'GET_USER_NAME_FAIL'
const GET_VISIT_COUNT = 'GET_VISIT_COUNT'
const GET_VISIT_COUNT_OK = 'GET_VISIT_COUNT_OK'
const GET_VISIT_COUNT_FAIL = 'GET_VISIT_COUNT_FAIL';


const takeOutJwtToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('jwt-token').then(jwt => {
      console.log('JWT is ', jwt)
      resolve(jwt)
    })
  })
}

const takeOutJwtOK = (jwt) => {
  return {
    type: TAKE_OUT_JWT_OK,
    jwt
  }
}

const getUserName =  (jwt) => {
  return fetch(`${variables.SERVER}/username?jwt=${jwt || ''}`).then(res => {
    if(res.status == 200){
      return res.text()
    }else{
      return Promise.reject('No logined')
    }
  })
}

const getUserNameOK = (username) => {
  return {
    type: GET_USER_NAME_OK,
    username
  }
}
const getUserNameFail = (err) => {
  return {
    type: GET_USER_NAME_FAIL,
    err
  }
}

const getVisitCount = () =>{
  return fetch(`${variables.SERVER}/visits/count`).then(count => {
    if(count.status == 200){
      return count.text()
    }else{
      return Promise.reject()
    }
  })
}
const getVisitCountOK = (visitCount) => {
  return {
    type: GET_VISIT_COUNT_OK,
    visitCount
  }
}
const getVisitCountFail = (err) => {
  return {
    type: GET_VISIT_COUNT_FAIL,
    err
  }
}


const jwtTokenGot = (jwt) => {
  return {
    type: TYPES.JWT_TOKEN_GOT,
    jwt
  }
}

const login = (dispatch, user, pass) => {
  dispatch({type: TYPES.LOGIN, status: 'dispending'})
  loginRequest(user, pass).then((jwt) => {
    dispatch({type: TYPES.LOGIN, status: 'ok'})
    return setJwt(jwt).then(() => {
      return jwt
    })
  }).then(jwt => {
    dispatch({type: TYPES.JWT_TOKEN_GOT, jwt})
    dispatch({type: TYPES.LOGINED})
  }).catch(() => {
    dispatch({type: TYPES.LOGIN, status: 'fail'})
    myAlert('Login fail')
  })
}

const loginRequest = (user, pass) => {
  return fetch(`${variables.SERVER}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user,pass}),
  }).then(res => {
    if(res.status == 200){
      return res.text()
    }else{
      return Promise.reject()
    }
  })
}

const setJwt = (jwt) => {
  return AsyncStorage.setItem('jwt', jwt)
}

function isValidMid(mid){
  //TODO: 
  return mid != null && mid != '';
}

const fetchItemData = (dispatch, mid) => {
  if(isValidMid(mid)){
    dispatch({
      type: TYPES.MERCARI_ITEM_GETTING,
    });
    fetch(`${V.SERVER}/mercari/item/${mid}`).then(res => {
      if(res.status == 404){
        return Promise.reject('No this item')
      }else{
        return res.json()
      }
    }).then(item => {
      //TODO: do something on the item
      window.item = item;
      dispatch({
        type: TYPES.MERCARI_ITEM_GOT,
        ...item,
      });
    })
  }else{
    myAlert('Not valid item id')
  }
}

function register(user, pass, nick){
  return fetch(`${V.SERVER}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: user, password: pass, nick}),
  }).then(res => {
    if(res.status != 200){
      return Promise.reject(res.text())
    }else{
      return
    }
  })
}

export default {
  jwtTokenGot,
  login,
  setJwt,
  takeOutJwtToken,
  takeOutJwtOK,

  getUserName, 
  getUserNameOK,
  getUserNameFail,
  getVisitCount, 
  getVisitCountOK, 
  getVisitCountFail, 

  fetchItemData,
  register,
}