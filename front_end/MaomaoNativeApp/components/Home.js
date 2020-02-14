import React,{ useEffect } from 'react'
import { Text, View, Button } from 'react-native';
import Blank from './Blank';
import Space from './Space';
import Grid from 'react-native-grid-configurable';

export default ({visitCount = 'Mock data', username, getUserName, getVisitCount, navigation}) => {
  useEffect(() => {
    //DidMount
    getUserName()
    getVisitCount()
  }, []);

  const navBar = (<View style={{ flex: 1, flexDirection: 'row-reverse'}}>
    {username == null ? 
      <View style={{flexDirection: 'row'}}>
        <Button title="登陆" onPress={() => navigation.navigate('Login')} />
        <Space width={8} />
        <Button title="注册" onPress={() => Alert.alert('注册')} />
      </View> :
      <Text>欢迎, {username}</Text>
    }
  </View>)

  return (
    <View style={{paddingHorizontal: 16}}>
        <Blank size='big'></Blank>
        {navBar}
        <Blank size='big'></Blank>
        <View style={{}}><Text>海淘，就上猫猫网</Text></View>
        <Blank size='big'></Blank>

        <Grid cols={3} height={90} titles={['煤炉商品搜索','雅虎商品查看','购买流程', ]} imgSrcs={[
          require('../assets/app_imgs/mercari.jpg'),
          require('../assets/app_imgs/yahooauc.png'),
          require('../assets/app_imgs/questionmark.jpg'),
        ]}  callbacks={[() => {console.log('fuck')}, () => {console.log('fuck2')}]}></Grid>

        <Blank size='big'></Blank>
        <View><Text>今日访问次数: {visitCount}</Text></View>
        <Blank size='big'></Blank>
        <View><Text>欢迎来到猫猫网</Text></View>

    </View>

  );
}

