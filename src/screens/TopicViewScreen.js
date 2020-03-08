import React from 'react';
import { Header, useHeaderHeight } from 'react-navigation-stack';
import { Platform, ActivityIndicator, StatusBar, Text, View, StyleSheet, Alert, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import styles from '../styles';
import colors from '../colors';
import { FlatList } from 'react-native-gesture-handler';
import { retrieveData, genericPost, genericGet } from '../utils';
import { API_BASEROUTE } from 'react-native-dotenv';

/* eslint-disable react-native/no-unused-styles */
const roles = StyleSheet.create({
  parent: {
    backgroundColor: colors.mdGrey
  },
  creator: {
    backgroundColor: colors.purple
  },
  staff: {
    backgroundColor: colors.pink
  },
  user: {
    backgroundColor: colors.blue
  },
  staffcreator: { // currently no distinction between staff and staffcreator
    backgroundColor: colors.pink
  }
});
/* eslint-enable react-native/no-unused-styles */

const usernames = (role, suppliedUser) => {
  var username;

  if (suppliedUser === undefined) {
    if ((role === 'creator') || (role === 'parent')) {
      username = 'Topic Creator';
    }
    if (role === 'staff') {
      username = 'Staff';
    }
    if (role === 'user') {
      username = 'User';
    }
    if (role === 'staffcreator') {
      username = 'Topic Creator (Staff)';
    }
  } else {
    username = suppliedUser;
  }

  return (username);
};

function ParentPost (props) {
  if (props.display) {
    return <View style={{ marginTop: 5, marginBottom: 5 }}>
      <View style={[{ padding: 10 }, roles.parent]}>
        <Text style={styles.topicPostUsername}>{usernames('parent', props.parentInfo.username)}:</Text>
        <Text style={styles.topicPostText}>{props.parentInfo.parent_comment}</Text>
      </View>
      <View style={{ flex: 0.1 }} />
    </View>;
  }
  return null;
}

export default class TopicViewScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollWithParent: true, // change to false to "stick" the parent post to the top of the screen
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
        var childInfo = response.content;
        if (this.state.scrollWithParent) {
          var parentAsChild = {
            child_comment: this.state.parentInfo.parent_comment,
            childRole: 'parent'
          };
          if (typeof (this.state.parentInfo.username) !== 'undefined') {
            parentAsChild.username = this.state.parentInfo.username;
          }
          childInfo.unshift(parentAsChild);
        }
        this.setState({ childInfo: childInfo, isLoading: false });
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

  _keyboardDidShow = (event) => {
    //alert(JSON.stringify(event))
    this.setState({ keyboardShowing: true, willScroll: true });
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

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const marginSize = 10;
    const offsetAdd = 44;
    //alert(Header.HEIGHT)
    const offset = Platform.OS === 'ios'
      ? Header.HEIGHT + offsetAdd
      : Header.HEIGHT + (marginSize * 2 + StatusBar.currentHeight) * this.state.keyboardShowing;
    return (
      <View style={{ flex: 1, margin: marginSize }}>
        <Text style={styles.parentTitle}>{this.state.parentInfo.parent_title}</Text>

        <ParentPost display={!this.state.scrollWithParent} parentInfo={this.state.parentInfo} />

        <KeyboardAvoidingView
          // keyboardVerticalOffset={Header.HEIGHT + (marginSize * 2 + statusBarHeight) * !this.state.keyboardShowing}
          keyboardVerticalOffset={offset}
          style={{ flex: 1 }}
          behavior="padding"
        >

          <FlatList
            data={this.state.childInfo}
            renderItem={({ item }) => (
              <View style={{ marginTop: 5, marginBottom: 5 }}>
                <View style={[{ padding: 10 }, roles[item.childRole]]}>
                  <Text style={styles.topicPostUsername}>{usernames(item.childRole, item.username)}:</Text>
                  <Text style={styles.topicPostText}>{item.child_comment}</Text>
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
            onLayout={() => {
              if (this.state.willScroll) {
                this.flatList.scrollToEnd({ animated: true });
                this.setState({ willScroll: false });
              }
            }}
          />

          <View style={{ height: 40, flexDirection: 'row' }}>
            <TextInput
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                padding: '2%',
                fontSize: 18,
                fontFamily: 'Geogtq-Md'
              }}
              placeholder='Add a comment...'
              onChangeText={(childComment) => this.setState({ childComment })}
              value={this.state.childComment}
            />
            <TouchableOpacity
              style={{ backgroundColor: colors.rouge, width: '20%', justifyContent: 'center' }}
              onPress={() => this.submitChild()}
            >
              <Text style={{ textAlign: 'center', color: colors.white, fontFamily: 'Geogtq-SmBd', fontSize: 16 }}>Send</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>

      </View>
    );
  }
}
