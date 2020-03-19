import React, { Component } from 'react';
import RoutesAppContainer from './Routes';
import * as Font from 'expo-font';
import { StatusBar, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { assetsLoaded: false };
  }

  componentDidMount () {
    Font.loadAsync({
      'Geogtq-Bd': require('./src/assets/fonts/Ge2003-Bd.ttf'),
      'Geogtq-Md': require('./src/assets/fonts/Ge2003-Md.ttf'),
      'Geogtq-SmBd': require('./src/assets/fonts/Ge2003-SmBd.ttf')
    }).then(() => {
      this.setState({ assetsLoaded: true });
    });
  }

  render () {
    const { assetsLoaded } = this.state;
    if (assetsLoaded) {
      return ( // only return app container if assets are loaded
        <RoutesAppContainer />
      );
    } else {
      return ( // otherwise, return activity indicator
        <View style={{ flex: 1, paddingTop: 64 }}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}
