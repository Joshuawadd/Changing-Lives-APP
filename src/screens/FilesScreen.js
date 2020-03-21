import React from 'react';
import { RefreshControl, Text, View, ActivityIndicator } from 'react-native';
import { genericGet, storeData, retrieveData, resetAndNavigate } from '../utils';
import { Linking } from 'expo';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class FilesScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
      sectionId: this.props.navigation.state.params.item.id,
      sectionInfo: this.props.navigation.state.params.item
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  });

  getData () {
    retrieveData('offlineModeEnabled').then(async (offlineModeEnabled) => {
      if (JSON.parse(offlineModeEnabled) === true) {
        this.setState({ noFilesText: 'Go online to view files!', isLoading: false });
      } else {
        this.setState({ isLoading: true });
        var apiSubroute = '/api/sections/list';
        var apiQuery = `?sectionId=${this.state.sectionId}`;
        const response = await genericGet.apply(this, [API_BASEROUTE, apiSubroute, apiQuery]);
        if (response.ok) {
          this.setState({ sectionInfo: response.content[0], isLoading: false });
          if (this.state.sectionInfo.files.length === 0) {
            this.setState({ noFilesText: 'This section has no files.' });
          } else {
            delete this.state.noFilesText;
          }
        } else {
          if (response.action === 'continueOffline') {
            this.setState({ noFilesText: 'Go online to view files!', isLoading: false });
          }
        }
      }
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

    if (typeof (this.state.noFilesText) === 'undefined') {
      return (
        <View style={styles.container}>
          <Text style={styles.infoText}>{this.state.sectionInfo.text}</Text>
          <ButtonList
            displayPDFIcon={true}
            style={{
              container: styles.topicContainer,
              button: styles.fileButton,
              titleText: styles.fileButtonText,
              subtitleText: styles.subtitleText
            }}
            data={this.state.sectionInfo.files}
            onPress={
              (item) => {
                retrieveData('authToken').then((authToken) => {
                  Linking.openURL(`${API_BASEROUTE}/files/${item.path}?token=${authToken}`);
                });
              }
            }
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
          <Text style={styles.infoText}>{this.state.sectionInfo.text}</Text>
          <Text style={styles.infoText}>{this.state.noFilesText}</Text>
        </View>
      );
    }
  }
}
