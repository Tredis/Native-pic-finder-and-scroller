
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList} from 'react-native';
import {styles} from '../style/'
import {getPhotos} from '../../redux/dispatchers/'
import {connect} from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props.photos)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tell me what to search for
        </Text>
        <TextInput
          style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
          onSubmitEditing={ e => this.props.getPhotos(e.nativeEvent.text)}
        />
        <FlatList
          data={this.props.photos.list}
          renderItem={(photo) => (
            <Image
              style={{width: 200, height: 200}}
              source={{uri: photo.item.webformatURL}} 
            />
          )}
        />
      </View>
    );
  }
  
}

export default connect(st=>st, {getPhotos})(App);


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