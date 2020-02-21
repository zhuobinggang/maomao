import React from 'react'

return ({stastics}) => {
  return <View>
    {stastics.map((item, index) => {
      return [String(index), item.name, ':', item.count].join(' ')
    })}
  </View>
}