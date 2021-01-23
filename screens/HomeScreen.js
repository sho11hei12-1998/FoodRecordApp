import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;
const Pic_WIDTH = SCREEN_WIDTH / 3;

const allReviewsTmp = [
  {
    shopName: '叙々苑',
    date: 'Jan/15/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
  },
  {
    shopName: '叙々苑',
    date: 'Jan/15/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
  },
  {
    shopName: '叙々苑',
    date: 'Jan/15/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
  },
  {
    shopName: '叙々苑',
    date: 'Jan/15/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
  },
];


class HomeScreen extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = {

    };
  }

  async componentDidMount() { 
    
  }
  
  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() { 
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap',  marginTop: 30}}>
        {allReviewsTmp.map((item, index) => {
          return (
            <TouchableOpacity // 画像をタッチ可能にする(onPress効果を付与する)
              key={index}
              //onPress={ /*後で作る*/ }
            >
              <Image 
                style={{
                  width: Pic_WIDTH,
                  height: Pic_WIDTH
                }}
                source={item.imageURIs[0]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );s
  }
  

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <Card>
          <ListItem>
            <Image
              style={{ height: 25, width: 25 }}
              source={require('../assets/profile.png')}
            />
            <ListItem.Content>
              <ListItem.Title>{'Shohei Saginao'}</ListItem.Title>
              <ListItem.Subtitle>{'投稿数：10'}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Card>
           
        <ScrollView
          // pagingEnabled
        >
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
});

export default HomeScreen;