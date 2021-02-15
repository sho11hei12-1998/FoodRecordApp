import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, 
  Button, TouchableOpacity, AsyncStorage, 
} from 'react-native';
import { Header ,ListItem, Badge } from 'react-native-elements';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';



import { connect } from 'react-redux'; 
import * as actions from '../actions'; 

const SCREEN_WIDTH = Dimensions.get('window').width;

const modalLists = [
  {
    name: "削除",
    func: async function () {
      let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');
      let allReviews = JSON.parse(stringifiedAllReviews);   
      
      for (let i=0; i<allReviews.length; i++) {
        for(let j=0; l<detailReview.length; j++) {
          if (allReviews[i] === detailReview[j]){
            allReviews.splice( i, 1 );
          }
        } 
      }

    // 今回の登録情報が末尾に追加された配列をスマホ内に保存する
    try {
      // 一度トライする
      await AsyncStorage.setItem('allReviews', JSON.stringify(allReviews));
    } catch (e) {
      // もし何かエラーがあったら表示する
      console.warn(e);
    }

    // ここでAction creatorを呼んでHomeScreenを再描画させる
    this.props.fetchAllReviews();

    // HomeScreenに遷移する
    this.props.navigation.navigate('home');

      console.log(allReviews);
    } 
  },
  {
    name: "編集",
    image:
      "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
    introduction: "Webページの見た目をつくるプログラミング言語",
    num: "全7レッスン",
  },
  {
    name: "シェア",
    image:
      "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
    introduction: "Webページの見た目をつくるプログラミング言語",
    num: "全7レッスン",
  },
];
  

class DetailScreen extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  // deleteModal = async () => {
  //   // スマホ内に保存済みの情報を読み取る
  //   let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');
  //   let allReviews = JSON.parse(stringifiedAllReviews);

  //   // // 配列から任意の要素を削除する
  //   // for (let i=0; i<allReviews.length; i++) {
  //   //   for(let j=0; l<detailReview.length; j++) {
  //   //     if (allReviews[i] === detailReview[j]){
  //   //       allReviews.splice( i, 1 );
  //   //     }
  //   //   } 
  //   // }

  //   // // 今回の登録情報が末尾に追加された配列をスマホ内に保存する
  //   // try {
  //   //   // 一度トライする
  //   //   await AsyncStorage.setItem('allReviews', JSON.stringify(allReviews));
  //   // } catch (e) {
  //   //   // もし何かエラーがあったら表示する
  //   //   console.warn(e);
  //   // }

  //   // // ここでAction creatorを呼んでHomeScreenを再描画させる
  //   // this.props.fetchAllReviews();

  //   // // HomeScreenに遷移する
  //   // this.props.navigation.navigate('home');

  //   console.log(detailReviews);
  // }

  // 画像の描画
  renderImages() {
    // 画像が添付されていない場合の代替画像の保存場所(`uri`)
    const imageArray = [
      { uri: require('../assets/image_placeholder.png') },
      { uri: require('../assets/image_placeholder.png') },
      { uri: require('../assets/image_placeholder.png') },
    ];
  
    // 添付されている画像の数だけ繰り返す
    for (let i = 0; i < this.props.detailReview.imageURIs.length; i++) {
      // 添付画像の保存場所に更新
      imageArray[i].uri = this.props.detailReview.imageURIs[i];
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
              key={index}
            />
          );
        })}
      </View>
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header 
          backgroundColor="white" 
          leftComponent={
            <View>
              <TouchableOpacity onPress={ () => {this.props.navigation.navigate('home');}}>
                <FeatherIcon name="chevron-left" size={30} />
              </TouchableOpacity>
            </View>
          } 
          centerComponent={{ text: '投稿', style: styles.headerStyle }} 
        />
        <ScrollView>
          
          
          {/* 写真の描画 */}
          <ScrollView pagingEnabled horizontal={true}>
            {this.renderImages()}
          </ScrollView>

          {/* 店舗名Container */}
          <View style={styles.shopName_container}>
            <View style={{position: 'absolute'}}>
              <Text style={{ fontSize: 40, padding: 5 }}>{this.props.detailReview.shopName}</Text>
            </View>

            <View style={styles.modal_icon}>
              <TouchableOpacity onPress={ () => this.toggleModal() }>
                <FeatherIcon name="more-horizontal" size={30} />
              </TouchableOpacity>

              {/* モーダル描画 */}
              <Modal style={{justifyContent: 'flex-end'}} isVisible={this.state.isModalVisible}>
                <View style={styles.modal}>
                  {modalLists.map((item, idx) => {
                    return (
                      <ListItem key={idx} bottomDivider
                        onPress={item.func}
                      >
                        <ListItem.Content style={{alignItems: 'center'}}>
                          <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    );
                  })}
                </View>
                <View style={styles.cancel_modal}>
                  <Button title="キャンセル" onPress={() => this.toggleModal()} />
                </View>
              </Modal>
              
            </View>
          </View>

          {/* 投稿日付 */}
          <View style={{ margin: 20 }}>
            <Text>{this.props.detailReview.date}</Text>
          </View>

          {/* タグ表示 */}
          <View style={styles.tag_container}>
            {this.props.detailReview.tag.map((item) => {
              return (
                <View style={styles.tag}>
                  <Badge status="success" value={'# '+ item} />
                </View>
              );
            })}
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
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 40
  },
  modal_icon: {
    position: 'absolute',
    right: 0,
    marginRight: 20
  },
  modal: {
    justifyContent: 'center',
    height: 135,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cancel_modal: {
    justifyContent: 'center',
    height: 50,
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