import React from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, BackHandler, KeyboardAvoidingView } from 'react-native';
import { API_BASEROUTE } from 'react-native-dotenv';

import { genericPost, storeData } from '../utils.js';
import styles from '../styles';

export default class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: 'CLStaff',
      password: 'admin'
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
              const apiSubroute = '/api/users/login';
              const uname = this.state.username;
              const pass = this.state.password;
              const body = `userName=${uname}&userPassword=${pass}`;
              const postResponse = await genericPost(API_BASEROUTE, apiSubroute, body);
              if (typeof (postResponse) !== 'undefined') {
                storeData('authToken', postResponse);
                this.props.navigation.navigate('Home');
              }
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
