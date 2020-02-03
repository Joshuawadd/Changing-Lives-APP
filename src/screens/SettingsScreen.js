import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
import { storeData, retrieveData } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AsyncStorage } from 'react-native';


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
      title: 'Settings',
    };
    
    render() {
      this.clearAsyncStorage = async() => {
        AsyncStorage.clear().then(()=>{
          retrieveData('authToken')
        }).then((authToken) => {
          console.log(authToken)
        });
      }

      return (
        <View style={styles.container}>
          <Text style={styles.infotext}>Settings will be shown here.</Text>
            <View style={styles.buttoncontainer}>

            <TouchableOpacity style={styles.button} onPress={this.clearAsyncStorage}>
              <Text style={styles.buttontext}>CLEAR APP STORAGE (!)</Text>
            </TouchableOpacity>
            {/*REMOVE BEFORE RELEASE*/}

          </View>
        </View>
        );
    }
}