import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import Modal from 'react-native-modal';


import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;


class ProfileScreen extends React.Component {

  onResetButtonPress = async (key) => {
    // 'key'に対応するAsyncStorageの中身をリセット(非同期処理)
    await AsyncStorage.removeItem(key);

    Alert.alert(
      'Reset',
      `'${key}' in AsyncStorage has been removed.`,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    );
    // ここでAction creatorを呼んでHomeScreenを再描画させる
    this.props.fetchAllReviews();
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

        <View style={{ padding: 20 }}>
          <Button
            title="Reset welcome page"
            onPress={() => this.onResetButtonPress('isInitialized')}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Button
            title="Reset all review data"
            onPress={() => this.onResetButtonPress('allReviews')}
          />
        </View>

        <View>
          <ListItem
            // onPress={showDatePicker}
            bottomDivider
          >
            <ListItem.Content style={{ alignItems: 'left' }}>
              <ListItem.Title>{"プライバシーポリシー"}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </View>
      </View>
    );
  }
}

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(ProfileScreen);
