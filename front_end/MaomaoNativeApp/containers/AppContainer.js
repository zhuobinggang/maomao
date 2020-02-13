import React from 'react';
import { connect } from 'react-redux'
import App from '../components/AppComponent'
import actions from '../actions/index'

const shaper = (state, ownProps) => {
  return state
}

const dispatcher = (dispatch, ownProps) => {
  return {
    takeOutJwtToken: () => {
      //Fetch login data from server
      dispatch(actions.takeOutJwtToken)
    }
  }
}

export default connect(shaper, dispatcher)(App);