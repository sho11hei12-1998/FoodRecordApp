import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, Dimensions,
  ActivityIndicator, TouchableOpacity, AsyncStorage,
} from 'react-native'
import { Header, Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SortIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { review_sort_type } from '../actions';
import { Sort } from '@material-ui/icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Pic_WIDTH = SCREEN_WIDTH / 3.3;

const searchModal = ["検索"];

// 並び替えModalリスト
const modalLists = [
  {
    id: 0,
    name: "並び替え",
  },
  {
    id: 1,
    name: "日付順（古いものから）",
  },
  {
    id: 2,
    name: "日付順（新しいものから）",
  },
  {
    id: 3,
    name: "店舗名の五十音順",
  },
  {
    id: 4,
    name: "#タグごと",
  }
];

const contactModal = ["お問い合わせ"];

const tagList = [];




class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // モーダル表示
      isModalVisible: false,

      // Displayバージョン
      displayNum: 0,

      text: 'こんにちわ',

    };
  }

  componentDidMount = () => {
    this.props.fetchAllReviews(); // Action creatorを呼ぶ

    console.log(this.props.allReviews);

  }

  // Headerボタンのモーダル
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }


  // 投稿の並び替え
  sortList = async (num) => {
    const Review = this.props.allReviews;

    // 日付順に並び替え(古いものから)
    if (num === 1) {
      Review.sort(function (a, b) {
        if (a.date < b.date) {
          return -1;
        }
        else {
          return 1;
        }
      });
      const SortType = '日付順';
    }

    // 日付順に並び替え(新しいものから)
    if (num === 2) {
      Review.sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        }
        else {
          return 1;
        }
      });
      const SortType = '日付順';
    }

    // 店舗名の五十音順に並び替え
    else if (num === 3) {
      Review.sort(function (a, b) {
        return a.shopName.localeCompare(b.shopName, 'ja');
      });
      const SortType = '五十音順';
    }



    // sort後にallReviewsを上書き
    try {
      // 一度トライする
      await AsyncStorage.setItem('allReviews', JSON.stringify(Review));

      // await AsyncStorage.setItem('sort_type', JSON.stringify(SortType));
    } catch (e) {
      // もし何かエラーがあったら表示する
      console.warn(e);
    }

    // console.log(this.props.review_sort_type);

    // モーダルを閉じる
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }



  // 並び替えモーダル描画
  renderModal(lists) {
    return (
      <Modal style={{ justifyContent: 'flex-end' }} isVisible={this.state.isModalVisible}>
        <View style={styles.modal}>
          {lists.map((item, idx) => {
            return (
              <ListItem
                key={idx}
                bottomDivider
                onPress={() => this.sortList(item.id)}
              >
                <ListItem.Content
                  style={{ alignItems: 'center' }}
                >
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </View>
        <View style={styles.cancel_modal}>
          <Button title="キャンセル" color='white' onPress={() => this.toggleModal()} />
        </View>
      </Modal>
    );
  }

  // async renderSortType() {
  //   let stringifiedreview_sort_type = await AsyncStorage.getItem('sort_type');

  //   // 取り出した評価データをJavaScript用に変換
  //   let review_sort_type = JSON.parse(stringifiedreview_sort_type);

  //   return (review_sort_type);
  // }




  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() {
    // tagの一覧List作成
    const tagItem = [];

    // タイトル描画
    const renderImgTitle = () => {
      this.props.allReviews.map((item) => {
        for (var i = 0; i < item.tag.length; i++) {
          tagItem.push(item.tag[i]);
        }
      })
      const tag_arr = [...new Set(tagItem)];
      console.log(tag_arr);


      return (
        <Text
          style={{ marginTop: 30, marginLeft: 30 }}
        >
          {'# ' + tag_arr[0]}
        </Text>
      );
    }

    return (
      <View>
        <View>
          {renderImgTitle()}
        </View>
        <View style={styles.image_container}>
          {this.props.allReviews.map((review, i) => {
            return (
              <TouchableOpacity
                key={'displayImg' + i}
                onPress={() => this.onListItemPress(review)}
              >
                <Image
                  style={{
                    width: Pic_WIDTH,
                    height: Pic_WIDTH,
                    borderRadius: 10,
                    margin: 6
                  }}
                  source={review.imageURIs[0]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );

  }


  render() {


    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white" // ヘッダーの色
          placement="left"
          leftComponent={{ text: 'FooDiary', style: styles.headerStyle }} // ヘッダータイトル

          rightComponent={<View style={styles.modalIcon_container}>
            {/* 検索Modal */}
            <View style={styles.modalIcon}>
              <TouchableOpacity
              // onPress={() => this.toggleModal()}
              >
                <FeatherIcon name="search" size={25} />
              </TouchableOpacity>
              {/* {this.renderModal(searchModal)} */}
            </View>

            {/* 並び替えModal */}
            <View style={styles.modalIcon}>
              <TouchableOpacity
                onPress={() => this.toggleModal()}
              >
                <SortIcon name="sort-variant" size={25} />
              </TouchableOpacity>
              {this.renderModal(modalLists)}
            </View>

            {/* お問い合わせModal */}
            <View style={styles.modalIcon}>
              <TouchableOpacity
              // onPress={() => this.toggleModal()}
              >
                <FeatherIcon name="more-vertical" size={25} />
              </TouchableOpacity>
              {/* {this.renderModal(contactModal)} */}
            </View>
          </View>}
        />

        <ScrollView>

          {/* <Button
            style={{ marginTop: 30, marginLeft: 30 }}
          >
            {this.renderSortType()}
          </Button> */}

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
  headerStyle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  },
  modalIcon_container: {
    flexDirection: 'row',
    marginRight: 10,
  },
  modalIcon: {
    marginHorizontal: 10
  },
  modal: {
    justifyContent: 'center',
    // height: 180,
    height: 225,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cancel_modal: {
    justifyContent: 'center',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  image_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30
  },
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews,
    review_sort_type: state.review.review_sort_type,
  };
};

export default connect(foodStateToProps, actions)(HomeScreen)