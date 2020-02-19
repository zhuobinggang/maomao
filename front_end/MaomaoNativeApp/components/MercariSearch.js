import React from 'react';
import SearchBar from './SearchBar';
import { Text, View, Button,  TouchableHighlight, ScrollView} from 'react-native';
import {Blank} from './Space';
import Grid from 'react-native-grid-configurable';


export default ({searchStart, imgSrcs=[]}) => {
  return (<View style={{position: 'absolute', top: 0, left: 8, bottom: 0, right: 8, backgroundColor: 'red'}}>
    <Blank/>
    <SearchBar onPress={searchStart} />
    <Blank/>

    <Grid 
      cols={3} 
      height={70}  
      imgSrcs={imgSrcs} 
      // titles={['A loo oo ooo ooo ooo ooo ooo ong book name','bb','bb','bb','bb']} 
      paddingBetweenRows={16}></Grid>
  </View>)
}