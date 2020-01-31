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
    padding: '5%',
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
    padding: '5%',
    color: '#000',
    fontSize: 20,
    //backgroundColor: '#DEDEDE',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
  },

  infotext: {
    padding: '5%',
    color: '#000',
    fontSize: 20,
    //backgroundColor: '#DEDEDE',
    textAlign: 'center',
  },

});


//expects JSON response
function genericGet(url) {
  return fetch(url)
    .then((response) => {
      response.json()
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

function genericPost(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body,
  })
  .then((response) => {
    const contentType = response.headers.get("content-type")
    if (contentType.indexOf("application/json") === 0) { // data is JSON format 
      return response.json().then((responseJson) => {
        return responseJson
      })
    } else { // data is text format
      return response.text().then((responseText) => {
        if (response.ok) {
          return responseText
        } else {
          throw new Error ("Error: "+ responseText + " (status code " + response.status + ")")
        }
      })
    }
  }).catch((e) => {
    var errorText
    if (e.message == "Network request failed") {
      errorText = "Failed to connect to server"
      errorText += " at " + API_BASEROUTE
    } else {
      errorText = e.message
    }
    alert(errorText)
  })
}


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'CLStaff',
      password: 'admin'
    };
    global.authToken = ''
  }

  static navigationOptions = {
    title: 'User Login',
  };

  render() {
    return (
      <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.image} />
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
              let uname = this.state.username;
              let pass = this.state.password;
              let url = API_BASEROUTE + api_subroute;
              let body = 'username=' + uname + '&password=' + pass;
              //testNext();
              let postResponse = await genericPost(url, body);
              if (typeof(postResponse) !== 'undefined') {
                global.authToken = postResponse
                this.props.navigation.navigate('MainMenu');
              }
              /*console.log("xx "+ JSON.stringify( await xx))
              //alert("STOP")
              try {
                
                let response = await fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: 'username=' + uname + '&password=' + pass,
                });
                //await response;
                if (response.ok) {
                  global.authToken = await response.text();
                  this.props.navigation.navigate('MainMenu');
                } else {
                  throw new Error(response.status + " (" + await response.text() + ")");
                }
              } catch (error) {
                var errorText;
                //console.log(error.message)
                if (error.message == "Network request failed") {
                  errorText = "Failed to connect to server"
                  errorText += " at " + API_BASEROUTE
                } else {
                  errorText = error.message
                }
                //alert(errorText)
              }*/
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>

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
          <Image source={require('./assets/logo.png')} style={styles.image} />
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
            <TouchableOpacity
              onPress={ () => {
                this.props.navigation.navigate('Section', item)
                }}
              style={styles.button}
          >
            <Text style={styles.buttontext}>{item.name}</Text>
            </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item.id.toString()}
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
        <Text style={styles.infotext}> {this.sectionInfo.text} </Text>

        <FlatList
          //style={{flex:1, margin: 10}}
          data={this.sectionInfo.files}
          renderItem={({item}) => (
            <View style = {{margin: 10}}>
            <TouchableOpacity
              onPress={ () => Linking.openURL(API_BASEROUTE+"/files/"+item.path+"?token="+global.authToken) }
              style={styles.button}
          >
            <Text style={styles.buttontext}>{item.title}</Text>
          </TouchableOpacity>
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
        <Text style={styles.infotext} >Topic List wil be shown here.</Text>
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
        <Text style={styles.infotext}>Original post and child comments will be displayed here.</Text>
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
        <Text style={styles.infotext}>Settings will be shown here.</Text>
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