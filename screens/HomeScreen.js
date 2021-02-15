import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Header, Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SortIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as actions from '../actions';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Pic_WIDTH = SCREEN_WIDTH / 3;

const sortLists = [
  {
    name: "日付順",
  },
  {
    name: "五十音順",
    image:
      "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
    introduction: "Webページの見た目をつくるプログラミング言語",
  },
  {
    name: "ランダム",
    image:
      "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
    introduction: "Webページの見た目をつくるプログラミング言語",
  },
];



class HomeScreen extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllReviews(); // Action creatorを呼ぶ
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  onListItemPress = (selectedReview) => {
    this.props.selectDetailReview(selectedReview);
    this.props.navigation.navigate('detail');
  }

      
  // モーダル描画
  renderModal(lists) {
    return(
      <Modal style={{justifyContent: 'flex-end'}} isVisible={this.state.isModalVisible}>
        <View style={styles.modal}>
          {lists.map((item, idx) => {
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
          <Button title="キャンセル" color='white' onPress={() => this.toggleModal()} />
        </View>
      </Modal>
    );
  }
  
  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() { 
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap',  marginTop: 30}}>
        {this.props.allReviews.map((review, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => this.onListItemPress(review)}
            >
              <Image 
                style={{
                  width: Pic_WIDTH,
                  height: Pic_WIDTH
                }}
                source={review.imageURIs[0]}
              />
            </TouchableOpacity>
          );
        })}
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
              <TouchableOpacity onPress={ () => this.toggleModal() }>
                <FeatherIcon name="search" size={25} />
              </TouchableOpacity>
              {this.renderModal(sortLists)}
            </View>

            {/* 並び替えModal */}
            <View style={styles.modalIcon}>
              <TouchableOpacity onPress={ () => this.toggleModal() }>
                <SortIcon name="sort-variant" size={25} />
              </TouchableOpacity>
              {this.renderModal(sortLists)}
            </View>

            {/* お問い合わせModal */}
            <View style={styles.modalIcon}>
              <TouchableOpacity onPress={ () => this.toggleModal() }>
                <FeatherIcon name="more-vertical" size={25} />
              </TouchableOpacity>
              {this.renderModal(sortLists)}
            </View>
          </View>}
        />
        
        <ScrollView
          // pagingEnabled
        >
        <Text style={{marginTop: 30}}>{'# お気に入り'}</Text>
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
    marginTop: 10,
  },
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(HomeScreen)