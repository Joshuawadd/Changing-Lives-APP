import React from 'react';
import { Switch, Text, View, AsyncStorage } from 'react-native';
import styles from '../styles';
import { storeData, retrieveData } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SettingsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      logOutText: 'Logout'
    };
    this.offlineToggleText = {
      true: 'Offline Mode: Enabled',
      false: 'Offline Mode: Disabled'
    };
  }

  componentDidMount () {
    retrieveData('offlineModeEnabled').then((offlineModeEnabled) => {
      this.setState({
        offlineModeEnabled: JSON.parse(offlineModeEnabled)
      });
    });
  }

  static navigationOptions = {
    title: 'Settings',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  render () {
    this.clearAsyncStorage = async () => {
      AsyncStorage.clear();
      this.setState({ offlineModeEnabled: false });
    };

    this.toggleOffline = () => {
      const newOfflineModeEnabled = !this.state.offlineModeEnabled;
      this.setState({ offlineModeEnabled: newOfflineModeEnabled });
      storeData('offlineModeEnabled', JSON.stringify(newOfflineModeEnabled));
    };

    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Change your settings here.</Text>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.button} onPress={this.toggleOffline}>
            <Text style={styles.buttonText}>{this.offlineToggleText[this.state.offlineModeEnabled]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            storeData('authToken', '');
            this.setState({ logOutText: 'Logged out!' });
          }}>
            <Text style={styles.buttonText}>{this.state.logOutText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.props.navigation.navigate('PasswordChange')}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>

          {/*
          <TouchableOpacity style={styles.button} onPress={this.clearAsyncStorage}>
            <Text style={styles.buttonText}>CLEAR APP STORAGE (!)</Text>
          </TouchableOpacity>
          */}

        </View>
      </View>
    );
  }
}
