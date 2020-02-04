import { StyleSheet } from 'react-native';

/*
custom fonts:
'Geogtq-Bd'
'Geogtq-Md'
'Geogtq-SmBd'
*/

// Note: styles can be stacked by setting the style prop as an array
// e.g. style={[styles.button, styles.textInput, {width: 50%}] will apply these 3 styles in left-to-right order

const white = '#FFFFFF';
const black = '#000000';
const pink = '#EF539E';
const blue = '#253D98';
const rouge = '#983794';
const purple = '#663695';
const dkGrey = '#58595B';
const mdGrey = '#808285';

export default StyleSheet.create({

  // main view, contains everything on each page:
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center'
  },

  // contains multiple buttons or button-like elements
  buttonContainer: {
    flexGrow: 1,
    backgroundColor: white,
    width: '80%',
    justifyContent: 'space-evenly'
  },

  // button element (also used as base for stacking text input style onto)
  button: {
    padding: '5%',
    backgroundColor: blue,
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '5%'
  },

  topicContainer: {
    flexGrow: 1,
    backgroundColor: white,
    width: '100%'
  },

  topicButton: {
    padding: '5%',
    backgroundColor: blue,
    alignItems: 'flex-start',
    marginTop: '0%',
    marginBottom: '1%',
    borderRadius: 0
  },

  topicText: {
    fontFamily: 'Geogtq-SmBd',
    fontSize: 24,
    textTransform: 'uppercase',
    color: pink,
    textAlign: 'left'
  },

  subtitleText: {
    fontSize: 16,
    color: white,
    fontFamily: 'Geogtq-Md'

  },

  // text inside button
  buttonText: {
    color: white,
    fontSize: 20,
    fontFamily: 'Geogtq-Md'
  },

  // text input area (styles apply to text itself as well)
  textInput: {
    color: black,
    backgroundColor: white,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Geogtq-Md'
  },

  // "full"-width images
  image: {
    backgroundColor: white,
    width: '80%',
    // padding: '5%',
    margin: '5%',
    resizeMode: 'contain',
    flex: 1
  },

  // text information
  infoText: {
    fontFamily: 'Geogtq-Md',
    padding: '5%',
    color: black,
    fontSize: 20,
    backgroundColor: white,
    textAlign: 'center'
  },

  header: {

  },

  headerTitle: {
    fontFamily: 'Geogtq-SmBd'
  }
});
