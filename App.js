import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { createAppContainer, NavigationActions  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import {ToastAndroid} from 'react-native';
//import { API_BASEROUTE, TEST_STRING } from 'react-native-dotenv'
import { API_BASEROUTE } from 'react-native-dotenv'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function genericGet(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}


class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Login</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate('MainMenu')
          }}
        />
      </View>
    );
  }
}

class MainMenuScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text>Main Menu</Text>

        <Button
          title="Resources"
          onPress={() => this.props.navigation.navigate('ResourceMenu')}
        />
        <Button
          title="Forum"
          onPress={() => this.props.navigation.navigate('ForumMenu')}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

const UserButton = () => (
  <div className="container padded">
      <div className="row">
          <div className="col-6 offset-md-3">
              /*...Add your remaining JSX....*/
          </div>
      </div>
  </div>
)


class ResourceMenuScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
      var api_subroute = "/api/sections"
        genericGet(API_BASEROUTE + api_subroute).then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){});
        
      })
  }

  renderButtons() {
    return this.state.dataSource.map((item) => {
        return (
            <Button 
              title = {item.name}
              onPress={ () => {
                this.props.navigation.navigate('Section', item)
              }}
            />

        );
    });
}

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Resources - Sections</Text>
      {
        this.renderButtons()
      }
      </View>
    );
  }
}


class SectionScreen extends React.Component {
  render() {
    const sectionInfo = this.props.navigation.state.params
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{sectionInfo.name}</Text>
        <Text>{sectionInfo.text}</Text>
        <Text>{JSON.stringify(sectionInfo)}</Text>
      </View>
    );
  }
}


class ForumMenuScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Forum</Text>
        <Text>Topic List</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    MainMenu: MainMenuScreen,
    ResourceMenu: ResourceMenuScreen,
    Section: SectionScreen,
    ForumMenu: ForumMenuScreen,
    // ForumMenu will contain a list of topics 
    // each topic will have its own screen (again, dynamically created), consisting of the submitted posts and the post submission form
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}