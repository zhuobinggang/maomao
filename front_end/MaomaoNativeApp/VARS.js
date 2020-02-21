import {Platform} from 'react-native';

const SERVER = (Platform.OS != 'web' || __DEV__) ? 'http://95.179.253.192:8089' : '';

export default {
  SERVER,
  dd: 'dd'
}