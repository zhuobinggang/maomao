import { connect } from 'react-redux'
import View from '../components/MercariItem'
import TYPES from '../TYPES';

function isValidMid(mid){
  //TODO: 
  return mid != null && mid != '';
}

const stateToProps = (state, _) => {
  return state.mercariItem
}

const dispatchToProps = (dispatch, _) => {
  //TEST
  window.setMid = (mid) => {
    dispatch({
      type: TYPES.SET_MERCARI_ITEM_ID,
      mid
    })
  }

  return {
    fetchItemData: (mid) => {
      if(isValidMid(mid)){
        fetch(`/mercari/item/${mid}`).then(res => {
          if(res.status == 404){
            return Promise.reject('No this item')
          }else{
            return res.json()
          }
        }).then(item => {
          //TODO: do something on the item
        })
      }else{
        console.warn('Not valid item id')
      }
    }
  }
}

export default connect(stateToProps, dispatchToProps)(View)