import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  TouchableOpacity, AsyncStorage, Alert
} from 'react-native';
import { Card, ListItem, Button, Icon, Avatar, Header } from 'react-native-elements'
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';


import { connect } from 'react-redux';
import * as actions from '../actions';


class SettingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white"
          leftComponent={
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('profile'); }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <FeatherIcon name="chevron-left" size={30} />
                  <Text style={{ marginTop: 8 }}>{'設定'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />

        <View>
          <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{'アプリケーション・プライバシーポリシー'}</Text>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <View style={styles.text_container}>
                <Text>{'FooDiaryは、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、個人情報保護の重要性の認識と取り組みを徹底することにより、個人情報の保護を推進致します。'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'個人情報の管理'}</Text>
                </View>
                <Text style={styles.text_box}>{'FooDiaryは、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'個人情報の利用目的'}</Text>
                </View>
                <Text style={styles.text_box}>{'お客さまからお預かりした個人情報は、各アプリ内でのデータ保存のみに利用します。'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'個人情報の第三者への開示・提供の禁止'}</Text>
                </View>
                <Text style={styles.text_box}>{'FooDiaryは、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。'}</Text>
                <Text>{'・お客さまの同意がある場合'}</Text>
                <Text>{'・お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合'}</Text>
                <Text>{'・法令に基づき開示することが必要である場合'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'個人情報の安全対策'}</Text>
                </View>
                <Text style={styles.text_box}>{'FooDiaryは、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'ご本人の照会'}</Text>
                </View>
                <Text style={styles.text_box}>{'お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。'}</Text>
              </View>

              <View style={styles.text_container}>
                <View style={styles.title_design}>
                  <Text style={styles.title}>{'法令・規範の遵守と見直し'}</Text>
                </View>
                <Text style={styles.text_box}>{'保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。'}</Text>
              </View>


            </View>
          </ScrollView>

        </View>

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
  text_container: {
    marginHorizontal: 5,
    marginVertical: 15
  },
  title: {
    fontSize: 20,
  },
  title_design: {
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  text_box: {
    marginTop: 10
  }
});

const foodStateToProps = (state) => { // `state`を引数として受け取るアロー関数
  return {
    // `state.review.allReviews`を → `this.props.allReviews`にコピー
    allReviews: state.review.allReviews
  };
};

export default connect(foodStateToProps, actions)(SettingScreen);
