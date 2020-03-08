import React from 'react';
import { Header } from 'react-navigation-stack';
import { Platform, StatusBar, Text, View, RightButton, Button, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from '../styles';
import { FlatList } from 'react-native-gesture-handler';
import { API_BASEROUTE } from 'react-native-dotenv';
import { retrieveData, genericPost } from '../utils';

export default class TopicCreateScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      keyboardShowing: false,
      parentTitle: '',
      parentComment: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Create Topic',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: <TouchableOpacity
        onPress={() => { params.handleSubmit(); }}
      >
        <Text style={{ margin: 10, marginRight: 20, fontSize: 20 }}>✓</Text>
      </TouchableOpacity>
    };
  };

  submitParent = () => {
    this.setState({
      parentTitle: this.state.parentTitle.trim(),
      parentComment: this.state.parentComment.trim()
    });
    if (this.state.parentTitle.trim() === '') {
      alert('Title cannot be empty.');
    } else if (this.state.parentComment.trim() === '') {
      alert('Comment cannot be empty.');
    } else {
      Alert.alert(
        'Confirm',
        'Are you sure you want to post this topic?',
        [
          {
            text: 'No',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => {
              retrieveData('authToken').then((authToken) => {
                var apiSubroute = '/api/forums/parent/create';
                var body = `token=${authToken}&parentTitle=${this.state.parentTitle}&parentComment=${this.state.parentComment}`;
                genericPost(API_BASEROUTE, apiSubroute, body).then((response) => {
                  if (response.ok) { // success
                    alert('Post successful!');
                    this.props.navigation.goBack();
                  }
                });
              });
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.navigation.setParams({ handleSubmit: this.submitParent });
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardShowing: true });
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardShowing: false });
  }

  render () {
    const marginSize = 10;
    const offsetAdd = 44;
    const offset = Platform.OS === 'ios'
      ? Header.HEIGHT + offsetAdd
      : Header.HEIGHT + (marginSize * 2 + StatusBar.currentHeight) * this.state.keyboardShowing;
    return (

      <View style={{ flex: 1, margin: marginSize }}>
        <TextInput
          style={{
            height: '10%',
            width: '100%',
            borderWidth: 1,
            padding: '2%',
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Geogtq-Bd'
          }}
          placeholder='Title'
          onChangeText={(parentTitle) => this.setState({ parentTitle })}
          value={this.state.parentTitle}
        />

        <KeyboardAvoidingView
          keyboardVerticalOffset={offset}
          style={{ flex: 1 }}
          behavior="padding"

        >
          <View style={styles.container}>

            <TextInput
              multiline
              style={{
                textAlignVertical: 'top',
                flex: 1,
                width: '100%',
                borderWidth: 1,
                padding: '2%',
                fontFamily: 'Geogtq-Md',
                fontSize: 16
              }}
              placeholder='Comment'
              onChangeText={(parentComment) => this.setState({ parentComment })}
              value={this.state.parentComment}
            />
          </View>

        </KeyboardAvoidingView>
      </View>
    );
  }
}
