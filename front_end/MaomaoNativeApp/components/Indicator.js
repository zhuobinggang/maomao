import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
} from 'react-native'

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
}