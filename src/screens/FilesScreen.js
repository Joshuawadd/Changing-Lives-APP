import React from 'react';
import { Text, View } from 'react-native';
import { retrieveData } from '../utils';
import { Linking } from 'expo';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class FilesScreen extends React.Component {

    constructor(props) {
      super(props);
      this.sectionInfo = this.props.navigation.state.params;
    }
  
  
    static navigationOptions = ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    });
  
    render() {
  
      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>{this.sectionInfo.text}</Text>
          <ButtonList
            data={this.sectionInfo.files}
            onPress={ 
              (item) => {
                retrieveData("authToken").then((authToken) => {
                  Linking.openURL(`${API_BASEROUTE}/files/${item.path}?token=${authToken}`)
                })
  
              }
              
            }
          />
          </View>
        );
    }
  }