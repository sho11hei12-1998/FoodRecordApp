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
    name: "会員登録情報",
    nav: ''
  },
  {
    id: 1,
    name: "ログアウト",
    nav: ''
  },
  {
    id: 2,
    name: "アプリ初期化",
    nav: 'setting'
  },
  {
    id: 3,
    name: "プッシュ通知設定",
    nav: ''
  }
];

// その他リスト
const etcLists = [
  {
    id: 0,
    name: "アプリの機能に関するご意見・ご要望",
  },
  {
    id: 1,
    name: "FooDiary サービス利用規約",
  },
  {
    id: 2,
    name: "プライバシーポリシー",
  },
  {
    id: 3,
    name: "バージョン情報",
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
            <Text style={styles.titleText}>{'会員登録情報'}</Text>
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

          {/* ヘルプ */}
          <View style={styles.list_container}>
            <Text style={styles.titleText}>{'ヘルプ'}</Text>
            <ListItem
              onPress={() => this.props.navigation.navigate('')}
              bottomDivider
            >
              <ListItem.Content style={styles.list_item}>
                <ListItem.Title>{"よくあるお問い合わせ"}</ListItem.Title>
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
                  onPress={() => this.props.navigation.navigate('')}
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
