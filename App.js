import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, ActivityIndicator, Button, TouchableOpacity, FlatList} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { API_BASEROUTE } from 'react-native-dotenv'
import { Linking } from 'expo';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  button: {
    //alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 30,
    backgroundColor: '#253D98',
    alignItems: "center",
    borderRadius: 50
  },

  buttoncontainer: {
    width: '80%',
    flex: 2,
    justifyContent: 'space-evenly',
  },

  image: {
    width: '80%',
    resizeMode: 'contain'
  },

  buttontext: {
    color: '#fff',
    fontSize: 20,
  },

  textinputcontainer: {
    width: '80%',
    flex: 2,
    justifyContent: 'space-evenly',
  },

  inputtext: {
    color: '#000',
    fontSize: 30,
    //backgroundColor: '#DEDEDE',
    borderWidth: 1,
    textAlign: 'center'
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
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.image} />
        </View>
        <View style={styles.textinputcontainer}>
          <TextInput
            style={styles.inputtext}
            placeholder="Username"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={styles.inputtext}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{
          width: '80%',
          flex: 2,
        }}>
          <TouchableOpacity
            onPress={async () => {
              const api_subroute = "/api/login"
              try {
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
                  throw new Error(response.status + " (" + await response.text() + ")");
                }
              } catch (error) {
                alert(error)
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>
          {/* <Button
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
        /> */}
        </View>
      </View>
    );
  }
}

class MainMenuScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Main Menu',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.image} />
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ResourceMenu')}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForumMenu')}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Forum</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    );
  }
}

class ResourceMenuScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  static navigationOptions = {
    title: 'Resources',
  };

  componentDidMount(){
      var api_subroute = "/api/section/list?token="+global.authToken
      genericGet(API_BASEROUTE + api_subroute).then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){});
        
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
       <FlatList
          style={{flex:1, margin: 10}}
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style = {{margin: 10}}>
            <Button
              title = {item.name}
              key = {"button_section_" + item.id}
              onPress={ () => {
                this.props.navigation.navigate('Section', item)
              }}
            />
            </View>
          )}
          />
    );
  }
}


class SectionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.sectionInfo = this.props.navigation.state.params;
  }


  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`,
  });

  render() {

    return (
      <View>
        <Text> {this.sectionInfo.text} </Text>
        <FlatList
          style={{flex:1, margin: 10}}
          data={this.sectionInfo.files}
          renderItem={({item}) => (
            <View style = {{margin: 10}}>
            <Button
              title = {item[0]}
              onPress={() => Linking.openURL(API_BASEROUTE+"/files/"+item[1]+"?token="+global.authToken)}
            />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          />
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