import React from 'react';
import { Button, Image, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { genericGet, genericPost, retrieveData } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class ForumScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = { isLoading: true };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Forum',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={() => { navigation.navigate('TopicCreate'); }}
      >
        <Text style={{ margin: 20, fontSize: 20 }}>+</Text>
      </TouchableWithoutFeedback>
    )
  });

  componentDidMount () {
    /* UNCOMMENT ONCE API SIDE IS COMPLETE
    retrieveData('authToken').then((authToken) => {
    var apiSubroute = "/api/forums/parent/list"
    var apiQuery = `?token=${authToken}`
    genericGet(API_BASEROUTE, apiSubroute, apiQuery).then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){});
    })
  }) */
    this.setState({
      isLoading: false,
      // also show datetime
      dataSource: [
        {
          parentId: 3,
          parentTitle: 'CV Help',
          parentComment: 'Hi everyone, do you have any tips on what to put in my CV?'
        },
        {
          parentId: 4,
          parentTitle: '32 Character Title AAAAAAAAAAAAA',
          parentComment: 'This is a really long post. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        },
        {
          parentId: 5,
          parentTitle: '32_Character_Title_AAAAAAAAAAAAA',
          parentComment: 'This is a really long post. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        },
        {
          parentId: 6,
          parentTitle: 'W'.repeat(14),
          parentComment: 'This is a really long post. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        }
      ]
    }, function () { });
  }

  render () {
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
            titleText: styles.topicText,
            subtitleText: styles.subtitleText
          }}
          data={this.state.dataSource}
          onPress={(item) => {
            this.props.navigation.navigate('TopicView', item);
          }}
          titleKey="parentTitle"
          subtitleKey="parentComment"
        />
      </View>
    );
  }
}
