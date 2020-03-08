import React from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { genericGet, storeData, retrieveData } from '../utils';
import { Linking } from 'expo';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';

export default class FilesScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      refreshing: false,
      sectionId: this.props.navigation.state.params.item.id,
      sectionInfo: this.props.navigation.state.params.item,
      showButtons: this.props.navigation.state.params.showButtons
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.item.name}`,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  });

  getData () {
    this.setState({ isLoading: true });
    retrieveData('authToken').then((authToken) => {
      var apiSubroute = '/api/sections/list';
      var apiQuery = `?token=${authToken}&sectionId=${this.state.sectionId}`;
      genericGet(API_BASEROUTE, apiSubroute, apiQuery).then((response) => {
        if (response.ok) {
          this.setState({ sectionInfo: response.content[0], isLoading: false });
          if (!this.state.showButtons) {
            this.setState({ noFilesText: 'Go online to see files!' });
          } else if (this.state.sectionInfo.files.length === 0) {
            this.setState({ noFilesText: 'This section has no files.' });
          } else {
            delete this.state.noFilesText;
          }
        } else {
          this.props.navigation.goBack();
        }
      });
    });
  }

  componentDidMount () {
    this.getData();
  }

  _onRefresh = () => {
    this.getData(); // refresh
  }

  render () {
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
