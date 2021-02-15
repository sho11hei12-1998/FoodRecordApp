// 入力情報をスマホ内に保存する
ModalPressButton = async () => {

  const foodRecords = this.state.foodRecords;

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

  // HomeScreenに遷移する
  this.props.navigation.navigate('home');
}