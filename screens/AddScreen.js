import _ from 'lodash';
import React from 'react';
import { 
  StyleSheet, View, Text, Image, ScrollView, Dimensions, 
  ActivityIndicator, TouchableOpacity, AsyncStorage, TextInput 
} from 'react-native'
import { Header, Card, ListItem, Button, Icon } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux'; 
import * as actions from '../actions'; 

const SCREEN_WIDTH = Dimensions.get('window').width;

const INITIAL_STATE = {
  chosenDate: new Date().toLocaleString('ja'),

  // 入力情報初期値
  foodRecords: {
    shopName: '',
    date: 'Select date',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    category: '',
  },

  // DatePicker表示
  isDatePickerVisible: false,
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
            <TouchableOpacity // 画像をタッチ可能にする(onPress効果を付与する)
              key={index}
              onPress={() => this.onImagePress(index)}
            >
              <Image 
                style={{
                  width: SCREEN_WIDTH * 0.8,
                  height: SCREEN_WIDTH * 0.8,
                  margin: SCREEN_WIDTH * 0.1,                
                }}
                source={imageURI}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // dateの変更
  changeValue(text) {
    const newRecordsState = Object.assign({}, this.state.foodRecords);
    newRecordsState.shopName = text;
    this.setState({ foodRecords: newRecordsState });
  }

  
  // shopName入力
  selectShopName() {
    return (
      <View style={styles.listItemStyle}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.changeValue(text)}
          value={this.state.foodRecords.shopName}
        />
      </View>
    );
  }

  // datepicker処理
  renderDatePicker() {
    const showDatePicker = () => {
      this.setState({isDatePickerVisible: true});
    };

    const hideDatePicker = () => {
      this.setState({isDatePickerVisible: false});
    };
  
    const handleConfirm = (date) => {
      const dateString = date.toLocaleString('ja');

      this.setState({
        foodRecords: {
          ...this.state.foodRecords,
          date: dateString.split(' ')[0] // "2018/10/04 17:00:00" ---> "2018/10/04"
        },
      });
      hideDatePicker();
    };

    return (
      <View style={styles.listItemStyle}>
        <Button title={this.state.foodRecords.date} onPress={showDatePicker} />
        
        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    );
  }


  // 入力情報をスマホ内に保存する
  onAddButtonPress = async () => {
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
    this.setState({
      ...INITIAL_STATE,
      foodRecords: {
        ...INITIAL_STATE.foodRecords,
        imageURIs: [
          require('../assets/add_image_placeholder.png'),
          require('../assets/add_image_placeholder.png'),
          require('../assets/add_image_placeholder.png'),
        ]
      }
    });

    // HomeScreenに遷移する
    this.props.navigation.navigate('home');
  }


  // 追加ボタンを描画
  renderAddButton() {
    // とりあえず入力は完了しているということにしておく
    let isComplete = true;

    // `this.state.foodRecords`のキーの数だけ繰り返す
    Object.keys(this.state.foodRecords).forEach((key) => {
      // 'imageURIs'以外の`key`で
      // `this.state.foodRecords`の各値が`INITIAL_STATE.foodRecords`と(一つでも)同じだったら、
      if (
        key !== 'imageURIs' &&
        this.state.foodRecords[key] === INITIAL_STATE.foodRecords[key]
      ) {
        // それはまだ入力が完了していないということ('imageURIs'は必須ではない)
        isComplete = false;
      }
    });

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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header 
          statusBarProps={{ barStyle: 'light-content' }} // ステータスバーの色
          backgroundColor="deepskyblue" // ヘッダーの色
          leftComponent={{ // 左上のアイコン
            icon: 'close',
            color: 'white',
            onPress: () => {
              // `this.state`を`INITIAL_STATE`にリセット
              this.setState({
                ...INITIAL_STATE, // `INITIAL_STATE`の中身をここに展開
                tripDetail: {
                  ...INITIAL_STATE.tripDetail, // `INITIAL_STATE.tripDetail`の中身をここに展開
                  imageURIs: [
                    require('../assets/add_image_placeholder.png'),
                    require('../assets/add_image_placeholder.png'),
                    require('../assets/add_image_placeholder.png'),
                  ]
                }
              });

              // HomeScreenに戻る
              this.props.navigation.navigate('home');
            }
          }}
          centerComponent={{ text: 'Add', style: styles.headerStyle }} // ヘッダータイトル
        />

        <ScrollView>
          {/* 画像を添付 */}
          <ScrollView
            pagingEnabled
            horizontal={true}
          >
            {this.renderImagePicker()}

          </ScrollView>

          <Text>{"店名を入力"}</Text>
          {this.selectShopName()}

          <Text>{"日付を選択"}</Text>
          {this.renderDatePicker()}
          
          {/* 保存ボタンを描画 */}
          {this.renderAddButton()}
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  listItemStyle: { 
    margin: 10,
  },
});

const foodStateToProps = (state) => { 
  return {
    allReviews: state.review.allReviews,
  };
};


export default connect(foodStateToProps, actions)(AddScreen); 