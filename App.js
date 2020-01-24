import React from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, Button } from 'react-native';
import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

  constructor(props) {
    super(props);
    this.state = {
      username: 'abcd12',
      password: '123456'
    };
    global.authToken = ''
  }

  static navigationOptions = {
    title: 'User Login',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
        style = {{height:40}}
        placeholder = "Username"
        onChangeText={(username)=>this.setState({username})}
        value={this.state.username}
        />
        <TextInput
        style = {{height:40}}
        secureTextEntry={true}
        placeholder = "Password"
        onChangeText={(password)=>this.setState({password})}
        value={this.state.password}
        />
        <Button
          title="Login"
          onPress={async () => {
            const api_subroute = "/api/login"
            try{
              let uname = this.state.username;
              let pass = this.state.password;
              let response = await fetch(API_BASEROUTE + api_subroute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'username=' + uname + '&password=' + pass
              });
              if (response.ok) {
                global.authToken = await response.text();
                this.props.navigation.navigate('MainMenu');
              } else {
                  throw new Error(response.status + " (" + await response.text()+ ")");
              }
            }  catch(error) {
              alert(error)
          }
          }}
        />
      </View>
    );
  }
}

class MainMenuScreen extends React.Component {
  constructor(props){
    super(props);
    //alert(this.authToken)
    //this.authToken = this.props.navigation.state.params.authToken
    //alert(this.props.navigation.state.params)
    //this.state = { isLoading: true }
  }

  static navigationOptions = {
    title: 'Main Menu',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        
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
    this.state = { isLoading: true }
  }

  static navigationOptions = {
    title: 'Resources',
  };
  

  componentDidMount(){
      var api_subroute = "/api/sections?token="+global.authToken
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
      {
        this.renderButtons()
      }
      </View>
    );
  }
}


class SectionScreen extends React.Component {

  constructor(props){
    super(props);
    this.sectionInfo = this.props.navigation.state.params;
  }


  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.name}`,
  });

  render() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.sectionInfo.text}</Text>
        <Text>{JSON.stringify(this.sectionInfo)}</Text>
      </View>
    );
  }
}


class ForumMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Forum',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Topic List Here</Text>
      </View>
    );
  }
}

class TopicScreen extends React.Component {
  static navigationOptions = {
    title: 'Topic',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Original post and child comments will be displayed here</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Here</Text>
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
    Topic: TopicScreen,
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