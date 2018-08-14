import React, { Component } from 'react';
import {StyleSheet, Text, View,} from 'react-native';

import Header from '../GlobalComponents/Header';
import NavBar from '../GlobalComponents/NavBar';
import Navigation from '../GlobalComponents/Navigation';
import Options from './Components/OptionsList'; //Settings option view will go in here

export default class homepage extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data')
        };
    }
    
    render() {
        
        return (
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                <Header title='Settings'/>
                </View>
                <Navigation nav={this.props.navigation} user={this.state.userId}/>
                </View>
                );
    }
}
