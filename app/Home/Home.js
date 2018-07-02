import React, { Component } from 'react';
import {ScrollView, View, FlatList} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Container from './Components/Container';

export default class homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [{key: '1', Name: 'Crawling', SDate: new Date(2018, 0, 1), EDate: new Date(2018, 11, 29)}, {key: '2', Name: 'Walking', SDate: new Date(2018, 3, 3), EDate: new Date(2018, 5, 27)}, {key: '3', Name: 'Walking', SDate: new Date(2018, 3, 5), EDate: new Date(2018, 6, 1)}]
        };
    }
    
  render() {
    return (
    <View style={{flex: 1}}>
        <ScrollView>
            <Header title='Home'/>
            <FlatList  
               data={this.state.dataSource} 
               renderItem={({item}) => <Container name={item} />}
            />
            <View style={{height: 30}} />
        </ScrollView>
        <View>
            <Navigation nav={this.props.navigation} />
        </View>
    </View>
    );
  }
}
