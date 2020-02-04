import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import { storeData, retrieveData } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AsyncStorage } from 'react-native';


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
      title: 'Settings',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    };
    
    render() {
      this.clearAsyncStorage = async() => {
        AsyncStorage.clear()
      }

      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>Settings will be shown here.</Text>
            <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={this.clearAsyncStorage}>
              <Text style={styles.buttonText}>CLEAR APP STORAGE (!)</Text>
            </TouchableOpacity>
            {/*REMOVE BEFORE RELEASE*/}

          </View>
        </View>
        );
    }
}