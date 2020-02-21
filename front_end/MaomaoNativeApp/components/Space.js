import React from 'react'
import { View} from 'react-native';

const Blank = React.memo(({size = 8}) => {
  return <View style={{height: size}}></View>
})

export default React.memo(({width=8}) => {
  return <View style={{width}} />
})

export {
  Blank,
}
