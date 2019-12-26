import React from 'react';
import { Toast, Flex } from 'antd-mobile';

class BottomPriceShow extends React.Component{
  constructor(props){
    super(props)
    this.state = { }
  }

  render(){
    return (
      <div className="footer maroon bold-font">
        <div className="width-80-percent"  >
          <Flex className="height-100-per" justify="center" align="center" onClick={() => {
            Toast.info('该金额不包括代购费和国际运费哦!详情请咨询客服')
          }}>估算金额: {this.props.price} 元 </Flex>
        </div>

        <div className="width-20-percent red"  >
          <Flex className="height-100-per" justify="center" align="center" onClick={() => {
            Toast.info('目前只支持人工代购哦，请复制商品id并咨询客服')
          }}> 购买 </Flex>
        </div>
      </div>
    )
  }
}

export default BottomPriceShow;