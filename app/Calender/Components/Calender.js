import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class calender extends Component{
  render() {
    return (
        <Calendar monthFormat={'MMMM yyyy'} hideExtraDays={true} firstDay={1} />
    );
  }
}

const styles = StyleSheet.create({
   container: 
    {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        height: 300,
        backgroundColor: '#CDCDCD',
    }
});