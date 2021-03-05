import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, Dimensions,
  ActivityIndicator, TouchableOpacity, AsyncStorage,
} from 'react-native'
import { Header, Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SortIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BellIcon from 'react-native-vector-icons/EvilIcons';
import { Searchbar } from 'react-native-paper';


import * as actions from '../actions';
import { connect } from 'react-redux';
import { review_sort_type } from '../actions';
import { PagesSharp, Sort } from '@material-ui/icons';

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
    name: "店舗名ごと",
  },
  {
    id: 4,
    name: "# タグごと",
  }
];

const contactModal = ["お問い合わせ"];


const date_arr = [];
const tag_arr = [];
const shopName_arr = [];


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // モーダル表示
      isModalVisible: false,

      // Displayバージョン
      displayNum: 0,

      text: 'こんにちわ',
      search: '',

    };
  }

  componentDidMount = () => {
    this.props.fetchAllReviews(); // Action creatorを呼ぶ

    // console.log(this.props.allReviews);


    this.setState({ text: this.props.sort_type });

  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  // Headerボタンのモーダル
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }


  // 投稿の並び替え
  sortList = (num) => {
    // 日付順に並び替え(古いものから)
    if (num === 1) {
      this.props.reviewSortType('down_sort');
    }

    // 日付順に並び替え(新しいものから)
    if (num === 2) {
      this.props.reviewSortType('up_sort');
    }

    // 店舗名の五十音順に並び替え
    else if (num === 3) {
      this.props.reviewSortType('shopName_sort');
    }

    // タグごとに並び替え
    else if (num === 4) {
      this.props.reviewSortType('tag_sort');
    }

    // ここでAction creatorを呼んでHomeScreenを再描画させる
    this.props.fetchAllReviews();

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
          <ListItem
            bottomDivider
            onPress={() => this.toggleModal()}
          >
            <ListItem.Content
              style={{ alignItems: 'center' }}
            >
              <ListItem.Title>{"キャンセル"}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </Modal>
    );
  }

  // 日付順に写真を描画
  renderDateImagePicker() {
    const Review = this.props.allReviews;

    // allReviewから指定した日付を持つオブジェクトを取得し、配列として返す関数
    const searchObj_arr = (date) => {
      const res = Review.filter(review => review.date.split('月')[0] + '月' === date);
      return res;
    }

    return (
      <View>
        {date_arr.map((date, i) => {
          return (
            <View key={'dateTitle' + i}>
              <View style={styles.title_container}>
                <Text
                  style={{ color: 'black' }}
                >
                  {'○ ' + date}
                </Text>
              </View>

              {/* 日付ごとに画像を描画 */}
              <View style={styles.image_container}>
                {searchObj_arr(date).map((review, i) => {
                  return (
                    <TouchableOpacity
                      key={'displayImg' + i}
                      onPress={() => this.onListItemPress(review)}
                    >
                      <Image
                        style={
                          styles.picImg
                        }
                        source={review.imageURIs[0]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })
        }
      </View>
    );
  }


  // タグごとに写真を描画
  renderTagImagePicker() {
    const Review = this.props.allReviews;

    // allReviewから指定したtagを持つオブジェクトを取得し、配列として返す関数
    const searchObj_arr = (tag) => {
      const res = Review.filter(review => review.tag.indexOf(tag) != -1);
      return res;
    }
    return (
      <View>
        {tag_arr.map((tag, i) => {
          return (
            <View key={'tagTitle' + i}>
              <View style={styles.title_container}>
                <Text
                  style={{ color: 'black' }}
                >
                  {'# ' + tag}
                </Text>
              </View>
              {/* # タグごとに画像を描画 */}
              <View style={styles.image_container}>
                {searchObj_arr(tag).map((review, i) => {
                  return (
                    <TouchableOpacity
                      key={'displayImg' + i}
                      onPress={() => this.onListItemPress(review)}
                    >
                      <Image
                        style={
                          styles.picImg
                        }
                        source={review.imageURIs[0]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  // 店舗名を五十音順で表示
  renderShopNameImagePicker() {
    const Review = this.props.allReviews;

    // allReviewから指定したshopNameを持つオブジェクトを取得し、配列として返す関数
    const searchObj_arr = (name) => {
      const res = Review.filter(review => review.shopName === name);
      return res;
    }

    return (
      <View>
        {shopName_arr.map((name, i) => {
          return (
            <View key={'nameTitle' + i}>
              <View style={styles.title_container}>
                <Text
                  style={{ color: 'black' }}
                >
                  {'# ' + name}
                </Text>
              </View>
              {/* # shopNameごとに画像を描画 */}
              <View style={styles.image_container}>
                {searchObj_arr(name).map((review, i) => {
                  return (
                    <TouchableOpacity
                      key={'displayImg' + i}
                      onPress={() => this.onListItemPress(review)}
                    >
                      <Image
                        style={
                          styles.picImg
                        }
                        source={review.imageURIs[0]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  // sort_typeを判別し、写真を指定の並び方にする
  renderImagePicker = () => {
    const Review = this.props.allReviews;
    const Type = this.props.sort_type;
    const result = tag_arr.find(item => item === this.state.search);

    // allReviewから指定したtagを持つオブジェクトを取得し、配列として返す関数
    const searchObj_arr = (tag) => {
      const res = Review.filter(review => review.tag.indexOf(tag) != -1);
      return res;
    }

    // Searchbarの値に該当する場合
    if (result != undefined) {
      return (
        <View>
          <View style={styles.title_container}>
            <Text
              style={{ color: 'black' }}
            >
              {'# ' + result}
            </Text>
          </View>

          {/* # タグごとに画像を描画 */}
          <View style={styles.image_container}>
            {searchObj_arr(result).map((review, i) => {
              return (
                <TouchableOpacity
                  key={'searchTagImg' + i}
                  onPress={() => this.onListItemPress(review)}
                >
                  <Image
                    style={
                      styles.picImg
                    }
                    source={review.imageURIs[0]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }

    // sort_typeにしたがって写真を表示
    else {
      if (Type === 'normal') {
        date_arr.sort(function (a, b) {
          if (a > b) {
            return -1;
          }
          else {
            return 1;
          }
        });
        return this.renderDateImagePicker();
      }
      else if (Type === 'down_sort') {
        date_arr.sort(function (a, b) {
          if (a < b) {
            return -1;
          }
          else {
            return 1;
          }
        });
        return this.renderDateImagePicker();
      }
      else if (Type === 'up_sort') {
        date_arr.sort(function (a, b) {
          if (a > b) {
            return -1;
          }
          else {
            return 1;
          }
        });
        return this.renderDateImagePicker();
      }
      else if (Type === 'tag_sort') {
        tag_arr.sort(function (a, b) {
          return a.localeCompare(b, 'ja');
        });
        return this.renderTagImagePicker();
      }
      else if (Type === 'shopName_sort') {
        shopName_arr.sort(function (a, b) {
          return a.localeCompare(b, 'ja');
        });
        return this.renderShopNameImagePicker();
      }
    }
  }


  render() {
    // 日付リスト作成、tagの一覧List作成
    const dateItem = [];
    const tagItem = [];
    const shopItem = [];

    this.props.allReviews.map((item) => {
      dateItem.push(item.date.split('月')[0] + "月");
      // dateItem.push(item.date);
      shopItem.push(item.shopName);

      for (var i = 0; i < item.tag.length; i++) {
        tagItem.push(item.tag[i]);
      }
    })
    date_arr.splice(0);
    date_arr.push(...new Set(dateItem));

    tag_arr.splice(0);
    tag_arr.push(...new Set(tagItem));

    shopName_arr.splice(0);
    shopName_arr.push(...new Set(shopItem));


    console.log(date_arr);
    console.log(this.props.sort_type);
    // console.log(this.props.allReviews);




    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white" // ヘッダーの色
          placement="left"
          leftComponent={{ text: 'FooDiary', style: styles.headerStyle }} // ヘッダータイトル

          rightComponent={<View style={styles.modalIcon_container}>
            {/* 検索Modal */}
            {/* <View style={styles.modalIcon}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('search')}
              >
                <FeatherIcon name="search" size={25} />
              </TouchableOpacity>
            </View> */}

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
                <BellIcon name="bell" size={33} />
              </TouchableOpacity>
              {/* {this.renderModal(contactModal)} */}
            </View>
          </View>}
        />
        <Searchbar
          placeholder="# タグ検索..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          style={{ margin: 10 }}
          returnKeyType='search'
        />


        <ScrollView>
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
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  title_container: {
    marginTop: 30,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  image_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  picImg: {
    width: Pic_WIDTH,
    height: Pic_WIDTH,
    borderRadius: 10,
    margin: 6
  }
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews,
    sort_type: state.review.sort_type,
  };
};

export default connect(foodStateToProps, actions)(HomeScreen)