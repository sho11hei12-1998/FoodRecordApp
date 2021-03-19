import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert, Share,
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


class ProfileScreen extends React.Component {

  // シェアボタン
  openShare() {
    Share.share({
      title: 'タイトル',
      message: '概要'
    }, {}).then((result, activityType) => {
      if (result.action == Share.dismissedAction) {
        // シェアを中断した場合の処理(iOSのみ)
      } else if (result.action == Share.sharedAction) {
        // シェアを実行した場合(Androidの場合は常にここの処理が実行される)
      } else {

      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#F0F0F0' }}>
        <Header
          backgroundColor="#F0F0F0"
        // centerComponent={{ text: 'マイページ', style: styles.headerStyle }} // ヘッダータイトル
        />
        <ScrollView>
          <Card>
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              padding: 10
            }}>
              <Icon
                name='utensils'
                type='font-awesome-5'
                size={25}
                color='gray'
                style={{ marginRight: 15 }}
              />
              <Text style={{ fontSize: 18 }}>{'現在の登録数：' + this.props.allReviews.length}</Text>
            </View>
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
            <ListItem
              onPress={() => this.openShare()}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{'友達にこのアプリを教える'}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
          <View>
            <ListItem
              onPress={() => this.props.navigation.navigate('contact')}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{'お問い合わせ・不具合報告・ご要望'}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
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
