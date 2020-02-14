import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//Q: If import the App Container instead of App? A: Yes
import AppFetchGlobalInfo from './containers/AppContainer'
import rootReducer from './reducers'



const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppFetchGlobalInfo />
    </Provider>
  );
}
