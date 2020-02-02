import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import { storeData, retrieveData } from '../utils';


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
      title: 'Settings',
    };
    
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.infotext}>Settings will be shown here.</Text>
        </View>
        );
    }
}