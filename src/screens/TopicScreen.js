import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';


export default class TopicScreen extends React.Component {
    static navigationOptions = {
      title: 'Topic',
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.infotext}>Original post and child comments will be displayed here.</Text>
        </View>
        );
    }
}