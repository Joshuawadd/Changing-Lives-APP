import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../styles';
import colors from '../colors';
import { FlatList } from 'react-native-gesture-handler';

/* eslint-disable react-native/no-unused-styles */
const roles = StyleSheet.create({
  creator: {
    backgroundColor: colors.rouge
  },
  staff: {
    backgroundColor: colors.pink
  },
  user: {
    backgroundColor: colors.blue
  },
  staffcreator: {
    backgroundColor: colors.purple
  }
});
/* eslint-enable react-native/no-unused-styles */

export default class TopicViewScreen extends React.Component {
  constructor (props) {
    super(props);
    this.topicInfo = this.props.navigation.state.params;
  }

  static navigationOptions = {
    title: 'View Topic',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.parentTitle}>{this.topicInfo.parent.parent_title}</Text>

        <Text>{this.topicInfo.parent.parent_comment}</Text>
        <FlatList
          data={this.topicInfo.children}
          renderItem={({ item }) => (
            <View style={roles[item.childRole]}>
              <Text>{item.child_comment}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
