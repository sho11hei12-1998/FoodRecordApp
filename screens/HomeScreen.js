import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'

import * as actions from '../actions';

import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Pic_WIDTH = SCREEN_WIDTH / 3;


class HomeScreen extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchAllReviews(); // Action creatorを呼ぶ
  }

  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }
  
  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() { 
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap',  marginTop: 30}}>
        {this.props.allReviews.map((review, index) => {
          return (
            <TouchableOpacity // 画像をタッチ可能にする(onPress効果を付与する)
              key={index}
              onPress={() => this.onListItemPress(review)}
            >
              <Image 
                style={{
                  width: Pic_WIDTH,
                  height: Pic_WIDTH
                }}
                source={review.imageURIs[0]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );s
  }
  

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <Card>
          <ListItem>
            <Image
              style={{ height: 25, width: 25 }}
              source={require('../assets/profile.png')}
            />
            <ListItem.Content>
              <ListItem.Title>{'Shohei Saginao'}</ListItem.Title>
              <ListItem.Subtitle>{'投稿数：' + this.props.allReviews.length}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
           
        <ScrollView
          // pagingEnabled
        >
          {this.renderImagePicker()}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  slideStyle: {
    width: SCREEN_WIDTH,
  },
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(HomeScreen)