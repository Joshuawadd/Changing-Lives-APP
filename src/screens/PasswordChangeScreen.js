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
      loginButtonText: 'Update'
    };
  }

  static navigationOptions = {
    title: 'Change password',
    //headerLeft: null,
    //gesturesEnabled: false,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    // temporarily disable back button
    //this.backHandler = BackHandler.addEventListener('hardwareBackPress', function () { return true; });
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
    // stop disabling back button
    //this.backHandler.remove();
  }

  render () {
    // textInput cursor jumps to end: https://github.com/facebook/react-native/issues/27658
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
                title: this.state.loginButtonText
                //target: 'Login'
              }
            ]}
            onPress={async () => {
              this.setState({ loginButtonText: 'Updating' });
              const apiSubroute = '/api/users/change';
              //userId  password
              const password1 = this.state.password;
              const password2 = this.state.passwordConfirm;
              //console.log(password)
              //console.log(password2)
              if (password1 !== password2) {
                alert('Passwords don\'t match');
                this.setState({ loginButtonText: 'Update' });
                return;
              }
              retrieveData('userId').then(async (userId) => {
                const body = `userId=${userId}&password=${password1}`;
                const postResponse = await genericPost(API_BASEROUTE, apiSubroute, body, true);
                if (postResponse.ok) {
                  //storeData('authToken', postResponse.content.token);
                  //storeData('userId', postResponse.content.id.toString());
                  // this.props.navigation.navigate('Home');
                  this.props.navigation.goBack();
                } else {
                  this.setState({ loginButtonText: 'Update' });
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
              });
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
