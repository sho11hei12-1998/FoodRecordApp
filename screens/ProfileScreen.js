import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'
import Modal from 'react-native-modal';


import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const user_infoLists = [
  {
    id: 0,
    name: "アプリ初期化",
    nav: 'reset'
  },
];

// その他リスト
const etcLists = [
  {
    id: 0,
    name: "友達にこのアプリを教える",
    nav: ''
  },
  {
    id: 1,
    name: "お問い合わせ・不具合報告・ご要望",
    nav: 'policy',
  },
];


class ProfileScreen extends React.Component {



  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
        <Header
          backgroundColor="#F0F0F0"
        // centerComponent={{ text: 'マイページ', style: styles.headerStyle }} // ヘッダータイトル
        />
        <ScrollView>
          <Card>
            <ListItem>
              <Image
                style={{ height: 25, width: 25, marginHorizontal: 10 }}
                source={require('../assets/profile.png')}
              />
              <ListItem.Content>
                <ListItem.Title>{'User Name'}</ListItem.Title>
                <ListItem.Subtitle>{'投稿数：' + this.props.allReviews.length}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </Card>

          {/* 会員登録情報 */}
          <View style={styles.list_container}>
            <Text style={styles.titleText}>{'アプリの初期化'}</Text>
            {user_infoLists.map((item, idx) => {
              return (
                <ListItem
                  key={idx}
                  onPress={() => this.props.navigation.navigate(item.nav)}
                  bottomDivider
                >
                  <ListItem.Content style={styles.list_item}>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            })}
          </View>

          {/* プライバシーポリシー */}
          <View style={styles.list_container}>
            <Text style={styles.titleText}>{'プライバシーポリシー'}</Text>
            <ListItem
              onPress={() => this.props.navigation.navigate('policy')}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{'プライバシーポリシー'}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>

          {/* その他 */}
          <View style={styles.list_container}>
            <Text style={styles.titleText}>{'その他'}</Text>
            {etcLists.map((item, idx) => {
              return (
                <ListItem
                  key={idx}
                  onPress={() => this.props.navigation.navigate(item.nav)}
                  bottomDivider
                >
                  <ListItem.Content style={styles.list_item}>
                    <ListItem.Title>{item.name}</ListItem.Title>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              );
            })}
          </View>
          <ListItem
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title>{'バージョン情報'}</ListItem.Title>
              <ListItem.Subtitle>{'1.0.0'}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slideStyle: {
    width: SCREEN_WIDTH,
  },
  headerStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  list_container: {
    marginTop: 10
  },
  titleText: {
    margin: 15
  },
  list_item: {
    paddingLeft: 0
  }
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(ProfileScreen);
