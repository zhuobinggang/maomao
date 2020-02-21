import { connect } from 'react-redux'
import SearchStasticShow from '../components/SearchStasticShow'

const stateToProp = (state) => {
  return state.searchStasticShow
}

const dispatchToProp = () => { 
  return {}
}

export default connect(stateToProp, dispatchToProp)(SearchStasticShow)