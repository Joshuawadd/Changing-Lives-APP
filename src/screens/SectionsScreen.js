import React from 'react';
import { RefreshControl, Alert, Text, View, ActivityIndicator } from 'react-native';
import { genericGet, retrieveData, storeData } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class SectionsScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false
    };
  }

  static navigationOptions = {
    title: 'Resources',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  };

  getData () {
    retrieveData('offlineModeEnabled').then((offlineModeEnabled) => {
      if (JSON.parse(offlineModeEnabled) === true) {
        retrieveData('sectionData').then((sectionData) => {
          this.setState({
            isLoading: false,
            dataSource: JSON.parse(sectionData),
            showButtons: false
          });
        });
      } else {
        retrieveData('authToken').then((authToken) => {
          var apiSubroute = '/api/sections/list';
          var apiQuery = `?token=${authToken}`;
          genericGet(API_BASEROUTE, apiSubroute, apiQuery, true).then((response) => {
            if (response.ok) {
              storeData('sectionData', JSON.stringify(response.content));
              this.setState({
                isLoading: false,
                dataSource: response.content,
                showButtons: true
              });
            } else {
              if (response.status === 403) {
                this.props.navigation.navigate('Login');
              } else {
                Alert.alert(
                  'Error',
                  response.content,
                  [
                    {
                      text: 'Return',
                      onPress: () => { this.props.navigation.goBack(); },
                      style: 'cancel'
                    },
                    {
                      text: 'Continue offline',
                      onPress: () => {
                        storeData('offlineModeEnabled', JSON.stringify(true));
                        retrieveData('sectionData').then((sectionData) => {
                          this.setState({
                            offlineModeEnabled: true,
                            isLoading: false,
                            dataSource: JSON.parse(sectionData),
                            showButtons: false
                          }, function () { });
                        });
                      }
                    }
                  ],
                  { cancelable: false }
                );
              }
            }
          });
        });
      };
    });
  }

  componentDidMount () {
    this.getData();
  }

  _onRefresh = () => {
    this.getData(); // refresh
  }

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
            console.log(item);
            this.props.navigation.navigate('Files', { item, showButtons });
          }}
          titleKey="name"
          refreshControl={
            <RefreshControl
              // refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    );
  }
}
