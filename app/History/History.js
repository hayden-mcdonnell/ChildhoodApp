import React, { Component } from 'react';
import {View, FlatList} from 'react-native';

import Header from '../GlobalComponents/Header';
import Tile from './Components/Tile';
import Navigation from '../GlobalComponents/Navigation';

export default class homepage extends Component{
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            isLoading: true,
            data: []
        }
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
                data = {key: '', Name1: '', Name2: '', sDate1: '', sDate2: '', eDate1: '', eDate2: '', part2: true};

                key = 0;
                j = 0;
                for(i = 0; i < responseJson.length; i++)
                {
                    if (j === 0)
                    {
                        data.key = String(key);
                        data.Name1 = responseJson[i].milestoneName;
                        data.sDate1 = responseJson[i].startDate;
                        data.eDate1 = responseJson[i].endDate;

                        if(i === responseJson.length-1)
                        {
                            data.Name2 = null;
                            data.sDate2 = null;
                            data.eDate2 = null;
                            data.part2 = false;
                            this.state.data.push(data);
                        }

                        j++;
                    }

                    else if (j === 1)
                    {
                        data.Name2 = responseJson[i].milestoneName;
                        data.sDate2 = responseJson[i].startDate;
                        data.eDate2 = responseJson[i].endDate;

                        this.state.data.push(data);
                        data = {Name1: '', Name2: '', sDate1: '', sDate2: '', eDate1: '', eDate2: '', part2: true};
                        j = 0;
                        key++;
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

  render() {
      
    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <Header title='History'/>
            </View>
            <View style={{flex: 1, justifyContent: 'space-between', paddingTop: 30}}>
                {this.state.isLoading ? null : <FlatList data={this.state.data} renderItem={({item}) => <Tile data={item}/> }/>}
            </View>
            <Navigation nav={this.props.navigation} user={this.state.userId}/>
    </View>
    );
  }
}