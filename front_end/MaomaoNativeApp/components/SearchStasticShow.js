import React, {useState} from 'react'
import {View, Text, Dimensions, } from 'react-native'
import {BarChart} from 'react-native-chart-kit'

export default ({stastics}) => {

  const labels = stastics.map(s => {
    return s.name
  })
  const datasetData = stastics.map(s => {
    return s.num
  })

  const data = {
    labels: labels,
    datasets: [
      {
        data: datasetData,
      }
    ]
  };

  const [chartHeight, setChartHeight] = useState(-1)
  const screenWidth = Dimensions.get("window").width;

  return <View style={{flex: 1}} onLayout={(event) => {
    const layout = event.nativeEvent.layout;
    setChartHeight(layout.height)
  }}>
    {chartHeight > 0 && <BarChart
        // style={graphStyle}
        data={data}
        width={screenWidth}
        height={chartHeight}
        yAxisSuffix={'次'}
        fromZero={true}
        formatXLabel={(xValue) => {
          console.log('----')
        }}
        formatYLabel={(numStr) => {
          console.log('++++++')
          console.log(numStr)
          if(numStr == parseInt(numStr)){
            const dotIndex = numStr.search(/\./);
            return numStr.slice(0, dotIndex)
          }else{
            return numStr
          }
        }}
        // yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#000000',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          style: {
            borderRadius: 16
          },
          decimalPlaces: 0,
        }}
    />}
  </View>

  // return <View>
  //   {stastics.map((item, index) => {
  //     return <Text>{[String(index), item.name, ':', item.num].join(' ')}</Text>
  //   })}
  // </View>
}