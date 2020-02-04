import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { genericGet } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';
import { retrieveData } from '../utils';

export default class SectionsScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = { isLoading: true }
    }
  
    static navigationOptions = {
      title: 'Resources',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    };
  
    componentDidMount(){
        retrieveData('authToken').then((authToken) => {
        var api_subroute = "/api/sections/list"
        var api_query = `?token=${authToken}`
        genericGet(API_BASEROUTE, api_subroute, api_query).then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function(){});
        })
      })
    }
  
    render(){
  
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        )
      }
  
      return(
        <View style={styles.container}>
          <Text style={styles.infoText}>Select a section to view its resources.</Text>
          <ButtonList
            style={styles.buttonContainer}
            data={this.state.dataSource}
            onPress={ (item) => {
              this.props.navigation.navigate('Files', item)
            }}
            titleKey = "name"
          />
        </View>
      );
    }
  }