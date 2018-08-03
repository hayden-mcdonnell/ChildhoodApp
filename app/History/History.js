import React, { Component } from 'react';
import {View, FlatList} from 'react-native';

import Header from '../GlobalComponents/Header';
import Tile from './Components/Tile';
import Navigation from '../GlobalComponents/Navigation';

export default class homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [{key: '1', Name: 'Crawling', SDate: new Date(2018, 0, 1), EDate: new Date(2018, 11, 29)}, {key: '2', Name: 'Walking', SDate: new Date(2018, 3, 3), EDate: new Date(2018, 5, 27)}, {key: '3', Name: 'Walking', SDate: new Date(2018, 3, 5), EDate: new Date(2018, 6, 1)}],
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
        };
    }
    
  render() {
      
    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <Header title='History'/>
            </View>
            <FlatList data={this.state.dataSource} 
               renderItem={({item, item1}) => <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                            <Tile />
                                            <Tile />
                                       </View>}
            />
            
            <Navigation nav={this.props.navigation} user={this.state.userId}/>
    </View>
    );
  }
}