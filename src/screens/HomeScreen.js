import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles';
import ButtonList from '../components/ButtonList';


export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
    }
  
    static navigationOptions = {
      title: 'Main Menu',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <ButtonList
            style = {styles.buttoncontainer}
            data = {[
              {
                title: 'Resources',
                target: 'Sections',
              },
              {
                title: 'Forum',
                target: 'Forum',
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