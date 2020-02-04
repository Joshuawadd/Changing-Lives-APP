import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../styles';
import { FlatList } from 'react-native-gesture-handler';

const roles = StyleSheet.create({
  creator: {
    backgroundColor: '#0F0',
  },
  staff: {
    backgroundColor: '#00F',
  },
  other: {
    backgroundColor: '#F00',
  },
})

export default class TopicViewScreen extends React.Component { 
  constructor(props) {
    super(props);
    this.topicInfo = this.props.navigation.state.params;
    this.topicInfo.children = [
      {
        parentId: 3,
        childId: 5,
        childComment: "Have you considered doing this?",
        childDateTime: "3AM",
        childRole: "creator"
      },
      {
        parentId: 3,
        childId: 7,
        childComment: "Yes I have",
        childDateTime: "4AM",
        childRole: "other"
      },
      {
        parentId: 3,
        childId: 10,
        childComment: "How about this?",
        childDateTime: "3AM",
        childRole: "staff"
      },
    ]
  }

  static navigationOptions = {
      title: 'View Topic',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    };

    render() {
      return (
        <View style={styles.container}>
          <Text>{this.topicInfo.parentTitle}</Text>
          <Text>{this.topicInfo.parentDateTime}</Text>
          <Text>{this.topicInfo.parentComment}</Text>
          <FlatList
            data = {this.topicInfo.children}
            renderItem={({item}) => (
              <View style={roles[item.childRole]}>
                <Text>{item.childComment}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        );
    }
}