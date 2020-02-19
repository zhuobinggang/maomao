import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, Text, View, Button, Alert, Platform} from 'react-native';
import Blank from './Blank'

const validators = {
  username: /[_a-zA-Z]\w{7,15}/,
  password: /[_a-zA-Z]\w{7,15}/,
}

function isValidInput(user, pass, pass2, nick){
  if(pass != pass2){
    myAlert('两次输入不一致!')
    return false
  }else if(!validators.username.test(user)){
    myAlert('用戶名必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(!validators.password.test(pass)){
    myAlert('密碼必須為: 8到16位,字母開頭的字符串')
    return false
  }else if(nick.length < 2 || nick.length > 8){
    myAlert('昵稱必須為: 2到8位')
    return false
  }else{
    return true
  }
}

function myAlert(alertText){
  if(Platform.OS === 'web') {
    alert(alertText)
  }else{
    Alert.alert(alertTitle, alertText)
  }
}

export default ({navigation, register, loading = false, logined = false}) => {
  const [user, onChangeUser] = useState('');
  const [pass, onChangePass] = useState('');
  const [pass2, onChangePass2] = useState('');
  const [nick, onChangeNick] = useState('');

  useEffect(() => {
    console.log('Update login page and there is some different in logined')
    if(logined){
      navigation.navigate('Home');
    }
  },[logined])

  return (<View style={style.container}>
    <Blank size='big'/>
    <TextInput style={style.input} placeholder='点击输入用户名' value={user} onChangeText={onChangeUser} />
    <Blank size='small'/>
    <TextInput style={style.input} placeholder='点击输入密码' value={pass} onChangeText={onChangePass} />
    <Blank size='small'/>
    <TextInput style={style.input} placeholder='重复您的密码' value={pass2} onChangeText={onChangePass2} />
    <Blank size='small'/>
    <TextInput style={style.input} placeholder='点击输入昵称' value={nick} onChangeText={onChangeNick} />
    <Blank size='big'/>
    <Button
      title="注册"
      disabled={loading}
      onPress={() => {
        if(isValidInput(user, pass, pass2, nick)){
          register(user, pass, nick,)
        }else{
          //
        }
      }}
    />
  </View>)
}

const style = {
  container: {paddingHorizontal: 16,},
  input: {height: 40, backgroundColor: 'white'}
}