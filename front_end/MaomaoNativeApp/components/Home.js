import React from 'react'
import { Text, View, Image } from 'react-native';
import Blank from './Blank'
import Grid from './Grid'

const Home = (props) => {
  return (
    <View
      style={styles}>
        <View style={{backgroundColor: 'red',  flex: 1, flexDirection: 'row-reverse'}}><Text>登陆, 注册</Text></View>
        <Blank size='big'></Blank>
        <View style={{backgroundColor: 'yellow', }}><Text>海淘，就上猫猫网</Text></View>
        <Blank size='big'></Blank>

        <Grid cols={3} height={90}  imgSrcs={[
          'https://facebook.github.io/react-native/img/tiny_logo.png',
          'https://facebook.github.io/react-native/img/tiny_logo.png',
          'https://facebook.github.io/react-native/img/tiny_logo.png',
          'https://facebook.github.io/react-native/img/tiny_logo.png',
          'https://facebook.github.io/react-native/img/tiny_logo.png',
        ]}></Grid>

        <Blank size='big'></Blank>
        <View><Text>今日访问次数: MOCK</Text></View>
        <Blank size='big'></Blank>
        <View><Text>欢迎来到猫猫网</Text></View>
    </View>

  );
}

const styles = {
  backgroundColor: 'blue',
}

export default Home;