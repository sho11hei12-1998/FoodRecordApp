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
import * as SplashScreen from 'expo-splash-screen';
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
import ContactScreen from './screens/ContactScreen';

export default class App extends React.Component {

  componentDidMount() {
    SplashScreen.preventAutoHideAsync()
      .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
      .catch(console.warn);

    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

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
      contact: {
        screen: ContactScreen,
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
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome-5'
              color={tintColor}
              size={25}
            />
          ),
          tabBarOptions: { activeTintColor: '#ffb300', },
          title: 'ホーム'
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name='plus-circle'
              type='font-awesome-5'
              color={tintColor}
              size={30}
            />
          ),
          tabBarOptions: { activeTintColor: '#ffb300', },
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name='cog'
              type='font-awesome-5'
              color={tintColor}
              size={25}
            />
          ),
          tabBarOptions: { activeTintColor: '#ffb300', },
          title: '設定'
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