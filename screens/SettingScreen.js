import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';


import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;


class SettingScreen extends React.Component {

  onResetButtonPress = (key) => {
    Alert.alert(
      "最終確認",
      "アプリを初期化します。",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            console.log("OK Pressed")
            // 'key'に対応するAsyncStorageの中身をリセット(非同期処理)
            await AsyncStorage.removeItem(key);

            //**Firebase Analytics**
            // if (Constants.manifest.releaseChannel != "production") {
            Analytics.setDebugModeEnabled(true);
            // }
            await Analytics.logEvent('ResetButtonTapped', {
              name: 'reset_' + key,
              screen: 'setting',
              purpose: 'Opens the internal settings',
            });

            // ここでAction creatorを呼んでHomeScreenを再描画させる
            this.props.fetchAllReviews();
            this.props.navigation.navigate('home');
          }
        }
      ],
      { cancelable: false }
    );
  }



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
                  <Text style={{ marginTop: 8 }}>{'マイページ'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <View>
          <View style={{ padding: 20 }}>
            <Text style={{ margin: 10 }}>{'チュートリアルを初期化'}</Text>
            <Button
              title="Reset welcome page"
              onPress={() => this.onResetButtonPress('isInitialized')}
            />
          </View>

          <View style={{ padding: 20 }}>
            <Text style={{ margin: 10 }}>{'アプリ内データを全て消去'}</Text>
            <Button
              title="Reset all review data"
              onPress={() => this.onResetButtonPress('allReviews')}
            />
          </View>
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

export default connect(foodStateToProps, actions)(SettingScreen);
