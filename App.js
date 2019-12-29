import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
*/

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Login</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('MainMenu')}
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
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Resources</Text>
        <Text>Resource List</Text>
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
    // sections - one expandible/collapsible section on ResourceMenu for each?
    // individual resource screens - must be dynamically created somehow
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