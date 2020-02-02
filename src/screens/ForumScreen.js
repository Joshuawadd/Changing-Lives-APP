import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native';
import styles from '../styles';


export default class ForumScreen extends React.Component {
    static navigationOptions = {
      title: 'Forum',
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.infotext} >Topic List wil be shown here.</Text>
        </View>
        );
    }
}