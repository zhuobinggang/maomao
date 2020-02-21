import {connect} from 'react-native'
import SearchStasticShow from '../components/SearchStasticShow'

const stateToProp = (state) => {
  return state.searchStasticShow
}

const dispatchToProp = () => { 
  return {}
}

return connect(stateToProp, dispatchToProp)(SearchStasticShow)