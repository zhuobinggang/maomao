import React,{useState} from 'react';
import SearchBar from './SearchBar';
import { Text, View, Button,  TouchableHighlight, ScrollView} from 'react-native';
import {Blank} from './Space';
import Grid from 'react-native-grid-configurable';
import Indicator from './Indicator';

function shouldShowPaginator(currentPage, hasNext){
  return hasNext || currentPage > 1
}

const MercariSearch = ({searchStart, imgSrcs=[], prices = [], keyword = '', currentPage = 1, hasNextPage = false, openDetails=[], loading}) => {
  const keywordSearched = keyword;
  const searchBarHeight = 40;
  const paginatorHeight = 40;
  const padding = 8;

  const [keywordChanging, changeKeywordChanging] =  useState(keywordSearched);

  const content = (<View style={{position: 'absolute', top: 0, left: 8, bottom: 0, right: 8,}}>
    <Blank size={padding}/>
    <SearchBar changeKeyword={changeKeywordChanging} height={searchBarHeight} keyword={keywordChanging} onPress={searchStart} buttonText='搜索' placeholder='中文恐怕搜不到哦, 请输入日语或英文' />

    <View style={{position: 'absolute', top: searchBarHeight + padding, left: 8, bottom: shouldShowPaginator(currentPage, hasNextPage)? paginatorHeight : 0, right: 8,}}>
      <Grid 
        cols={3} 
        height={70}  
        imgSrcs={imgSrcs} 
        titles={prices} 
        callbacks={openDetails}
        paddingBetweenRows={8}></Grid>
    </View>

    {shouldShowPaginator(currentPage, hasNextPage) &&
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: paginatorHeight, alignItems: 'center', flexDirection: 'row' }}>
        {currentPage > 1 &&
          <Button title='上一页' onPress={() => {
            searchStart(keywordChanging,parseInt(currentPage) - 1)
          } } />
        }
        {hasNextPage && 
          <View style={{position: 'absolute', right:0}}>
            <Button title="下一页" onPress={() => {
              searchStart(keywordChanging,parseInt(currentPage)  + 1)
            }}/>
          </View>
        }
      </View>   
    }
  </View>)
  
  return (
    <View style={{flex: 1}}>
      {loading ? <Indicator/> : content}
    </View>
  ) 
}
export default  MercariSearch;