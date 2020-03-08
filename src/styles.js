import { StyleSheet } from 'react-native';
import colors from './colors';

/*
custom fonts:
'Geogtq-Bd'
'Geogtq-Md'
'Geogtq-SmBd'
*/

// Note: styles can be stacked by setting the style prop as an array
// e.g. style={[styles.button, styles.textInput, {width: 50%}] will apply these 3 styles in left-to-right order

export default StyleSheet.create({

  // main view, contains everything on each page:
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },

  // contains multiple buttons or button-shaped elements
  buttonContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'space-evenly'
    // alignItems: 'center'
  },

  // button element (also used as base for stacking text input style onto)
  button: {
    alignSelf: 'center',
    width: '80%',
    padding: '5%',
    backgroundColor: colors.blue,
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '5%'
  },

  topicContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    width: '100%'
  },

  parentTitle: {
    fontFamily: 'Geogtq-SmBd',
    fontSize: 24,
    alignSelf: 'flex-start'
  },

  topicButton: {
    width: '100%',
    padding: '5%',
    backgroundColor: colors.blue,
    alignItems: 'flex-start',
    marginTop: '0%',
    marginBottom: '1%',
    borderRadius: 0
  },

  topicButtonText: {
    fontFamily: 'Geogtq-SmBd',
    fontSize: 24,
    textTransform: 'uppercase',
    color: colors.pink,
    textAlign: 'left'
  },

  topicPostText: {
    color: colors.white,
    fontFamily: 'Geogtq-Md',
    fontSize: 16
  },

  topicPostUsername: {
    color: colors.white,
    fontFamily: 'Geogtq-SmBd',
    // fontStyle: 'italic',
    fontSize: 16
  },

  subtitleText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Geogtq-Md'

  },

  // text inside button
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'Geogtq-Md'
  },

  // text input area (styles apply to text itself as well)
  textInput: {
    color: colors.black,
    backgroundColor: colors.white,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Geogtq-Md'
  },

  // "full"-width images
  image: {
    backgroundColor: colors.white,
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
    color: colors.black,
    fontSize: 20,
    backgroundColor: colors.white,
    textAlign: 'center'
  },

  header: {

  },

  headerTitle: {
    fontFamily: 'Geogtq-SmBd'
  },

  fileButton: {
    width: '100%',
    padding: '5%',
    backgroundColor: colors.white,
    alignItems: 'flex-start',
    marginTop: '0%',
    marginBottom: '1%',
    borderRadius: 0
  },

  fileButtonText: {
    fontFamily: 'Geogtq-SmBd',
    fontSize: 20,
    textTransform: 'uppercase',
    color: colors.blue,
    textAlign: 'left'
  }
});
