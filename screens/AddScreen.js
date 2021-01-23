import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;

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
class AddScreen extends React.Component {

  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() { 
    return (
      // 画像を横に並べる
      <View style={{ flexDirection: 'row' }}>
        {allReviewsTmp.map((item, index) => {
          return (
            <TouchableOpacity // 画像をタッチ可能にする(onPress効果を付与する)
              key={index}
              //onPress={ /*後で作る*/ }
            >
              <Image 
                style={{
                  width: SCREEN_WIDTH * 0.8,
                  height: SCREEN_WIDTH * 0.8,
                  margin: SCREEN_WIDTH * 0.1,                
                }}
                source={item.imageURIs[0]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // // カメラロールへアクセス
  // onImagePress = async (index) => { 
  //   // スマホ内に保存されてるカメラロールアクセス許可状況を読み取る
  //   let cameraRollPermission = await AsyncStorage.getItem('cameraRollPermission');

  //   // もしまだ許可してなかったら、
  //   if (cameraRollPermission !== 'granted') {
  //     // 許可を取ってみる
  //     let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //     // もしユーザーが許可しなかったら、
  //     if (permission.status !== 'granted') {
  //       // 何もしない
  //       return;
  //     }

  //     // (もしユーザーが許可したら、)カメラロールアクセス許可状況をスマホ内に保存する
  //     await AsyncStorage.setItem('cameraRollPermission', permission.status);
  //   }

  //   // カメラロールを起動する
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images, // 画像のみ選択可(ビデオは選択不可)
  //     allowsEditing: true // 編集可
  //   });

  //   // ユーザーが画像選択をキャンセルしなかったら(ちゃんと画像を選んだら)
  //   if (!result.cancelled) {
  //     // 新たな配列に今の`this.state.tripDetail.imageURIs`をコピーし、該当の要素だけURIを上書きする
  //     const newImageURIs = this.state.tripDetail.imageURIs;
  //     newImageURIs[index] = { uri: result.uri };

  //     // 上書き済みの新たな配列を`this.state.tripDetail.imageURIs`にセットする
  //     this.setState({
  //       ...this.state,
  //       tripDetail: {
  //         ...this.state.tripDetail,
  //         imageURIs: newImageURIs
  //       }
  //     });
  //   }
  // }

  // // 写真を添付するためのミニウィンドウを描画
  // renderImagePicker() {
  //   // 国が選択されたとき(国名が`INITIAL_STATE`じゃないとき)かつ
  //   // 国選択プルダウンメニューが閉じられたら、
  //   if (
  //     this.state.tripDetail.country !== INITIAL_STATE.tripDetail.country &&
  //     this.state.countryPickerVisible === false
  //   ) {
  //     // 写真を添付するためのミニウィンドウを描画する
  //     return (
  //       // 画像を横に並べる
  //       <View style={{ flexDirection: 'row' }}>
  //         {this.state.tripDetail.imageURIs.map((imageURI, index) => {
  //           return (
  //             <TouchableOpacity // 画像をタッチ可能にする(onPress効果を付与する)
  //               key={index}
  //               onPress={() => this.onImagePress(index)} // ←追記部分
  //             >
  //               <Image // `imageURIs`の数だけ画像を敷き詰める(サイズは正方形)
  //                 style={{
  //                   width: SCREEN_WIDTH / this.state.tripDetail.imageURIs.length,
  //                   height: SCREEN_WIDTH / this.state.tripDetail.imageURIs.length
  //                 }}
  //                 source={imageURI}
  //               />
  //             </TouchableOpacity>
  //           );
  //         })}
  //       </View>
  //     );
  //   }
  // }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView
          pagingEnabled
          horizontal={true}
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


export default AddScreen;