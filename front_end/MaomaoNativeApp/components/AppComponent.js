import React from 'react';
import HomeWithUserNameAndVisitCount from '../containers/HomeContainer';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    //Once got into the component, take the token out from the storage 
    this.props.takeOutJwtToken()
  }

  render(){
    return (
      <View style={{flex: 1,paddingHorizontal: 16,paddingTop: 16,}}>
        <HomeWithUserNameAndVisitCount/>
      </View>
    )
  }
}

 
