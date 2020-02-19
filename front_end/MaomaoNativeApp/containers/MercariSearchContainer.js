import { connect } from 'react-redux';
import MercariSearch from '../components/MercariSearch';
import $ from 'jquery';
import V from '../VARS'
import TYPES from '../TYPES';

const stateToProps = (state) => {
  return {
    ...state.mercariSearch,
    imgSrcs: state.mercariSearch.items.map(item => {
      return `${V.SERVER}${item.src}`
    })
  };
}

const dispatchToProps = (dispatch) => {
  return {
    searchStart: (keyword, page=1) => {
      if(keyword == null || keyword == ''){
        console.warn('Why search empty keyword?');
      }else if(isNaN(page)){
        console.warn('Wrong page num');
      }else{
        fetch(`${V.SERVER}/mercari/search/keyword/${keyword}/page/${page}`).then(res => {
          return res.json()
        }).then(({items, currentPage, hasNextPage}) => {
          dispatch({
            type: TYPES.SEARCHED,
            items,
            currentPage,
            hasNextPage,
          })
        }).catch(e => {
          console.warn('Searching failed')
        })
      }
    },
  }
}

export default connect(stateToProps, dispatchToProps)(MercariSearch)