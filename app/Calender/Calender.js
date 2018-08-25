import React, { Component } from 'react';
import {View, ScrollView, FlatList} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Calender from './Components/Calender';
import Container from './Components/Container';

export default class homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
        }; 
    }
    
  render() {
    return (
    <View style={{flex: 1}}>
        <ScrollView>
            <Header title='Calender'/>
            <Calender user={this.state.userId}/>
        </ScrollView>
        <View>
            <Navigation nav={this.props.navigation} user={this.state.userId}/>
        </View>
    </View>
    );
  }
}



