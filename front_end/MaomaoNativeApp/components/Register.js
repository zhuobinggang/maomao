import React from 'react';
import { View} from 'react-native';
import Viewer from 'react-native-image-viewer-web'


export default () => {
  return <Viewer imgs={[
      'https://i.stack.imgur.com/aHsxg.png?s=64&g=1', 
      'https://avatars3.githubusercontent.com/u/20993661?s=460&v=4']
    } />
}