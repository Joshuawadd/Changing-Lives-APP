import React from 'react';
import { Header } from 'react-navigation-stack';
import { ActivityIndicator, StatusBar, Text, View, StyleSheet, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import styles from '../styles';
import colors from '../colors';
import { FlatList } from 'react-native-gesture-handler';
import { retrieveData, genericPost, genericGet } from '../utils';
import { API_BASEROUTE } from 'react-native-dotenv';

/* eslint-disable react-native/no-unused-styles */
const roles = StyleSheet.create({
  creator: {
    backgroundColor: colors.purple,
    padding: 10
  },
  staff: {
    backgroundColor: colors.pink,
    padding: 10
  },
  user: {
    backgroundColor: colors.blue,
    padding: 10
  },
  staffcreator: { // currently no distinction between staff and staffcreator
    backgroundColor: colors.pink,
    padding: 10
  }
});
/* eslint-enable react-native/no-unused-styles */

export default class TopicViewScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      parentInfo: this.props.navigation.state.params,
      parentId: this.props.navigation.state.params.parent_id,
      childComment: '',
      isLoading: true,
      keyboardShowing: false,
      willScroll: false
    };
  }

  getData () {
    const parentId = this.state.parentInfo.parent_id;
    retrieveData('authToken').then((authToken) => {
      var apiSubroute = '/api/forums/child/list';
      var apiQuery = `?token=${authToken}&parentId=${parentId}`;
      genericGet(API_BASEROUTE, apiSubroute, apiQuery).then((response) => {
        this.setState({ childInfo: response.content, isLoading: false });
      });
    });
  }

  static navigationOptions = {
    title: 'View Topic',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.props.navigation.setParams({ handleSubmit: this.submitChild });
    this.getData();
  };

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

  submitChild = () => {
    this.setState({
      childComment: this.state.childComment.trim()
    });
    if (this.state.childComment.trim() === '') {
      alert('Comment cannot be empty.');
    } else {
      Alert.alert(
        'Confirm',
        'Are you sure you want to post this comment?',
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
                var apiSubroute = '/api/forums/child/create';
                var body = `token=${authToken}&parentId=${this.state.parentId}&childComment=${this.state.childComment}`;
                genericPost(API_BASEROUTE, apiSubroute, body).then((response) => {
                  if (response.ok) { // success
                    this.setState({ childComment: '', willScroll: true });
                    this.getData(); // refresh
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

  usernames = (role, suppliedUser) => {
    var username = 'hello';

    if (suppliedUser === undefined) {
      if (role === 'creator') {
        username = 'Topic Creator';
      }
      if (role === 'staff') {
        username = 'Staff';
      }
      if (role === 'user') {
        username = 'User';
      }
      if (role === 'staffcreator') {
        username = 'Topic Creato (Staff)';
      }
    } else {
      username = suppliedUser;
    }

    return (<Text style={{ color: colors.white }}>{username}:</Text>);
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const marginSize = 10;
    return (
      <View style={{ flex: 1, margin: marginSize, padding: 10 }}>
        <Text style={styles.parentTitle}>{this.state.parentInfo.parent_title}</Text>
        <View style={{ marginTop: 5, marginBottom: 5, backgroundColor: colors.mdGrey, padding: 10 }}>
          <Text style={{ color: colors.white }}>{this.state.parentInfo.parent_comment}</Text>
          <View style={{ flex: 0.1 }} />
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + (marginSize * 2 + StatusBar.currentHeight) * this.state.keyboardShowing}
          style={{ flex: 1 }}
          behavior="padding"
        >

          <FlatList
            data={this.state.childInfo}
            renderItem={({ item }) => (
              <View style={{ marginTop: 5, marginBottom: 5 }}>
                <View style={roles[item.childRole]}>
                  {this.usernames(item.childRole, item.username)}
                  <Text style={{ color: colors.white }}>{item.child_comment}</Text>
                </View>
                <View style={{ flex: 0.1 }} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ref={ref => { this.flatList = ref; }}
            onContentSizeChange={() => {
              if (this.state.willScroll) {
                this.flatList.scrollToEnd({ animated: true });
                this.setState({ willScroll: false });
              }
            }}
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          />

          <View style={{ height: 40, flexDirection: 'row' }}>
            <TextInput
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                padding: '2%',
                fontSize: 18
              }}
              placeholder='Add a comment...'
              onChangeText={(childComment) => this.setState({ childComment })}
              value={this.state.childComment}
            />
            <TouchableOpacity
              style={{ backgroundColor: colors.rouge, width: '20%', justifyContent: 'center' }}
              onPress={() => this.submitChild()}
            >
              <Text style={{ textAlign: 'center' }}>==></Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>

      </View>
    );
  }
}
