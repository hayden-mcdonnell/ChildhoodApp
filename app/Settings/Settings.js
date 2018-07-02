import React, { Component } from 'react';
import {View} from 'react-native';

import Header from '../GlobalComponents/Header';
import NavBar from '../GlobalComponents/NavBar';
import Navigation from '../GlobalComponents/Navigation';

export default class homepage extends Component{
    
    constructor(props){
        super(props);
    }
    
  render() {
    return (
    <View>
        <Header title='Settings'/>
        <Navigation nav={this.props.navigation} />
    </View>
    );
  }
}