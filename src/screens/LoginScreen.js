import React from 'react';
import { Alert, Image, Text, View, TextInput, TouchableOpacity, BackHandler, KeyboardAvoidingView } from 'react-native';
import { API_BASEROUTE } from 'react-native-dotenv';

import { genericPost, storeData } from '../utils.js';
import styles from '../styles';

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginButtonText: 'Login'
    };
  }

  static navigationOptions = {
    title: 'Login',
    headerLeft: null,
    gesturesEnabled: false,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    // temporarily disable back button
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', function () { return true; });
  }

  componentWillUnmount () {
    // stop disabling back button
    this.backHandler.remove();
  }

  render () {
    // textInput cursor jumps to end: https://github.com/facebook/react-native/issues/27658
    return (
      <KeyboardAvoidingView
        style={styles.container} behavior="padding" >

        <Image source={require('../assets/logo.png')} style={styles.image} />
        <View style={styles.buttonContainer}>

          <TextInput
            style={[styles.button, styles.textInput]}
            placeholder="Username"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={[styles.button, styles.textInput]}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              this.setState({ loginButtonText: 'Logging in...' });
              const apiSubroute = '/api/users/login';
              const uname = this.state.username;
              const pass = this.state.password;
              const body = `userName=${uname}&userPassword=${pass}`;
              const postResponse = await genericPost(API_BASEROUTE, apiSubroute, body, true);
              if (postResponse.ok) {
                storeData('authToken', postResponse.content);
                // this.props.navigation.navigate('Home');
                this.props.navigation.goBack();
              } else {
                if (postResponse.status === -1) {
                  Alert.alert(
                    'Error',
                    postResponse.content,
                    [
                      {
                        text: 'Continue offline',
                        // onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                        onPress: () => {
                          storeData('offlineModeEnabled', JSON.stringify(true));
                          this.props.navigation.goBack();
                        }
                      },
                      {
                        text: 'Retry',
                        onPress: () => { this.setState({ loginButtonText: 'Login' }); }
                      }
                    ],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert(
                    'Error',
                    postResponse.content,
                    [
                      {
                        text: 'Retry'
                      }
                    ],
                    { cancelable: false }
                  );
                }
              }
            }}>
            <Text style={styles.buttonText}>{this.state.loginButtonText}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
