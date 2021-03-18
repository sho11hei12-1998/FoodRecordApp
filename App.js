import React from 'react';
import {
  StyleSheet, Text, View, Platform, Image, Animated,
  TouchableOpacity
} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements'

import { Provider } from 'react-redux';
import store from './store';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import EditingScreen from './screens/EditingScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';
import ResetScreen from './screens/ResetScreen';
import PolicyScreen from './screens/PolicyScreen';

export default class App extends React.Component {
  render() {
    // const headerNavigationOptions = {
    //   headerStyle: {
    //     backgroundColor: 'white',
    //     marginTop: (Platform.OS === 'android' ? 24 : 0)
    //   },
    //   headerTitleStyle: { color: 'black' },
    //   headerTintColor: 'black',
    // };

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
        },
      },
      editing: {
        screen: EditingScreen,
        navigationOptions: {
          header: null,
        }
      }
    });

    // 1階層目以外はタブを隠す
    // HomeStack.navigationOptions = ({ navigation }) => {
    //   return {
    //     tabBarVisible: (navigation.state.index === 0)
    //   };
    // };

    // `AddStack`について
    const AddStack = createStackNavigator({
      add: {
        screen: AddScreen,
        navigationOptions: {
          header: null,
        },
      },
    }, {
      initialRouteName: 'add',
      mode: 'modal',
      headerMode: 'none',
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
      reset: {
        screen: ResetScreen,
        navigationOptions: {
          header: null,
        }
      },
      policy: {
        screen: PolicyScreen,
        navigationOptions: {
          header: null,
        }
      },
    });

    // 1階層目以外はタブを隠す
    // ProfileStack.navigationOptions = ({ navigation }) => {
    //   return {
    //     tabBarVisible: (navigation.state.index === 0)
    //   };
    // };

    const MainTab = createBottomTabNavigator({
      homeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Icon
              name='home'
              type='simple-line-icon'
              color='black'
              size={30}
            />
          ),
          title: ''
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Icon
              reverse
              name='plus'
              type='font-awesome-5'
              color='#ED1661'
              size={30}
            />
          ),
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Icon
              name='settings'
              type='simple-line-icon'
              color='black'
              size={30}

            />
          ),
          title: ''
        }
      }
    }, {
      resetOnBlur: true
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