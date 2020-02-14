import $ from 'jquery'
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
  return new Promise((resolve, reject) => {
    $.get(`${variables.SERVER}/username`, {jwt}).done(username => {
      resolve(username)
    }).fail(() => {
      reject('错误的用户名或密码')
    })
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
  return new Promise((resolve, reject) => {
    console.log('FUUUUUK')
    $.get(`${variables.SERVER}/visits/count`).done(count => {
      resolve(count)
    }).fail(() => {
      reject('Server or network error')
    })
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
  return new Promise((resolve, reject) => {
    const url = `${variables.SERVER}/login`;
    console.log(url)
    $.post(url, {user, pass})
      .done(jwt => {
        resolve(jwt)
      })
      .fail(() => {
        reject()
      })
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