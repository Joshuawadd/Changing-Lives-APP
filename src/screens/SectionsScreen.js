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
            dataSource: JSON.parse(sectionData)
          });
          if (this.state.dataSource.length === 0) {
            this.setState({ emptyText: 'No resources uploaded yet' });
          } else {
            delete this.state.noFilesText;
          }
        });
      } else {
        var apiSubroute = '/api/sections/list';
        genericGet.apply(this, [API_BASEROUTE, apiSubroute, '', true]).then((response) => {
          if (response.ok) {
            storeData('sectionData', JSON.stringify(response.content));
            this.setState({
              isLoading: false,
              dataSource: response.content
            });
            if (this.state.dataSource.length === 0) {
              this.setState({ emptyText: 'No resources uploaded yet' });
            } else {
              delete this.state.noFilesText;
            }
          } else {
            if (response.action === 'continueOffline') {
              retrieveData('sectionData').then((sectionData) => {
                this.setState({
                  offlineModeEnabled: true,
                  isLoading: false,
                  dataSource: JSON.parse(sectionData)
                });
                if (this.state.dataSource.length === 0) {
                  this.setState({ emptyText: 'No resources uploaded yet' });
                } else {
                  delete this.state.noFilesText;
                }
              });
            }
          }
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
    if (typeof (this.state.emptyText) === 'undefined') {
      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>Select a section to view its resources.</Text>
          <ButtonList
            data={this.state.dataSource}
            onPress={(item) => {
              this.props.navigation.navigate('Files', { item });
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
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>{this.state.emptyText}</Text>
        </View>
      );
    }
  }
}
