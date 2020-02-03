import React from 'react';
import { Image, Text, View, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { API_BASEROUTE } from 'react-native-dotenv';

import { genericPost, storeData } from '../utils.js';
import styles from '../styles';



export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }
  
    static navigationOptions = {
      title: 'User Login',
      headerLeft: null,
      gesturesEnabled: false,
    };

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', function() {return true})
    }
    
    componentWillUnmount() {
      // Remove the event listener
      BackHandler.removeEventListener('hardwareBackPress', function() {return true})
    }
  
    render() {
      return (
        <View style={[styles.container]}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <View style={[styles.buttoncontainer]}>
            <TextInput
              style={[styles.button, styles.textinput]}
              placeholder="Username"
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
            />
            <TextInput
              style={[styles.button, styles.textinput]}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const api_subroute = "/api/users/login"
                let uname = this.state.username;
                let pass = this.state.password;
                let body = `userName=${uname}&userPassword=${pass}`;
                let postResponse = await genericPost(API_BASEROUTE, api_subroute, body);
                if (typeof(postResponse) !== 'undefined') {
                  storeData('authToken', postResponse)
                  this.props.navigation.navigate('Home');
                }
              }}>
              <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }