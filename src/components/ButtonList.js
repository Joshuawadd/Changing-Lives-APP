import React from 'react';
import { View, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import styles from '../styles';
import colors from '../colors';
class Subtitle extends React.Component {
  render () {
    if (this.props.text) {
      return <Text numberOfLines={this.props.numberOfLines} style={this.props.style}>{this.props.text}</Text>;
    } else {
      return null;
    }
  }
}
class PDFButtonImage extends React.Component {
  render () {
    if (this.props.display) {
      return <Image
        source={require('../assets/pdf.png')}
        style={{ height: 30, width: 30 }} />;
    } else {
      return null;
    }
  }
}
// reusable button list component
export default class ButtonList extends React.Component {
  constructor (props) {
    super(props);
    if (typeof this.props.titleKey === 'undefined') {
      this.titleKey = 'title';
    } else {
      this.titleKey = this.props.titleKey;
    }
    if (typeof this.props.subtitleKey === 'undefined') {
      this.subtitleKey = 'subtitle';
    } else {
      this.subtitleKey = this.props.subtitleKey;
    }
    this.displayPDFIcon = this.props.displayPDFIcon;
  }

  // see https://stackoverflow.com/a/2631198 for ?. notation

  render () {
    if (typeof (this.props.style?.container) !== 'undefined') { // if container style has been specified
      if (!('width' in this.props.style.container)) { // if width has not been specified
        this.width = styles.buttonContainer.width;
        this.containerStyle = this.props.style.container;
      } else { // if width has been specified
        const { width, ...containerStyle } = this.props.style.container;
        this.width = width;
        this.containerStyle = containerStyle;
      }
    } else { // if container style has not been specified
      const { width, ...containerStyle } = styles.buttonContainer;
      this.width = width;
      this.containerStyle = containerStyle;
    }

    return (
      <FlatList
        style={{ width: this.width }}
        contentContainerStyle={[this.containerStyle, this.props.style?.container]}
        data={this.props.data}
        refreshControl={this.props.refreshControl}
        renderItem={({ item, index }) =>
          <View>
            {item.disabled === true
              ? <TouchableOpacity
                style={[styles.button, this.props.style?.button, { backgroundColor: colors.ltGrey }]}
                delayPressIn={50}
                onLongPress={() => this.props.onLongPress(item)}
                onPress={() => this.props.onPress(item)}
              >
                <Text numberOfLines={1} style={[styles.buttonText, this.props.style?.titleText]}>{item[this.titleKey]}</Text>
                <Subtitle numberOfLines={1} style={this.props.style?.subtitleText} text={item[this.subtitleKey]}></Subtitle>
              </TouchableOpacity>
              : <TouchableOpacity
                delayPressIn={50}
                style={[styles.button, this.props.style?.button]}
                onLongPress={() => this.props.onLongPress(item)}
                onPress={() => this.props.onPress(item)}
              >
                <View flexDirection='row'>
                  <PDFButtonImage display={this.displayPDFIcon}></PDFButtonImage>
                  <Text numberOfLines={1} style={[styles.buttonText, this.props.style?.titleText]}>{item[this.titleKey]}</Text>
                </View>
                <Subtitle numberOfLines={1} style={this.props.style?.subtitleText} text={item[this.subtitleKey]}></Subtitle>
              </TouchableOpacity>
            }
          </View>
        }

        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
