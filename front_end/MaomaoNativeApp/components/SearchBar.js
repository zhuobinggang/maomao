import React,{useState} from 'react'
import { TextInput, Text, View, Button,  TouchableHighlight, ScrollView} from 'react-native';

export default ({height = 40, buttonWidth = 40, placeholder = 'Input and search', buttonText = 'Search', onPress= () => {}}) => {
  const [text, changeText] = useState('');
  const padding = 8;
  return (<View style={{width: '100%', height, backgroundColor: '#efeff4', borderRadius: 3}}>
    <View style={{position: 'absolute', left: padding, top: padding, bottom: padding, right: buttonWidth + padding * 2, backgroundColor: 'white', borderRadius: 3}}>
      <TextInput selectionColor='white' style={{width: '100%', height: '100%', }} value={text} placeholder={placeholder} onChangeText={changeText}></TextInput>
    </View>
    <TouchableHighlight 
      onPress={() => {onPress(text)}}
      style={{position: 'absolute', width: buttonWidth, top: padding, bottom: padding, right: padding, borderRadius: 3, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{buttonText}</Text>
    </TouchableHighlight>
  </View>)
}