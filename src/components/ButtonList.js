import React from 'react';
import { TouchableOpacity, Text, FlatList } from 'react-native';
import styles from '../styles';

// reusable button list component
export default class ButtonList extends React.Component {
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