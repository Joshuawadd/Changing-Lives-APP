import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import {ToastAndroid} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//const api_baseroute = 'http://192.168.1.66:8090'
const api_baseroute = 'http://facebook.github.io/react-native/'


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
  //Toast.show('This is a toast.');
  //Toast.show('This is a long toast.', Toast.LONG);
  render() {
    //ToastAndroid.show('testttt', ToastAndroid.SHORT)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Login</Text>
        <Button
          title="Login"
          //onPress={() => this.props.navigation.navigate('MainMenu')}
          onPress={() => {
            //alert('You tapped the button!'+ 4);
            //ToastAndroid.show('Test Toast', ToastAndroid.SHORT)
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


class ResourceMenuScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
      //api_subroute = '/list'
      api_subroute = '/movies.json'
      genericGet(api_baseroute + api_subroute).then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }/*, function(){}*/);
      })
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
      <View style={{flex: 1, paddingTop:20}}>
        <Text>{JSON.stringify(this.state.dataSource)}</Text>
        {/*
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
        */}
      </View>
    );
  }
}

//GET LIST OF SECTIONS, THEN ADD THOSE SECTIONS TO THE PAGE
//GET LIST OF

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
    // sections - one expandible/collapsible section on ResourceMenu for each?
    // individual resource screens - must be dynamically created somehow
    ForumMenu: ForumMenuScreen,
    // ForumMenu will contain a list of topics 
    // each topic will have its own screen (again, dynamically created), consisting of the submitted posts and the post submission form
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'MainMenu'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}