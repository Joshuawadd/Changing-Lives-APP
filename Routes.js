//https://medium.com/better-programming/react-native-navigating-between-the-screens-and-code-structure-for-beginners-6b815ee8f79
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import SectionsScreen from "./src/screens/SectionsScreen";
import FilesScreen from "./src/screens/FilesScreen";

import ForumScreen from "./src/screens/ForumScreen";
import TopicViewScreen from "./src/screens/TopicViewScreen";
import TopicCreateScreen from "./src/screens/TopicCreateScreen";

import ButtonListTestScreen from "./src/screens/ButtonListTestScreen";

const AppNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      Home: HomeScreen,
      Sections: SectionsScreen,
      Files: FilesScreen,
      Forum: ForumScreen,
      TopicView: TopicViewScreen,
      TopicCreate: TopicCreateScreen,
      Settings: SettingsScreen,
      
      ButtonListTest: ButtonListTestScreen,
    },
    {
      initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);