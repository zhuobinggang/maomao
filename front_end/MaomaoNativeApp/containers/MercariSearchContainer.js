import { connect } from 'react-redux';
import MercariSearch from '../components/MercariSearch';
import V from '../VARS';
import TYPES from '../TYPES';
import actions from '../actions/index';
import myAlert from '../Alert';

function RmbFromJpyString(priceString){
  priceString = String(priceString);
  const jpy = parseInt(priceString.replace('¥','').replace(',',''))
  return parseInt(jpy * 0.0667)
}

const stateToProps = (state) => {
  return {
    ...state.mercariSearch,
    imgSrcs: state.mercariSearch.items.map(item => {
      return `${V.SERVER}${item.src}`
    }),
    prices: state.mercariSearch.items.map(item => {
      const rmb = RmbFromJpyString(item.price);
      if(item.sold){
        return `${rmb}元(已售)`
      }else{
        return `${rmb}元`
      }
    }),
    mids: state.mercariSearch.items.map(item => {
      return item.mid;
    })
  };
}

const dispatchToProps = (dispatch) => {
  return {
    searchStart: (keyword, page=1) => {
      if(keyword == null || keyword == ''){
        myAlert('Why search empty keyword?');
      }else if(isNaN(page)){
        myAlert('Wrong page num');
      }else{
        dispatch({
          type: TYPES.SEARCH_START
        })
        fetch(`${V.SERVER}/mercari/search/keyword/${keyword}/page/${page}`).then(res => {
          return res.json()
        }).then(({items, currentPage, hasNextPage}) => {
          dispatch({
            type: TYPES.SEARCHED,
            items,
            currentPage,
            hasNextPage,
            keyword,
          })
        }).catch(e => {
          myAlert('Searching failed')
          dispatch({
            type: TYPES.SEARCHED,
            items: [],
            currentPage: 1,
            hasNextPage: false,
            keyword: '',
          })
        })
      }
    },
    fetchItemData: (mid) => {
      actions.fetchItemData(dispatch, mid)
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    openDetails: stateProps.mids.map(mid => {
      return () => {
        dispatchProps.fetchItemData(mid)
        ownProps.navigation.navigate('MercariItem')
        //Show indicator here
      }
    }),
  }
}

export default connect(stateToProps, dispatchToProps, mergeProps)(MercariSearch)