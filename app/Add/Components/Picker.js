import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

import DatePicker from 'react-native-datepicker';

export default class picker extends Component{
   constructor(props){
    super(props)
    this.state = {
        sDate:'',
        eDate:''       
    }
  }
  render() {
    return (
    <View>
        <View style={styles.dateBoxes}>
              <Text style={styles.text}> Start Date: </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.sdate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2018"
                maxDate="01-01-2050"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    backgroundColor: '#CDCDCD',
                    borderWidth: 0,
                    borderRadius: 5
                  },
                    btnTextConfirm: {
                        height: 20,
                        color: '#005691'
                    },
                    btnTextCancel: {
                        height: 20,
                        color: 'red'
                    }
                }}
                onDateChange={(date) => {this.setState({sdate: date})}}
              />
        </View>

        <View style={styles.dateBoxes}>
              <Text style={styles.text}> End Date:{'\u00A0\u00A0'} </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.eDate}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2018"
                maxDate="01-01-2050"
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    backgroundColor: '#CDCDCD',
                    borderWidth: 0,
                    borderRadius: 5
                  },
                    btnTextConfirm: {
                        height: 20,
                        color: '#005691'
                    },
                    btnTextCancel: {
                        height: 20,
                        color: 'red'
                    }
                }}
                onDateChange={(date) => {this.setState({eDate: date})}}
              />
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    text:
    {
        color: '#005691',
    },
    dateBoxes:
    {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});
