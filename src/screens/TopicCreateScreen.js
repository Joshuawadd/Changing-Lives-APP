import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from '../styles';
import { FlatList } from 'react-native-gesture-handler';


export default class TopicCreateScreen extends React.Component { 
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
      title: 'Create Topic',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    };

    render() {
      return (
        <View style={styles.container}>
          <Text>Make topic</Text>
        </View>
        );
    }
}