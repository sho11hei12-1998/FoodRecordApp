import _ from 'lodash';
import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard,
  ActivityIndicator, TouchableOpacity, AsyncStorage, TextInput, KeyboardAvoidingView,
  Alert,
} from 'react-native'
import {
  Header, Card, ListItem, Button, Icon, Input, Badge,
  FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationActions, StackActions } from 'react-navigation'
import Modal from 'react-native-modal';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();


const INITIAL_STATE = {
  chosenDate: new Date().toLocaleString('ja'),

  // 入力情報初期値
  foodRecords: {
    shopName: '',
    date: year + '年' + month + '月' + date + '日',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    tag: [],
  },

  // DatePicker表示
  isDatePickerVisible: false,

  // tagのInputForm
  tagName: '',
  tagBox: [],

  shopName_error: false,
  tag_error: false,
};

class AddScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // カメラロールへアクセス
  onImagePress = async (index) => {
    // スマホ内に保存されてるカメラロールアクセス許可状況を読み取る
    let cameraRollPermission = await AsyncStorage.getItem('cameraRollPermission');

    // もしまだ許可してなかったら、
    if (cameraRollPermission !== 'granted') {
      // 許可を取ってみる
      let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      // もしユーザーが許可しなかったら、
      if (permission.status !== 'granted') {
        // 何もしない
        return;
      }

      // (もしユーザーが許可したら、)カメラロールアクセス許可状況をスマホ内に保存する
      await AsyncStorage.setItem('cameraRollPermission', permission.status);
    }

    // カメラロールを起動する
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 画像のみ選択可(ビデオは選択不可)
      allowsEditing: true // 編集可
    });

    // ユーザーが画像選択をキャンセルしなかったら(ちゃんと画像を選んだら)
    if (!result.cancelled) {
      // 新たな配列に今の`this.state.foodRecords.imageURIs`をコピーし、該当の要素だけURIを上書きする
      const newImageURIs = this.state.foodRecords.imageURIs;
      newImageURIs[index] = { uri: result.uri };

      // 上書き済みの新たな配列を`this.state.foodRecords.imageURIs`にセットする
      this.setState({
        ...this.state,
        foodRecords: {
          ...this.state.foodRecords,
          imageURIs: newImageURIs
        }
      });
    }
  }

  // 写真を添付するためのミニウィンドウを描画
  renderImagePicker() {
    return (
      // 画像を横に並べる
      <View style={{ flexDirection: 'row' }}>
        {this.state.foodRecords.imageURIs.map((imageURI, index) => {
          return (
            <TouchableOpacity
              key={'addImg' + index}
              onPress={() => this.onImagePress(index)}
            >
              <Image
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_WIDTH,
                }}
                source={imageURI}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }


  // shopNameの変更
  changeValue(text) {
    const newRecordsState = Object.assign({}, this.state.foodRecords);
    newRecordsState.shopName = text;
    this.setState({ foodRecords: newRecordsState });
  }
  // shopName入力
  selectShopName() {
    const shopName = this.state.foodRecords.shopName;
    return (
      <View>
        <Input
          placeholder='店名を入力'
          onChangeText={text => this.changeValue(text)}
          value={shopName}
        />
      </View>
    );
  }

  // datepicker処理
  renderDatePicker() {
    const showDatePicker = () => {
      this.setState({ isDatePickerVisible: true });
    };

    const hideDatePicker = () => {
      this.setState({ isDatePickerVisible: false });
    };

    const handleConfirm = (date) => {
      const dateString = date.toLocaleString('ja');
      let result = dateString.split(' ')[0]; // "2018/10/04 17:00:00" ---> "2018/10/04"
      let res = result.split('/');
      let ans = res[0] + '年' + res[1] + '月' + res[2] + '日';

      this.setState({
        foodRecords: {
          ...this.state.foodRecords,
          date: ans,
        },
      });
      hideDatePicker();
    };

    return (
      <View>
        <ListItem onPress={showDatePicker} bottomDivider>
          <ListItem.Content style={{ alignItems: 'left' }}>
            <ListItem.Title>{this.state.foodRecords.date}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  }

  // Badgeの削除
  deleteBadge(num) {
    let copyList = [...this.state.tagBox];
    copyList.splice(num, 1);
    this.setState({
      tagBox: copyList,
    })
  }
  // Badgeの描画
  renderBadge() {
    return (
      <View style={styles.badge_container}>
        {this.state.tagBox.map((item, i) => {
          return (
            <View style={styles.badge} key={'Badge' + i}>
              <Badge value={'# ' + item} status="success" />
              <TouchableOpacity onPress={() => this.deleteBadge(i)}>
                <Badge value={'-'} status='error' />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
  // タグの追加処理
  addTagName(tagName) {
    this.setState({
      tagBox: this.state.tagBox.concat(tagName)
    });
    this.setState({ tagName: '' });
  }
  // BadgeForm
  BadgeForm() {
    return (
      <View style={styles.tag_form}>
        <KeyboardAvoidingView style={{ flexDirection: 'row', marginRight: 35 }}>
          <Input
            placeholder='# タグを追加'
            value={this.state.tagName}
            onChangeText={text => this.setState({ tagName: text })}
          />
          <TouchableOpacity onPress={() => this.addTagName(this.state.tagName)}>
            <IoniconsIcon name="ios-add-circle-sharp" size={35} />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* badgeの描画 */}
        {this.renderBadge()}
      </View>
    );
  }


  // 入力情報をスマホ内に保存する
  onAddButtonPress = async () => {
    const newRecordsState = Object.assign({}, this.state.foodRecords);
    if (this.state.tagBox !== []) {
      for (let i = 0; i < this.state.tagBox.length; i++) {
        newRecordsState.tag.push(this.state.tagBox[i]);
      }
    }
    this.setState({ foodRecords: newRecordsState });
    this.state.tagBox = [];

    // 添付されてる写真のURIだけ追加して、未添付を表す`require('../assets/add_image_placeholder.png')`は追加しない
    const newImageURIs = [];
    for (let i = 0; i < this.state.foodRecords.imageURIs.length; i++) {
      if (this.state.foodRecords.imageURIs[i] !== require('../assets/add_image_placeholder.png')) {
        newImageURIs.push(this.state.foodRecords.imageURIs[i]);
      }
    }

    // 添付されてる写真のURIだけをもつ`foodRecords`を作る
    const foodRecords = this.state.foodRecords;
    foodRecords.imageURIs = newImageURIs;

    // スマホ内に保存済みの情報を読み取る
    let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');
    let allReviews = JSON.parse(stringifiedAllReviews);

    // もしまだ一つも登録情報が無ければ、
    if (allReviews === null) {
      // 空の配列をセットする
      allReviews = [];
    }

    // 今回の登録情報を配列の末尾に追加する
    allReviews.push(foodRecords);

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

    // `this.state`をリセットする
    const newFoodRecords = Object.assign({}, INITIAL_STATE.foodRecords);
    await this.setState({
      foodRecords: newFoodRecords
    });

    INITIAL_STATE.foodRecords.imageURIs = [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ];

    // HomeScreenに遷移する
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'add' })
      ],
    }))
    this.props.navigation.navigate('home');
  }


  // 追加ボタンを描画
  renderAddButton() {
    let isComplete = false;

    // 写真、タイトルが入力されているかを確認
    if (this.state.foodRecords.shopName === '' || this.state.foodRecords.imageURIs[0] === 18) {
      // ボタンを押せない
      isComplete = true;
    }
    else {
      ;
    }

    return (
      <View style={{ padding: 20 }}>
        <Button
          title="保存する"
          color="white"
          buttonStyle={{ backgroundColor: 'deepskyblue' }}
          onPress={() => this.onAddButtonPress()}
          disabled={isComplete} // 入力がまだ完了してなければボタンを押せないようにする
        />
      </View>
    );
  }

  // 戻るボタンの確認Alert 
  confirmDelete = () => {
    // confirm Alert
    if (this.state.foodRecords !== INITIAL_STATE.foodRecords) {
      Alert.alert(
        "確認",
        "投稿内容を削除しますか？",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              console.log("OK Pressed")

              INITIAL_STATE.foodRecords.imageURIs = [
                require('../assets/add_image_placeholder.png'),
                require('../assets/add_image_placeholder.png'),
                require('../assets/add_image_placeholder.png'),
              ];

              // HomeScreenに戻る
              this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'add' })
                ],
              }))
              this.props.navigation.navigate('home');
            }
          }
        ],
        { cancelable: false }
      );
    }
    else {
      // HomeScreenに戻る
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'add' })
        ],
      }))
      this.props.navigation.navigate('home');
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }} >

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="position"
          contentContainerStyle={{ flex: 1 }}
        >
          <Header
            backgroundColor="white" // ヘッダーの色
            leftComponent={{ // 左上のアイコン
              icon: 'close',
              color: 'black',
              onPress: () => {
                this.confirmDelete()
              }
            }}
            centerComponent={{ text: '新規登録', style: styles.headerStyle }} // ヘッダータイトル
          />

          <ScrollView>
            {/* 画像を添付 */}
            <ScrollView
              pagingEnabled
              horizontal={true}
            >
              {this.renderImagePicker()}

            </ScrollView>

            {/* InputForm */}

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                {/* 店名を入力 */}
                {this.selectShopName()}

                {/* 日付選択 */}
                {this.renderDatePicker()}

                {/* タグ入力 */}
                {this.BadgeForm()}

                {/* 保存ボタンを描画 */}
                {this.renderAddButton()}
              </View>
            </TouchableWithoutFeedback>


          </ScrollView>
        </KeyboardAvoidingView>

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
    fontSize: 22,
    fontWeight: 'bold',
  },
  tag_form: {
    marginVertical: 30,
  },
  badge_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  badge: {
    marginRight: 10,
    marginBottom: 5,
    flexDirection: 'row'
  },

  inner: {
    padding: 30,
    flex: 1,
  },
});

const foodStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
  };
};


export default connect(foodStateToProps, actions)(AddScreen); 