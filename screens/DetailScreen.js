import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';


import { connect } from 'react-redux'; 
import * as actions from '../actions'; 

const SCREEN_WIDTH = Dimensions.get('window').width;

const modalLists = ["削除", "編集", "シェア"]
  

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
      <View style={{ flexDirection: 'column' }}>
        {imageArray.map((image, index) => {
          return (
            <Image
              style={{
                width: SCREEN_WIDTH * 0.8,
                height: SCREEN_WIDTH * 0.8,
                margin: SCREEN_WIDTH * 0.1,  
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
        <ScrollView>
          <View>
            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ fontSize: 30, padding: 5 }}>{this.props.detailReview.shopName}</Text>
              <Text style={{ padding: 5 }}>{this.props.detailReview.date}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 50 }}>
              <TouchableOpacity onPress={ () => this.toggleModal() }>
                <Icon name="more-horizontal" size={30} />
              </TouchableOpacity>

              {/* モーダル描画 */}
              <Modal style={{justifyContent: 'flex-end'}} isVisible={this.state.isModalVisible}>
                <View style={styles.modal}>
                  {modalLists.map((item, idx) => {
                    return (
                      <ListItem key={idx} bottomDivider
                        // onPress={}
                      >
                        <ListItem.Content style={{alignItems: 'center'}}>
                          <ListItem.Title>{item}</ListItem.Title>
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
          

          {/* 写真の描画 */}
          {this.renderImages()}
        </ScrollView>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
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
  }
});

const foodStateToProps = (state) => { 
  return {
    detailReview: state.review.detailReview
  };
}; 


export default connect(foodStateToProps, actions)(DetailScreen); 