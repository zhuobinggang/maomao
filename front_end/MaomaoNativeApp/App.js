import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore((state, action) => {
  return null
});

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#4286f4',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
