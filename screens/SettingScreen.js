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


class SettingScreen extends React.Component {





  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

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

export default connect(foodStateToProps, actions)(SettingScreen);
