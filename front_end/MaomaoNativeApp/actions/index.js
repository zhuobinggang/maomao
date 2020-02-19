import {AsyncStorage} from 'react-native';
import TYPES from '../TYPES'
import variables from '../VARS'

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

const login = (user, pass) => {
  return fetch(url, {
    method: 'POST',
    body: {user,pass}
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
}