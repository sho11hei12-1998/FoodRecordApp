import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ContactScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white"
          leftComponent={
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('profile'); }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <FeatherIcon name="chevron-left" size={30} />
                  <Text style={{ marginTop: 8 }}>{'設定'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{
            margin: 10, fontWeight: 'bold', fontSize: 20,
          }}>{'お問い合わせ・不具合報告・ご要望について'}</Text>

          <Text style={{ marginTop: 30 }}>{'本アプリをお使い頂き誠に有難うございます。'}</Text>
          <Text style={{ margin: 10 }}>{'お問い合わせ・不具合報告・ご要望、また改善案などありましたらTwitterのDMまでお願いします。'}</Text>

          <Text>{'@shohei_saginao'}</Text>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(ContactScreen);
