import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, Text, View, Button } from 'react-native';
import Blank from './Blank'


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
        //TODO: Validate
        register(user, pass, nick,)
      }}
    />
  </View>)
}

const style = {
  container: {paddingHorizontal: 16,},
  input: {height: 40, backgroundColor: 'white'}
}