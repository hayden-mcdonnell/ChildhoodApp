import React, { Component } from 'react';
import {KeyboardAvoidingView, View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

import Container from './Container';

var url = "http://192.168.0.199:3000";

export default class calender extends Component{
  constructor(props){
    super(props);

    
    
    this.state = {
       markedDates: {},
       data: [],
       selectedDate: {},
       isLoading: true,
       dateSelect: false
    }; 
} 

componentDidMount()
    {
        fetch(url + '/api/milestones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.user),
            }).then((response) => response.json())
            .then((responseJson) => {
               if(responseJson.length === 0)
               {
                this.setState({
                    isLoading: false
                });
               }
                for (i = 0; i < responseJson.length; i++)
                    {
                        var sDate = responseJson[i].startDate.split("-");
                        var eDate = responseJson[i].endDate.split("-");

                        var name = responseJson[i].milestoneName;
                        var id = responseJson[i]._id;

                        var newsDate = sDate[2] + "-" + sDate[1] + "-" + sDate[0];
                        var neweDate = eDate[2] + "-" + eDate[1] + "-" + eDate[0];

                        this.state.data.push({id: id, Name: name, Start: newsDate, End: neweDate});

                        this.state.markedDates[newsDate] = {marked: true};
                        this.state.markedDates[neweDate] = {marked: true, dotColor: 'red'};
                        
                        this.setState({
                            isLoading: false
                        });
                    }
            })
            .catch((error) => {
              console.error(error);
            });
    }

   checkDate = (x) => {
       found = false;
        for (i = 0; i < this.state.data.length; i++)
        {
           if (this.state.data[i].Start === x.dateString || this.state.data[i].End === x.dateString)
           {
                found = true;
               selected = this.state.data[i];
               this.setState({
                    selectedDate : selected,
                    dateSelect : true
               });
           }
        }

        if (found === false)
        {
            this.setState({
                selectedDate : {},
                dateSelect : false
           });
        }
    }

  render() {


    return (
        <View>
              {this.state.isLoading ? null : <Calendar monthFormat={'MMMM yyyy'} hideExtraDays={true} firstDay={1} markedDates={this.state.markedDates}  hideDayNames={true} onDayPress={(day) => {this.checkDate(day)}}/>}
              {this.state.dateSelect ? <Container name={this.state.selectedDate} add={this.props.add} /> : null}
        </View>
      
    );
  }
}