import React, { Component } from 'react';
import {View} from 'react-native';


import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Image from './Components/Image';
import Fields from './Components/Fields';

export default class homepage extends Component {
    constructor(props){
        super(props);
    }
    
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
            <Header title='Add a Goal'/>
            <Image />
            <Fields />
        </View>
        <Navigation nav={this.props.navigation} />
    </View>
    );
  }
}