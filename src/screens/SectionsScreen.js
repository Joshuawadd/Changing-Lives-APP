import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { genericGet, retrieveData, storeData } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class SectionsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = { isLoading: true };
  }

  static navigationOptions = {
    title: 'Resources',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  componentDidMount () {
    retrieveData('authToken').then((authToken) => {
      var apiSubroute = '/api/sections/list';
      var apiQuery = `?token=${authToken}`;
      genericGet(API_BASEROUTE, apiSubroute, apiQuery, true).then((response) => {
        // alert(response.ok);
        if (response.ok) {
          storeData('sectionData', JSON.stringify(response.content));
          this.setState({
            isLoading: false,
            dataSource: response.content,
            showButtons: true
          }, function () { });
        } else {
          if (response.status === 403) {
            alert(response.content);
            this.props.navigation.goBack();
          } else {
            retrieveData('sectionData').then((sectionData) => {
              this.setState({
                isLoading: false,
                dataSource: JSON.parse(sectionData),
                showButtons: false
              }, function () { });
            });
          }
        }
      });
    });
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const showButtons = this.state.showButtons;
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Select a section to view its resources.</Text>
        <ButtonList
          data={this.state.dataSource}
          onPress={(item) => {
            this.props.navigation.navigate('Files', { item, showButtons });
          }}
          titleKey="name"
        />
      </View>
    );
  }
}
