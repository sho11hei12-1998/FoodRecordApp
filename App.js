import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import {
 createAppContainer,
 createBottomTabNavigator,
 createSwitchNavigator,
 createStackNavigator 
} from 'react-navigation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


import { Provider } from 'react-redux';

import store from './store';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';


export default class App extends React.Component {
  render() {
    const headerNavigationOptions = {
      headerStyle: {
        backgroundColor: 'white',
        marginTop: (Platform.OS === 'android' ? 24 : 0)
      },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
    };

    // `HomeStack`について
    const HomeStack = createStackNavigator({
      home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null,
        }
      },
      detail: { 
        screen: DetailScreen,
        navigationOptions: {
          header: null,
        }
       }
    });

    // 1階層目以外はタブを隠す
    HomeStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };


    // `AddStack`について
    const AddStack = createStackNavigator({
      add: {
        screen: AddScreen,
        navigationOptions: {
          header: null
        }
      },
    });

    // 0階層目以外(つまり全階層)はタブを隠す
    AddStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === -1) 
      };
    };


    // `ProfileStack`について
    const ProfileStack = createStackNavigator({
      profile: {
        screen: ProfileScreen,
        navigationOptions: {
          header: null
        }
      },
    });

    // 1階層目以外はタブを隠す
    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };

    const MainTab = createBottomTabNavigator({
      homeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: () => (
            <SimpleLineIcon name="home" size={30} />
          ),
          title: 'ホーム'
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <IoniconsIcon name="ios-add-circle-outline" size={65} style={{position: 'absolute'}} />
          ),
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: () => (
            <FontAwesome5Icon name="user-circle" size={30} />
          ),
          title: 'マイページ'
        }
      }
    }, {
      swipeEnabled: false, // Android用
    });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    );

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavigatorTab />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ↓この文消さないと`react-navigation`が上手く動かず、画面真っ白になっちゃう
    //alignItems: 'center',
    justifyContent: 'center',
  },
});