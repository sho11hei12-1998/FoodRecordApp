import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';
import {
 createAppContainer,
 createBottomTabNavigator,
 createSwitchNavigator,
 createStackNavigator 
} from 'react-navigation';

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
        backgroundColor: 'deepskyblue',
        marginTop: (Platform.OS === 'android' ? 24 : 0)
      },
      headerTitleStyle: { color: 'white' },
      headerTintColor: 'white',
    };

    // `HomeStack`について
    const HomeStack = createStackNavigator({
      home: {
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'ホーム', 
          headerBackTitle: 'ホーム'
        }
      },
      detail: { screen: DetailScreen }
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
          ...headerNavigationOptions,
          headerTitle: 'マイページ',
          headerBackTitle: 'マイページ'
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
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/home.png')}
            />
          ),
          title: 'ホーム'
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Image
              style={{ height: 60, width: 60, tintColor: 'deepskyblue' }}
              source={require('./assets/add.png')}
            />
          ),
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/profile.png')}
            />
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