import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Button} from 'react-native';

import DatePicker from 'react-native-datepicker';

export default class picker extends Component{
   constructor(props){
    super(props)
    this.state = {
        user: this.props.user,
        sDate:'',
        eDate:'',
        done: false
    }
  }


  uploadData = () =>{
      var data = {user: this.state.user.email, milestone: this.props.milestone, startDate: this.state.sDate, endDate: this.state.eDate}
    
      fetch(global.url + '/api/changeTime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
      this.props.close();
}
  render() {
    return (
    <View>
        <View style={styles.dateBoxes}>
              <Text style={styles.text}> Start Date: </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.sDate}
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
                onDateChange={(date) => {this.setState({sDate: date})}}
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
            <View style={styles.button}>
        <TouchableOpacity style={styles.inputSubmit} onPress={this.uploadData}>
            <Image source={require('../../Images/Calender/Checkbox.png')} />
        </TouchableOpacity>
            <Button style={{paddingTop: 20}} onPress={() => this.props.close()} title={'Cancel'} color={'red'}/>
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
    },
    inputSubmit: 
    {
        height: 35, 
        width: 250,
        borderColor: 'gray', 
        backgroundColor: '#005691',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
                                 
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});
