import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  Button, TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Header, ListItem, Badge, SearchBar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';



import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const modalLists = [
  {
    id: 0,
    name: "削除",
    color: "red"
  },
  {
    id: 1,
    name: "編集",
    color: "black"
  },
  // {
  //   id: 2,
  //   name: "シェア",
  //   color: "black"
  // },
];


class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      editingModal: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  toggleEditingModal = () => {
    this.setState({ editingModal: !this.state.editingModal });
  }


  // modalボタンクリック処理（削除、編集、シェア）
  modalListPress = async (num) => {
    const Review = this.props.allReviews;
    const DetailReview = this.props.detailReview;

    const onClickOK = async () => {
      // 今回の登録情報をスマホ内に上書き保存する
      try {
        // 一度トライする
        await AsyncStorage.setItem('allReviews', JSON.stringify(Review));
      } catch (e) {
        // もし何かエラーがあったら表示する
        console.warn(e);
      }

      // ここでAction creatorを呼んでHomeScreenを再描画させる
      this.props.fetchAllReviews();

      // HomeScreenに遷移する
      this.props.navigation.navigate('home');
    }

    // 削除ボタンクリック処理（num=0の時）
    if (num === 0) {
      Alert.alert(
        "確認",
        "投稿を削除します.",
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed")
              this.toggleModal()
            },
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              console.log("OK Pressed")
              // 配列から任意の要素を削除する
              for (let i = 0; i < Review.length; i++) {
                if (Review[i] === DetailReview) {
                  Review.splice(i, 1);
                }
              }
              // allReviewを上書きし、homeに画面遷移
              onClickOK();
            }
          }
        ],
        { cancelable: false }
      );
    }
    // 編集ボタンクリック処理
    else if (num === 1) {
      this.toggleModal();
      this.props.navigation.navigate('editing');
    }
    else if (num === 2) {
      ;
    }
  }

  // 画像の描画
  renderImages() {
    // 画像が添付されていない場合の代替画像の保存場所(`uri`)
    const imageArray = [];

    // 添付されている画像の数だけ繰り返す
    for (let i = 0; i < this.props.detailReview.imageURIs.length; i++) {
      // 添付画像の保存場所に更新
      imageArray.push({ uri: this.props.detailReview.imageURIs[i] });
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {imageArray.map((image, index) => {
          return (
            <Image
              style={{
                flex: 1,
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                marginBottom: 0,
              }}
              source={image.uri}
              key={'img' + index}
            />
          );
        })}
      </View>
    );
  }

  render() {
    let display = '';
    if (this.props.detailReview.comment === undefined) {
      display = 'none';
    }
    else {
      display = ''
    }

    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white"
          leftComponent={
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('home'); }}>
                <FeatherIcon name="chevron-left" size={30} />
              </TouchableOpacity>
            </View>
          }
          centerComponent={{ text: '投稿', style: styles.headerStyle }}
          rightComponent={
            <View style={styles.modal_icon}>
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <FeatherIcon name="more-horizontal" size={30} />
              </TouchableOpacity>

              {/* モーダル描画 */}
              <Modal style={{ justifyContent: 'flex-end' }} isVisible={this.state.isModalVisible}>
                <View style={styles.modal}>
                  {modalLists.map((item, idx) => {
                    return (
                      <ListItem key={'modal' + idx} bottomDivider
                        onPress={() => this.modalListPress(idx)}
                      >
                        <ListItem.Content style={{ alignItems: 'center' }}>
                          <ListItem.Title style={{ color: item.color }}>{item.name}</ListItem.Title>
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

            </View>
          }
        />
        <ScrollView>


          {/* 写真の描画 */}
          <ScrollView pagingEnabled horizontal={true}>
            {this.renderImages()}
          </ScrollView>

          {/* 店舗名Container */}
          <View style={styles.shopName_container}>
            <Text style={{ fontSize: 35 }}>{this.props.detailReview.shopName}</Text>
          </View>

          {/* 投稿日付 */}
          <View style={{ margin: 20, flexDirection: 'row' }}>
            <Icon
              name='calendar-alt'
              type='font-awesome-5'
              color='gray'
              size={15}
              style={{ marginRight: 8 }}
            />
            <Text>{this.props.detailReview.date}</Text>
          </View>

          {/* タグ表示 */}
          <View style={styles.tag_container}>
            {this.props.detailReview.tag.map((item, i) => {
              return (
                <View style={styles.tag} key={'tag' + i}>
                  {/* <Badge status="success" value={'# ' + item} /> */}
                  <Text style={{ color: 'blue' }}>{'# ' + item}</Text>
                </View>
              );
            })}
          </View>

          {/* メモ表示 */}
          <View style={{ marginHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', display: display }}>
            <View>
              <Icon
                name='pen'
                type='font-awesome-5'
                color='gray'
                size={15}
                style={{ marginRight: 8 }}
              />
            </View>
            <Text>{this.props.detailReview.comment}</Text>
          </View>
        </ScrollView>


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
  shopName_container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  modal_icon: {
    position: 'absolute',
    right: 0,
    marginRight: 20
  },
  modal: {
    justifyContent: 'center',
    // height: 135,
    height: 90,
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
    marginTop: 10
  },

  text: {
    color: "black",
    fontSize: 30
  },
  tag_container: {
    marginLeft: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  tag: {
    marginRight: 10,
    marginBottom: 5,
  }
});

const foodStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
    detailReview: state.review.detailReview
  };
};


export default connect(foodStateToProps, actions)(DetailScreen);