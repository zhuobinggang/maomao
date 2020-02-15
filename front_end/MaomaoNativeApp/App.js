import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//Q: If import the App Container instead of App? A: Yes
import rootReducer from './reducers'

import AppFetchGlobalInfo from './containers/AppContainer'



const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppFetchGlobalInfo />
    </Provider>
  );
}
