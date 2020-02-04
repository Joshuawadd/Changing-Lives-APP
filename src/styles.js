import { StyleSheet } from 'react-native';

//custom fonts:
//'Geogtq-Bd'
//'Geogtq-Md'
//'Geogtq-SmBd'

// Note: styles can be stacked by setting the style prop as an array
// e.g. style={[styles.button, styles.textInput, {width: 50%}] will apply these 3 styles in left-to-right order
export default StyleSheet.create({
  
    // main view, contains everything on each page:
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
    },
  
    // contains multiple buttons or button-like elements
    buttonContainer: {
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

    topicContainer: {
      flexGrow: 1,
      backgroundColor: '#FFF',
      width: '100%',
      //justifyContent: 'space-evenly',
      //justifyContent: 'space-evenly',
    },

    topicButton: {
      padding: '5%',
      backgroundColor: '#253D98',
      alignItems: "flex-start",
      marginTop: '0%',
      marginBottom: '1%',
      borderRadius: 0,
    },

    topicText: {
      fontFamily: 'Geogtq-SmBd',
      fontSize: 24,
      textTransform: 'uppercase',
      color: '#EF539E',
      textAlign: 'left',
    },

    subtitleText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontFamily: 'Geogtq-Md',

    },
    
    // text inside button
    buttonText: {
      color: '#FFF',
      fontSize: 20,
      fontFamily: 'Geogtq-Md',
    },
  
    // text input area (styles apply to text itself as well)
    textInput: {
      color: '#000',
      backgroundColor: '#FFF',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'Geogtq-Md',
    },
  
    // "full"-width images
    image: {
      backgroundColor: '#FFF',
      width: '80%',
      //padding: '5%',
      margin: '5%',
      resizeMode: 'contain',
      flex: 1,
    },
  
    // text information
    infoText: {
      fontFamily: 'Geogtq-Md',
      padding: '5%',
      color: '#000',
      fontSize: 20,
      backgroundColor: '#FFF',
      textAlign: 'center',
    },

    header: {

    },

    headerTitle: {
      fontFamily: 'Geogtq-SmBd',
    },
  });
