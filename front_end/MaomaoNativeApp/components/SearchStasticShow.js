import React from 'react'
import {View, Text} from 'react-native'

export default ({stastics}) => {
  return <View>
    {stastics.map((item, index) => {
      return <Text>{[String(index), item.name, ':', item.count].join(' ')}</Text>
    })}
  </View>
}