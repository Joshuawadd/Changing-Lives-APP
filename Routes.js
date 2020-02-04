import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//all screens must be imported here:
import Home from "./src/screens/HomeScreen";
import Login from "./src/screens/LoginScreen";
import Settings from "./src/screens/SettingsScreen";
import Sections from "./src/screens/SectionsScreen";
import Files from "./src/screens/FilesScreen";
import Forum from "./src/screens/ForumScreen";
import TopicView from "./src/screens/TopicViewScreen";
import TopicCreate from "./src/screens/TopicCreateScreen";

//test screen:
//import ButtonListTest from "./src/screens/ButtonListTestScreen";

const AppNavigator = createStackNavigator(
  {
    Login,
    Home,
    Sections,
    Files,
    Forum,
    TopicView,
    TopicCreate,
    Settings,

    //ButtonListTest,
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);