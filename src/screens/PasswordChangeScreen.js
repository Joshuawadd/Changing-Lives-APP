import React from 'react';
import { Alert, Image, Text, View, TextInput, Keyboard, TouchableOpacity, BackHandler, KeyboardAvoidingView } from 'react-native';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import { genericPost, storeData, retrieveData } from '../utils.js';
import styles from '../styles';

export default class PasswordChangeScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      keyboardShowing: false,
      password: '',
      passwordConfirm: '',
      passwordButtonText: 'Update'
    };
  }

  static navigationOptions = {
    title: 'Change password',

    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardShowing: true });
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardShowing: false });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.container} behavior="padding" >

        <Image style={styles.image} />
        <View style={styles.buttonContainer}>

          <TextInput
            style={[styles.button, styles.textInput]}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TextInput
            style={[styles.button, styles.textInput]}
            secureTextEntry={true}
            placeholder="Confirm password"
            onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
            value={this.state.passwordConfirm}
          />
          <ButtonList
            style={{
              container: styles.topicContainer
            }}
            data={[
              {
                title: this.state.passwordButtonText
              }
            ]}
            onPress={async () => {
              this.setState({ passwordButtonText: 'Updating' });
              const apiSubroute = '/api/users/change';
              const password1 = this.state.password;
              const password2 = this.state.passwordConfirm;
              if (password1 !== password2) {
                alert('Passwords don\'t match');
                this.setState({ passwordButtonText: 'Update' });
                return;
              }
              retrieveData('userId').then(async (userId) => {
                const body = `userId=${userId}&password=${password1}`;
                const postResponse = await genericPost(API_BASEROUTE, apiSubroute, body, true);
                if (postResponse.ok) {
                  alert('Password successfully changed!');
                  this.props.navigation.navigate('Home');
                } else {
                  alert(postResponse.content);
                  this.setState({ passwordButtonText: 'Update' });
                }
              });
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
