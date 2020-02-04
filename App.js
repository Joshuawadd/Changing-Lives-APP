import React, {Component} from "react";
import Routes from "./Routes";
import * as Font from 'expo-font';
import styles from './src/styles';
import { StatusBar, Text, View, ActivityIndicator } from 'react-native';
//import Ge2003_Bd from './Ge2003-Bd.otf';
//import Geo from 
//const App = () => <Routes/>
//export default App;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { assetsLoaded: false }
    }
    

    componentDidMount(){
        Font.loadAsync({
            'Geogtq-Bd': require('./src/assets/fonts/Ge2003-Bd.ttf'),
            'Geogtq-Md': require('./src/assets/fonts/Ge2003-Md.ttf'),
            'Geogtq-SmBd': require('./src/assets/fonts/Ge2003-SmBd.ttf'),
        }).then(() =>{
            this.setState({ assetsLoaded: true });
        })
    }
    
    render() {
        const {assetsLoaded} = this.state;
        if (assetsLoaded) {
            return (
                <Routes/>
            )
        } else {
            return (
                <View style={{ flex:1 , paddingTop:StatusBar.currentHeight}}>
                    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
                    <ActivityIndicator />
                </View>
            )
        }
    }
}



/*
    

    async componentDidMount() {
        await Font.loadAsync({
            'Ge2003-Bd': Ge2003_Bd,
        });
    
        this.setState({ assetsLoaded: true });
    }*/
