import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableHighlight } from 'react-native';
import {styles} from '../style/'
import {getPhotos, addPhotos, select} from '../../redux/dispatchers/'
import {connect} from 'react-redux';
import Dimensions from 'Dimensions'

class App extends Component {

  collapseLogo(h){
    let {width, height} = Dimensions.get('window')
    this.imgRef.props.style.height = width>height ? 0 : h;
    this.imgRef.forceUpdate()
  }

  render() {
    if(this.props.photos.selected == null){
      return (
        <View style={styles.container}>
          <Image
            ref={ref => { this.imgRef = ref }}
            onLayout={()=>{this.collapseLogo(85)}}
            style={{width: 200, height: 85}}
            source={{uri: 'https://www.wpclipart.com/education/encouraging_words/Awesome.png'}}
          />
          <View style={styles.collapse}>
            <Text style={styles.welcome} >
              Tell me what to search for
            </Text>
            <TextInput
              style={styles.txtIn}
              onSubmitEditing={ e => this.props.getPhotos(e.nativeEvent.text)}
            />
          </View>
          <FlatList
            data={this.props.photos.list}
            keyExtractor={item => item.id}
            ref={ref => { this.listRef = ref; }}
            onEndReached={() => this.props.addPhotos(this.props.photos.searchPhrase, 1+this.props.photos.page)}
            renderItem={({item}) => {
              let width = Dimensions.get('window').width
              return (
                <TouchableHighlight onPress={() => this.props.select(item)}>
                  <Image
                    style={{width: width, height: width * item.webformatHeight / item.webformatWidth}}
                    source={{uri: item.webformatURL}} />
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
                  <Text style={styles.welcome}>
                    {"User: " + item.data.user +
                    ", Tags: "+ item.data.tags +
                    ", Size: "+ item.data.webformatWidth+"x"+item.data.webformatHeight}
                  </Text>
                  <TouchableHighlight onPress={() => this.props.select(null)}>
                    <Image
                      style={{width: (w*height > h*width ? width : height*w/h),
                              height:(w*height > h*width ? width*h/w : height)}}
                      source={{uri: item.data.webformatURL}} />
                  </TouchableHighlight>
                </View>
              )
            }}
          />
        </View>
      )
    }
  }
  componentDidUpdate(){
    if(this.props.photos.scroll && !this.props.photos.selected){
      this.listRef.scrollTop = this.listRef.scrollHeight/2; //  neither of these work
      this.listRef.scrollToOffset({animated: true, offset: 100}) // for some reason
    }
  }
}

export default connect(st=>st, {getPhotos, addPhotos, select})(App);

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