import {AsyncStorage} from 'react-native';
const TAKE_OUT_JWT_TOKEN = 'TAKE_OUT_JWT_TOKEN'


export default async (_, action) => {
  //Fetch the jwt-token and set it
  if(action.type == TAKE_OUT_JWT_TOKEN){
    console.log('FUUUUUK!')
    return await AsyncStorage.getItem('jwt-token')
  }
}