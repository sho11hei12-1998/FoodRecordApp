import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux'; 
import * as actions from '../actions'; 

const SCREEN_WIDTH = Dimensions.get('window').width;

class DetailScreen extends React.Component {

  renderImages() {
    // 画像が添付されていない場合の代替画像の保存場所(`uri`)
    const imageArray = [
      { uri: require('../assets/image_placeholder.png') },
      { uri: require('../assets/image_placeholder.png') },
      { uri: require('../assets/image_placeholder.png') },
    ];
  
    // 添付されている画像の数だけ繰り返す
    for (let i = 0; i < this.props.detailReview.imageURIs.length; i++) {
      // 添付画像の保存場所に更新
      imageArray[i].uri = this.props.detailReview.imageURIs[i];
    }
  
    return (
      <View style={{ flexDirection: 'row' }}>
        {imageArray.map((image, index) => {
          return (
            <Image
              style={{
                width: SCREEN_WIDTH * 0.8,
                height: SCREEN_WIDTH * 0.8,
                margin: SCREEN_WIDTH * 0.1,                
              }}
              source={image.uri}
            />
          );
        })}
      </View>
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 30, padding: 5 }}>{this.props.detailReview.shopName}</Text>
            <Text style={{ padding: 5 }}>{this.props.detailReview.date}</Text>
          </View>

          <ScrollView 
            pagingEnabled
            horizontal={true}
          >
            {this.renderImages()}
          </ScrollView>

        </ScrollView>
      </View>
    );
  }
}


const foodStateToProps = (state) => { 
  return {
    detailReview: state.review.detailReview
  };
}; 


export default connect(foodStateToProps, actions)(DetailScreen); 