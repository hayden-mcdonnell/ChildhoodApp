import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';

import Modal from "react-native-modal";
import Picker from './Picker';

export default class navBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            openModal: false    //For changing time modal
        };
            
    }

    confirm = () => {   //To confirm the finishing of a goal
        Alert.alert(
            'Confirmation',
            'Are you sure you want to mark this as complete?',
            [
              {text: 'Yes', onPress: () => this.finish()},
              {text: 'No', onPress: () =>  {}, style: 'cancel'},
            ],
            { cancelable: false }
          )
    }

    finish = () =>  //If finish of goal is confirmed this is ran
    {
        var today = new Date(); 
        
        var month = parseInt(today.getMonth()) + 1; //Var month is todays month plus 1, as months start from 0 not 1
        var day = today.getDate();  //Get todays date to add as the end date

        if (month < 10) //If the month is less than 10, add a 0 so for July its "07" not just "7"
        {
            month = "0" + String(month);
        }

        if (day < 10)  //If the day is less than 10, add a 0 so for 8/10 its "08" not just "8"
        {
           day = "0" + String(day);
        }
       

        var fullDate = day + "-" + month + "-" + today.getFullYear();   //Full date as stored in database. Format dd/mm/yyyy
        
        this.props.finishPro(fullDate); //Run the fishProgress method from the Container module
    }   

    changeModel = () =>  //When changes whether the modal is opened or closed
    {
        this.setState({
            openModal: !this.state.openModal
        });
    }
    
  render() {
    return (
    <View>
        <Modal isVisible={this.state.openModal}>    
            <View style = {{backgroundColor: 'white'}}>
                <Text style={styles.headText}>Change Time</Text>
                <View style={{justifyContent: 'center', height: '70%', backgroundColor: 'white'}}>
                    <Picker user={this.props.user} milestone={this.props.milestone} close={this.changeModel} />
                </View>
            </View>
        </Modal>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}}> 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> View Example </Text>
                    <Image style={styles.image} source={require('../../Images/Home/View.png')} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={this.changeModel}> 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> Change Time </Text>
                    <Image style={styles.image} source={require('../../Images/Home/time.png')} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={this.confirm}> 
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> Mark as Complete </Text>
                    <Image style={styles.image} source={require('../../Images/Home/Complete.png')} />
                </View>
            </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    navContainer: 
    {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:
    {
        marginLeft: 15,
        textAlign: 'left',
        color: '#005691',
        fontSize: 12,
    },
    image:
    {
        marginRight: 15
    },
    headText:
    {
        marginTop: 15,
        fontSize: 20,
        color: '#005691',
        fontWeight: 'bold',
        fontFamily: 'System',
        textAlign: 'center',
    }
});