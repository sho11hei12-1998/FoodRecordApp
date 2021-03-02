import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Dimensions,
  Button, TouchableOpacity, AsyncStorage,
} from 'react-native';
import { Header, ListItem, Badge, Input } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';



import { connect } from 'react-redux';
import * as actions from '../actions';
import { color } from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;



class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      search: '',
    };
  }


  updateSearch = (search) => {
    this.setState({ search });
  };



  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="white"
        />
        <View style={{ flexDirection: 'row', margin: 8 }}>
          <View style={{ width: SCREEN_WIDTH * 0.8 }}>
            <Searchbar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 20, marginLeft: 8 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('home') }}>
              <Text>{'キャンセル'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text>{'タグ一覧'}</Text>
        </View>

        <ScrollView>


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

});

const foodStateToProps = (state) => {
  return {
    allReviews: state.review.allReviews,
    detailReview: state.review.detailReview
  };
};


export default connect(foodStateToProps, actions)(SearchScreen); 