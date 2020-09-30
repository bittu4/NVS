import React from 'react';
import { AppLoading } from 'expo';
import { Container, StyleProvider, Drawer, Root } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import HomeNavigator from './navigation/homeNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { Provider } from 'react-redux';
import store from './store/store'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <SafeAreaProvider><AppLoading /></SafeAreaProvider>;
    }
    return (
      <Provider store={store} >
        <StyleProvider style={getTheme(material)}>
          <HomeNavigator />
        </StyleProvider>
      </Provider>
    );
  }
}