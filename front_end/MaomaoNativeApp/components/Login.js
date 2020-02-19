import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, Text, View, Button } from 'react-native';
import Blank from './Blank'


export default ({navigation, login, loginButtonDead = false, logined = false}) => {
  const [user, onChangeUser] = useState('');
  const [pass, onChangePass] = useState('');

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
    <TextInput secureTextEntry={true} style={style.input} placeholder='点击输入密码' value={pass} onChangeText={onChangePass} />
    <Blank size='big'/>
    <Button
      title="登陆"
      disabled={loginButtonDead}
      onPress={() => {
        login(user, pass)
      }}
    />
  </View>)
}

const style = {
  container: {paddingHorizontal: 16,},
  input: {height: 40, backgroundColor: 'white'}
}