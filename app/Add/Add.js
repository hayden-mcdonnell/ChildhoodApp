import React, { Component } from 'react';
import {View} from 'react-native';


import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Image from './Components/Image';
import Fields from './Components/Fields';

export default class homepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
        };
    }
    
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
            <Header title='Add a Milestone'/>
            <Image />
            <Fields user={this.state.userId}/>
        </View>
        <Navigation nav={this.props.navigation} user={this.state.userId}/>
    </View>
    );
  }
}