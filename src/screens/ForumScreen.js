import React from 'react';
import { RefreshControl, Button, Image, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { genericGet, genericPost, retrieveData } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class ForumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Forum',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => { navigation.navigate('TopicCreate'); }}
      >
        <Text style={{ margin: 6, marginRight: 20, fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    )
  });

  getData () {
    retrieveData('authToken').then((authToken) => {
      var apiSubroute = '/api/forums/parent/list';
      var apiQuery = `?token=${authToken}`;
      genericGet(API_BASEROUTE, apiSubroute, apiQuery).then((response) => {
        if (response.ok) {
          this.setState({ dataList: response.content, isLoading: false });
        } else {
          this.props.navigation.goBack();
        }
      });
    });
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {

  }

  _onRefresh = () => {
    this.getData(); // refresh
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={[styles.infoText, {}]}>Select a post to view or make replies.</Text>
        <ButtonList
          style={{
            container: styles.topicContainer,
            button: styles.topicButton,
            titleText: styles.topicButtonText,
            subtitleText: styles.subtitleText
          }}
          data={this.state.dataList.reverse()}
          onPress={(item) => {
            this.props.navigation.navigate('TopicView', item);
          }}
          titleKey="parent_title"
          subtitleKey="parent_comment"
          refreshControl={
            <RefreshControl
              // refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    );
  }
}
