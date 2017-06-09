import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Image, 
  FlatList, 
  TouchableHighlight, 
  StatusBar 
} from 'react-native';
import {styles} from '../style/';
import {getPhotos, addPhotos, select, setOffset, setDim} from '../../redux/dispatchers/';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listKey: Math.random(),
      detail: [{data: this.props.photos.selected, key: 1}],
      pageRequest: this.props.photos.loadedPage,
    }
  }
//METHODS////////---------
  rotate = layout =>{
    console.log(this.state.pageRequest , this.props.photos.loadedPage)
    this.props.setDim(layout); 
    this.setState({ listKey: Math.random()})
    this.props.setOffset(this.listRef._listRef._scrollMetrics.offset * this.props.layout.columns)
  }

  toDetail = item =>{
    this.props.setOffset(this.listRef._listRef._scrollMetrics.offset * this.props.layout.columns)
    this.setState({detail: [{data: item, key: 1}]})
    this.props.select(item)
  }
  
  submit = text =>{
    this.props.getPhotos(text); 
    this.setState({pageRequest: 1})
    this.props.setOffset(0); 
    this.listRef.scrollToOffset(0);

  }

  scrollTo = () =>{
    if(this.props.photos.scrollOffset){
      this.listRef.scrollToOffset(
        {animated: true, offset: this.props.photos.scrollOffset / this.props.layout.columns}
      )
    }
  }
  _listRef = ref => { this.listRef = ref; }

  _keyExtractor = item => item.id
  
  _onEndReached = () => {
    console.log(this.state.pageRequest , this.props.photos.loadedPage)
    if(this.state.pageRequest == this.props.photos.loadedPage){
      this.setState({pageRequest: 1+this.props.photos.loadedPage})
      this.props.addPhotos(this.props.photos.searchPhrase, 1+this.props.photos.loadedPage)
    }
  }
//LIST ITEMS////////---------

  _renderListItem = ({item}) => (
    <TouchableHighlight onPress={() => this.toDetail(item)}>
      <Image
        source={{uri: item.webformatURL}} 
        style={{width: this.props.layout.width / this.props.layout.columns, 
                height: this.props.layout.width / this.props.layout.columns *
                        (item.webformatHeight / item.webformatWidth)
              }}
      />
    </TouchableHighlight>
  )
  
  _renderDetail = ({item}) => {
    let width = this.props.layout.width
    let height = this.props.layout.height
    let w = item.data.webformatWidth
    let h = item.data.webformatHeight
    return (
      <View style={styles.container} >
        <Text style={styles.welcome} >
          {"User: " + item.data.user +
          ", Tags: "+ item.data.tags +
          ", Size: "+ item.data.webformatWidth+"x"+item.data.webformatHeight}
        </Text>
        <TouchableHighlight onPress={() => this.props.select(null)} >
          <Image
            style={w*height > h*width ? {width: width, height: width*h/w}
                                      : {width: height*w/h, height: height}}
            source={{uri: item.data.webformatURL}} 
          />
        </TouchableHighlight>
      </View>
    )
  }
// RENDER////////////-----------

  render() {
    if(this.props.photos.selected == null){
      return (          //LIST VIEW///////////--------------
        <View 
          style={styles.container} 
          onLayout={e => this.rotate(e.nativeEvent.layout)} >
          <StatusBar hidden />
          {this.props.layout.orientation == 'portrait' &&
            <Image
              style={{width: 200, height: 85}}
              source={{uri: 'https://www.wpclipart.com/education/encouraging_words/Awesome.png'}}
            />}
          <View style={styles.collapse} >
            <Text style={styles.welcome} >
              Tell me what to search for
            </Text>
            <TextInput
              style={styles.txtIn}
              onSubmitEditing={ e => this.submit(e.nativeEvent.text)}
            />
          </View>
          <FlatList
            onLayout={this.scrollTo}
            data={this.props.photos.list}
            key={this.state.listKey}
            ref={this._listRef}
            keyExtractor={this._keyExtractor}
            numColumns={this.props.layout.columns}
            onEndReached={this._onEndReached}
            renderItem={this._renderListItem}
          />
        </View>
      )
    }else{        //DETAIL VIEW///////////--------------
      return(
        <View style={styles.container} onLayout={e => this.props.setDim(e.nativeEvent.layout)} >
          <StatusBar hidden />
          <FlatList
            data={this.state.detail}
            extraData={this.props.layout.width}
            renderItem={this._renderDetail}
          />
        </View>
      )
    }
  }


}

export default connect(st=>st, {getPhotos, addPhotos, select, setOffset, setDim})(App);


//            ref={ref => { this.listRef = ref; }}



// optimizations //
//initialScrollIndex in 0.45
//event.nativeEvent.layout instead of dimensions
//you can use windowSize to trade off memory usage vs. user experience
//maxToRenderPerBatch to adjust fill rate vs. responsiveness
//onEndReachedThreshold

//Pixabay API format
// {
//     "total": 4692,
//     "totalHits": 500,
//     "hits": [
//         {
//             "id": 195893,
//             "pageURL": "https://pixabay.com/en/blossom-bloom-flower-yellow-close-195893/",
//             "type": "photo",
//             "tags": "blossom, bloom, flower",
//             "previewURL": "https://static.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg"
//             "previewWidth": 150,
//             "previewHeight": 84,
//             "webformatURL": "https://pixabay.com/get/35bbf209db8dc9f2fa36746403097ae226b796b9e13e39d2_640.jpg",
//             "webformatWidth": 640,
//             "webformatHeight": 360,
//             "imageWidth": 4000,
//             "imageHeight": 2250,
//             "imageSize": 4731420,
//             "views": 7671,
//             "downloads": 6439,
//             "favorites": 1,
//             "likes": 5,
//             "comments": 2,
//             "user_id": 48777,
//             "user": "Josch13",
//             "userImageURL": "https://static.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg",
//         },
//         {
//             "id": 14724,
//             ...
//         },
//         ...
//     ]
// }