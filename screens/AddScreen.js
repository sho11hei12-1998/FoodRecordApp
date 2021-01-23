import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;

class AddScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Hello</Text>
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