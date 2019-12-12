import React from 'react';
import { Pagination, ActivityIndicator,Grid,SearchBar, WingBlank, NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
import MercariItemShow from './MercariItemShow';
const $ = require('jquery');

class MercariSearch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      keyword: '',
      page: 1,
      searchResult: {}, 
      enterDetail: false,
      mid: null,
      loading: false,
    }
  }

  componentDidMount = () => {
    window.fuck = this;
  }

  getSearchResult = () => {
    const state = this.state
    console.log('IN getSearchResult, page: ' + state.page)
    this.setState({
      loading: true,
    })
    return new Promise((resolve, _) => {
      $.post('/mercari/search', {keyword: state.keyword, page: state.page}, res => {
        this.setState({
          loading: false,
        })
        resolve(res)
      })
      // $.get(`/mercari/search/keyword/${state.keyword}/page/${state.page}` , res => {
      //   this.setState({
      //     loading: false,
      //   })
      //   resolve(res)
      // })
    })
    // return Promise.resolve([{
    //   img: 'https://static.mercdn.net/thumb/photos/m74425838658_1.jpg?1576034667',
    //   price: 1990,
    // },{
    //   img: 'https://static.mercdn.net/thumb/photos/m15685919811_1.jpg?1576054881',
    //   price: 2000,
    // },{
    //   img: 'https://static.mercdn.net/thumb/photos/m51799415323_1.jpg?1575779985',
    //   price: 3333,
    // },{
    //   img: 'https://static.mercdn.net/thumb/photos/m69063808663_1.jpg?1566655694',
    //   price: 19999,
    // }])
  }

  search = () => {
    return this.getSearchResult().then(result => {
      this.setState({
        searchResult: result,
      })
      window.scrollTo({top: 0});
    })
  }

  render(){
    return (

      <div >
        <div className={this.state.enterDetail ? "invisible" : 'visible'}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.navToHome()}
          >煤炉商品搜索器</NavBar>
          
          <WhiteSpace/>

  
          <WingBlank>
            <SearchBar value={this.state.keyword} onSubmit={() => {this.search()}}  placeholder="请输入搜索关键字" maxLength={30} onChange={(newKeyword) => {
              this.setState({
                keyword: newKeyword,
              })
            }} />
            <WhiteSpace size='lg' />

            <div className={this.state.loading ? 'visible': 'invisible'}><ActivityIndicator animating /><WhiteSpace/></div>

            <Grid data={this.state.searchResult.items} itemStyle={{backgroundColor: '#f5f5f9'}} hasLine={false} columnNum={3} renderItem={data => {
              return (
              <div className="merica-item-box" onClick={() => {
                this.setState({
                  mid: data.mid
                })
                //TODO: 进入商品查看
                this.setState({
                  enterDetail: true
                })
                window.theItem = data
              }}>
                <div className="merica-item-box-img">
                  <img style={{width: '100%', height: '100%'}} src={data.src}></img>
                </div>
                <div className="merica-item-box-price">
                  {data.sold ? '卖掉了' : data.price + '円'}
                </div>
              </div>
              )
            }} ></Grid>

            <WhiteSpace />

            {(() => {
              if(this.state.searchResult.currentPage != null){
                if(this.state.searchResult.hasNextPage){
                  return (
                    <Pagination simple total={parseInt(this.state.searchResult.currentPage) + 1} current={parseInt(this.state.searchResult.currentPage)} onChange={(newPage) => {
                      console.log(newPage)
                      this.setState({
                        page: newPage
                      }, () => {
                        this.search()
                      })
                    }}  />
                  )
                }else{
                  return (
                    <Pagination simple total={parseInt(this.state.searchResult.currentPage)} current={parseInt(this.state.searchResult.currentPage)} onChange={(newPage) => {
                      this.setState({
                        page: newPage
                      }, () => {
                        this.search()
                      })
                    }} />
                  )
                }
              }
            })()}

          </WingBlank>
        </div>

        {this.state.enterDetail ? 
          (<MercariItemShow itemId={this.state.mid} navToHome={() => {
            this.setState({
              enterDetail: false
            })
          }} />) : <div />
        }

        <WhiteSpace />

        


      </div>
    )
  }
}

export default MercariSearch;