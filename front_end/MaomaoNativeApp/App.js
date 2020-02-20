import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
//Q: If import the App Container instead of App? A: Yes
import rootReducer from './reducers'
import V from './VARS'

import AppFetchGlobalInfo from './containers/AppContainer'

//Why did you render?
// if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
// }

(() => {
  fetch(`${V.SERVER}/views`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
})();

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppFetchGlobalInfo />
    </Provider>
  );
}
