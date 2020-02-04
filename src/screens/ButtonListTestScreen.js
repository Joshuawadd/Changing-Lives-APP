import React from 'react';
import { Image, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';

export default class ButtonListTestScreen extends React.Component {
  render() {
    const numButtons = 20

    return (
      <ButtonList
        style={{}}
        data={Array.from({ length: numButtons }, (x, i) => i).map(x => ({ title: "Button " + x, alert: "You pressed button " + x }))}
        onPress={(item) => alert(item.alert)}
      />
    )
  }
}