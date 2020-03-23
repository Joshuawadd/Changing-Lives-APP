import React from 'react';
import { Alert, ActivityIndicator, Image, TouchableOpacity, View, Linking } from 'react-native';
import { API_BASEROUTE } from 'react-native-dotenv';
import styles from '../styles';
import { retrieveData, genericGet, storeData } from '../utils';
import ButtonList from '../components/ButtonList';

export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      offlineModeEnabled: true
    };
  };

  static navigationOptions = {
    title: 'Home',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      retrieveData('offlineModeEnabled').then((offlineModeEnabled) => {
        if (offlineModeEnabled === null) {
          storeData('offlineModeEnabled', JSON.stringify(false));
          this.setState({ offlineModeEnabled: false });
        } else {
          this.setState({ offlineModeEnabled: JSON.parse(offlineModeEnabled) });
        }

        if (this.state.offlineModeEnabled === true) {
          this.setState({ isLoading: false });
        } else {
          this.setState({ isLoading: true });
          var apiSubroute = '/api/users/login/silent';
          genericGet.apply(this, [API_BASEROUTE, apiSubroute, '', true]).then((response) => {
            if (response.action !== 'retryLogin') {
              this.setState({ isLoading: false });
            }
          });
        }
      });
    });
  }

  componentWillUnmount () {
    // Remove the event listener
    this.focusListener.remove();
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <ButtonList
          // style={{
          // container: styles.topicContainer,
          // }}
          data={[
            {
              title: 'Resources',
              target: 'Sections'
            },
            {
              title: 'Forum',
              target: 'Forum',
              disabled: this.state.offlineModeEnabled
            },
            {
              title: 'Settings',
              target: 'Settings'
            }
          ]}
          onPress={(item) => {
            if (item.disabled) {
              alert('Cannot access while offline mode is enabled (visit Settings to turn it off).');
            } else {
              this.props.navigation.navigate(item.target);
            }
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://www.facebook.com/ChangingLivesCharity/'); }}>
            <Image
              source={require('../assets/fb.png')}
              style={{ height: 50, width: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://twitter.com/changinglives__'); }}>
            <Image
              source={require('../assets/twitter.png')}
              style={{ height: 50, width: 50 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://www.changing-lives.org.uk/'); }}>
            <Image
              source={require('../assets/icon_1024.png')}
              style={{ height: 50, width: 50 }} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
