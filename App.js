import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, ActivityIndicator, Button, TouchableOpacity, FlatList} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { API_BASEROUTE } from 'react-native-dotenv'
import { Linking } from 'expo';

// Note: styles can be stacked by setting the style prop as an array
// e.g. style={[styles.button, styles.textinput, {width: 50%}] will apply these 3 styles in left-to-right order
const styles = StyleSheet.create({
  
  // main view, contains everything on each page:
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },

  // contains multiple buttons or button-like elements
  buttoncontainer: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    width: '80%',
    justifyContent: 'space-evenly',
  },

  // button element (also used as base for stacking text input style onto)
  button: {
    padding: '5%',
    backgroundColor: '#253D98',
    alignItems: "center",
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '5%',
  },
  
  // text inside button
  buttontext: {
    color: '#FFF',
    fontSize: 20,
  },

  // text input area (styles apply to text itself as well)
  textinput: {
    color: '#000',
    backgroundColor: '#FFF',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
  },

  // "full"-width images
  image: {
    width: '80%',
    resizeMode: 'contain',
  },

  // text information
  infotext: {
    padding: '5%',
    color: '#000',
    fontSize: 20,
    backgroundColor: '#FFF',
    textAlign: 'center',
  },

});


function genericGet(baseroute, subroute, query='') {
  const fetchArgs = {
    method: 'GET',
  }
  return genericRequest(fetchArgs, baseroute, subroute, query)
}

function genericPost(baseroute, subroute, body='') {
  const fetchArgs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body
  }
  return genericRequest(fetchArgs, baseroute, subroute)
}

function genericRequest(fetchArgs, baseroute, subroute, query='') {
  //controller is used to abort as a timeout
  let controller = new AbortController();
  const timeout = 10 //seconds
  setTimeout(() => controller.abort(), timeout*1000);
  fetchArgs.signal = controller.signal

  return fetch(baseroute + subroute + query, fetchArgs)
  .then((response) => {
    const contentType = response.headers.get("content-type")
    if (contentType.indexOf("application/json") === 0) { // data is JSON format 
      return response.json()
      .then((responseJson) => {
        return responseJson;
      })
    } else { // data is text format
      return response.text()
      .then((responseText) => {
        if (response.ok) {
          return responseText
        } else {
          throw new Error ("Error: "+ responseText + " (status code " + response.status + ")")
        }
      })
    }
  }).catch((e) => {
    //console.log(e)
    var errorText
    if ((e.message == "Network request failed") || (e.message == "Aborted")) {
      errorText = "Failed to connect to server within the time limit."
      errorText += `\nAddress: ${baseroute}`
      errorText += `\nPath: ${subroute}`
      errorText += `\nTime limit: ${timeout} seconds`
      errorText += `\nCheck the server is running at the specified address`
      errorText += `, and that your device is connected to the same network as the server`
      errorText += `.`
    } else {
      errorText = e.message
    }
    alert(errorText)
  })
}

<<<<<<< HEAD

class LoginScreen extends React.Component {
=======
// reusable button list component
class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    if (typeof this.props.titleKey === "undefined") {
      this.titleKey = "title"
    } else {
      this.titleKey = this.props.titleKey
    }
    if (typeof this.props.style === "undefined") {
      this.style = styles.buttoncontainer
    } else {
      this.style = this.props.style
    }
  }
  
  render() {
    const {width, ...containerStyle} = this.style
    return (
        <FlatList
          style = {{width: width}}
          contentContainerStyle = {[containerStyle]}
          data = {this.props.data}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={styles.button}
              onPress={() => this.props.onPress(item)}
              >
              <Text style={styles.buttontext}>{item[this.titleKey]}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    )
  }
}

>>>>>>> add_buttonlist

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      username: 'CLStaff',
      password: 'admin'
=======
      username: '',
      password: '',
>>>>>>> add_buttonlist
    };
    global.authToken = ''
  }

  static navigationOptions = {
    title: 'User Login',
  };

  render() {
    return (
      <View style={[styles.container]}>
        <Image source={require('./assets/logo.png')} style={styles.image} />
        <View style={[styles.buttoncontainer]}>
          <TextInput
            style={[styles.button, styles.textinput]}
            placeholder="Username"
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            style={[styles.button, styles.textinput]}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const api_subroute = "/api/login"
              let uname = this.state.username;
              let pass = this.state.password;
              let body = 'username=' + uname + '&password=' + pass;
              let postResponse = await genericPost(API_BASEROUTE, api_subroute, body);
              if (typeof(postResponse) !== 'undefined') {
                global.authToken = postResponse
                this.props.navigation.navigate('MainMenu');
              }
<<<<<<< HEAD
            }}
            style={styles.button}
            >
=======
            }}>
>>>>>>> add_buttonlist
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
        <ButtonList
          style = {styles.buttoncontainer}
          data = {[
            {
              title: 'Resources',
              target: 'ResourceMenu',
            },
            {
              title: 'Forum',
              target: 'ForumMenu',
            },
            {
              title: 'Settings',
              target: 'Settings',
            },
          ]}
          onPress={(item) => this.props.navigation.navigate(item.target)}
        />
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
      var api_subroute = "/api/section/list"
      var api_query = `?token=${global.authToken}`
      genericGet(API_BASEROUTE, api_subroute, api_query).then((responseJson) => {
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
      <View style={styles.container}>
        <Text style={styles.infotext}>Select a section to view its resources.</Text>
        <ButtonList
          style={styles.buttoncontainer}
          data={this.state.dataSource}
          onPress={ (item) => {
            this.props.navigation.navigate('Section', item)
          }}
          titleKey = "name"
        />
      </View>
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
      <View style={styles.container}>
        <Text style={styles.infotext}>{this.sectionInfo.text}</Text>
        <ButtonList
          data={this.sectionInfo.files}
          onPress={ (item) => Linking.openURL(API_BASEROUTE+"/files/"+item.path+"?token="+global.authToken) }
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
      <View style={styles.container}>
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
      <View style={styles.container}>
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
      <View style={styles.container}>
        <Text style={styles.infotext}>Settings will be shown here.</Text>
      </View>
    );
  }
}

class ButtonListTestScreen extends React.Component {
  render() {
    const numButtons = 20
    
    return (
      <ButtonList
        style = {{}}
        data = {Array.from({length: numButtons}, (x,i) => i).map(x => ({title: "Button "+x, alert: "You pressed button "+x}))}
        onPress = {(item) => alert(item.alert)}
      />
    )
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
    
    ButtonListTest: ButtonListTestScreen,
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