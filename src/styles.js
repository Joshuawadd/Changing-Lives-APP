import { StyleSheet } from 'react-native';

// Note: styles can be stacked by setting the style prop as an array
// e.g. style={[styles.button, styles.textinput, {width: 50%}] will apply these 3 styles in left-to-right order
export default StyleSheet.create({
  
    // main view, contains everything on each page:
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
    },
  
    // contains multiple buttons or button-like elements
    buttoncontainer: {
      flexGrow: 1,
      backgroundColor: '#FFF',
      //backgroundColor: '#FF0',
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
    
    // text inside button
    buttontext: {
      color: '#FFF',
      fontSize: 20,
    },
  
    // text input area (styles apply to text itself as well)
    textinput: {
      color: '#000',
      backgroundColor: '#FFF',
      borderWidth: 1,
      textAlign: 'center',
      fontSize: 20,
    },
  
    // "full"-width images
    image: {
      backgroundColor: '#FFF',
      //backgroundColor: '#F00',
      width: '80%',
      //padding: '5%',
      margin: '5%',
      resizeMode: 'contain',
      flex: 1,
    },
  
    // text information
    infotext: {
      padding: '5%',
      color: '#000',
      fontSize: 20,
      backgroundColor: '#FFF',
      textAlign: 'center',
    },
  
  });
