import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableHighlight } from 'react-native';
import {styles} from '../style/'
import {getPhotos, addPhotos, select, setOffset} from '../../redux/dispatchers/'
import {connect} from 'react-redux';
import Dimensions from 'Dimensions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listKey: Math.random(),
    }
  }

  rotate(){
    this.setState({ listKey: Math.random() })
    this.imgRef.forceUpdate()
    if(this.listRef._listRef._scrollMetrics.offset){
      this.props.setOffset(this.orientatationToggle(
                              this.listRef._listRef._scrollMetrics.offset * 2, 
                              this.listRef._listRef._scrollMetrics.offset)
                          )
    }
  }
  setScrollOffset(){
    if(this.listRef){
      this.props.setOffset(this.orientatationToggle(
                              this.listRef._listRef._scrollMetrics.offset, 
                              this.listRef._listRef._scrollMetrics.offset * 2)
                          )
    }
  }
  orientatationToggle(portrait, landscape){
    let {width, height} = Dimensions.get('window')
    return width < height ? portrait : landscape
  }

  toDetail(item){
    this.props.select(item)
    this.setScrollOffset()
  }
  
  scrollTo(){
    if(this.props.photos.scrollOffset){
      this.listRef.scrollToOffset(
        {animated: true, offset: this.orientatationToggle(this.props.photos.scrollOffset, 
                                                          this.props.photos.scrollOffset / 2)
        }
      )
    }
  }
  submit(text){
    this.props.getPhotos(text); 
    this.props.setOffset(0); 
    this.listRef.scrollToOffset(0);
  }


  render() {
    if(this.props.photos.selected == null){
      return (
        <View style={styles.container}>
          <Image
            ref={ref => { this.imgRef = ref }}
            onLayout={()=>this.rotate()}
            style={{width: 200, height: this.orientatationToggle(85, 0)}}
            source={{uri: 'https://www.wpclipart.com/education/encouraging_words/Awesome.png'}}
          />
          <View style={styles.collapse} >
            <Text style={styles.welcome} >
              Tell me what to search for
            </Text>
            <TextInput
              style={styles.txtIn}
              onFocus={()=>this.setScrollOffset()}
              onSubmitEditing={ e => this.submit(e.nativeEvent.text)}
            />
          </View>
          <FlatList
            data={this.props.photos.list}
            key={this.state.listKey}
            keyExtractor={item => item.id}
            ref={ref => { this.listRef = ref; }}
            onLayout={()=>this.scrollTo()}
            numColumns={this.orientatationToggle(1, 2)}
            onEndReached={() => this.props.addPhotos(this.props.photos.searchPhrase, 
                                                    1+this.props.photos.page)}
            renderItem={({item}) => {
              let {width, height} = Dimensions.get('window')
              return (
                <TouchableHighlight onPress={() => this.toDetail(item)}>
                  <Image
                    source={{uri: item.webformatURL}} 
                    style={{width: width / (width<height ? 1:2), 
                            height: width * item.webformatHeight / item.webformatWidth / (width<height ? 1:2)
                          }}
                  />
                </TouchableHighlight>
              )
            }}
          />
        </View>
      )
    }else{
      return(
        <View style={styles.container}>
          <FlatList
            data={[{data: this.props.photos.selected, key: 1}]}
            renderItem={({item}) => {
              let {width, height} = Dimensions.get('window')
              let w = item.data.webformatWidth
              let h = item.data.webformatHeight
              return (
                <View
                  style={styles.container}
                  onLayout={()=>this.forceUpdate()}
                >
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
            }}
          />
        </View>
      )
    }
  }


}


export default connect(st=>st, {getPhotos, addPhotos, select, setOffset})(App);

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