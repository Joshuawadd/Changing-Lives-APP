import React from 'react';
import { Alert, RefreshControl, Button, Image, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { resetAndNavigate, genericGet, genericPost, retrieveData } from '../utils.js';
import { API_BASEROUTE } from 'react-native-dotenv';
import ButtonList from '../components/ButtonList';
import styles from '../styles';
import { SearchBar } from 'react-native-elements';
import colors from '../colors.js';

export default class ForumScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      search: '',
      refreshing: false,
      dataList: []
    };
  }

  updateSearch = search => {
    this.setState({ search });
    this.getData();
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Forum',
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => { navigation.navigate('TopicCreate'); }}
      >
        <Text style={{ margin: 6, marginRight: 20, fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    )
  });

  getData () {
    var apiSubroute = '/api/forums/parent/list';
    var apiQuery = `?search=${this.state.search}`;
    genericGet.apply(this, [API_BASEROUTE, apiSubroute, apiQuery]).then((response) => {
      if (response.ok) {
        this.setState({ dataList: response.content, isLoading: false });
        if (this.state.dataList.length === 0) {
          this.setState({ emptyText: 'No topics uploaded yet' });
        } else {
          delete this.state.emptyText;
        }
      } else if (response.action === 'continueOffline') {
        resetAndNavigate(['Home']);
      }
    });
  }

  componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getData();
    });
  }

  componentWillUnmount () {
    this.focusListener.remove();
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
    const { search } = this.state;
    if (typeof (this.state.emptyText) === 'undefined') {
      return (
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <SearchBar
              platform="default"
              placeholder="Search posts..."
              onChangeText={this.updateSearch}
              value={search}
              containerStyle={{ backgroundColor: colors.mdGrey }}
              inputContainerStyle={{ backgroundColor: colors.ltGrey }}
              inputStyle={{ fontFamily: 'Geogtq-Md' }}
            />
          </View>
          <Text style={[styles.infoText, {}]}>Select a post to view or make replies.</Text>
          <ButtonList
            style={{
              container: styles.topicContainer,
              button: styles.topicButton,
              titleText: styles.topicButtonText,
              subtitleText: styles.subtitleText
            }}
            data={this.state.dataList.reverse()}
            onPress={(item) => {
              this.props.navigation.navigate('TopicView', item);
            }}
            onLongPress={(item) => {
              // const isAdmin = false //placeholder
              retrieveData('userName').then((userName) => {
                retrieveData('isAdmin').then((isAdmin) => {
                  if ((JSON.parse(isAdmin) === 1) || (item.username === userName)) {
                    Alert.alert(
                      'Delete Message',
                      'Do you really want to delete this message?',
                      [
                        {
                          text: 'No',
                          onPress: () => {

                          }
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            retrieveData('authToken').then((authToken) => {
                              var apiSubroute = '/api/forums/parent/remove';
                              var body = `parentId=${item.parent_id}`;
                              genericPost(API_BASEROUTE, apiSubroute, body).then((response) => {
                                if (response.ok) { // success
                                  alert('Post successfully deleted!');
                                  this.getData();
                                }
                              });
                            });
                          }
                        }
                      ],
                      { cancelable: true }
                    );
                  }
                });
              });
            }}
            titleKey="parent_title"
            subtitleKey="parent_comment"
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
