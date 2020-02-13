const MOCK_STR = 'Mock data'
import app from './app'

const initialState = {
  home: {
    visitCount: MOCK_STR
  },
  jwtToken: null,
}

const reducer = (state = initialState, action) => {
  return {
    jwtToken: app(null, action),
    home: state.home,
  }
}

export default reducer