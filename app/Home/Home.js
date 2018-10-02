import React, { Component } from 'react';
import {ScrollView, View, FlatList, ActivityIndicator} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Container from './Components/Container';


export default class homepage extends Component{
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            dataSource: [],
            noMilestones: false,
            isLoading: true,
        };
            
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/api/milestones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.userId),
            }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length === 0){
                    this.setState({
                        noMilestones: true
                    });
                }
                else
                {
                    for (i = 0; i < responseJson.length; i++)
                    {
                        var sDate = this.getDate(responseJson[i].startDate);
                        var eDate = this.getDate(responseJson[i].endDate);
                        var key = String(i+1);
                        
                        this.state.dataSource.push({key: key, Name: responseJson[i].milestoneName, SDate: sDate, EDate: eDate,  id: responseJson[i]._id});
                    }       
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch((error) => {
              console.error(error);
            });
    }

    //Transforms date from string format into date formate. Used for progress bar
    getDate(date){
        var realDate = date.split("-");
        var newdate = new Date(parseInt(realDate[2]), parseInt(realDate[1]-1), parseInt(realDate[0]));
        return newdate;
    }

  render() {
    return (
    <View style={{flex: 1}}>
        <ScrollView>
            <Header title='Home'/>
                {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : <FlatList data={this.state.dataSource} renderItem={({item}) => <Container name={item} user={this.state.userId}/>}/>}
            <View style={{height: 30}} />
        </ScrollView>
        <View>
            <Navigation nav={this.props.navigation} user={this.state.userId}/>
        </View>
    </View>
    );
  }
}
