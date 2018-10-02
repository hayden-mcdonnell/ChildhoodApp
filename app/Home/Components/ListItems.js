import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';

import Modal from "react-native-modal";
import Picker from './Picker';

export default class navBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            openModal: false
        };
            
    }

    confirm = () => {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to mark this as complete?',
            [
              {text: 'Yes', onPress: () => this.finish()},
              {text: 'No', onPress: () => console.log(), style: 'cancel'},
            ],
            { cancelable: false }
          )
    }

    finish = () =>
    {

        var today = new Date();
        
        var month = parseInt(today.getMonth()) + 1;
        var day = today.getDate();

        if (month < 10)
        {
            month = "0" + String(month);
        }

        if (day < 10)
        {
           day = "0" + String(day);
        }
       

        var fullDate = day + "-" + month + "-" + today.getFullYear();
        
        this.props.finishPro(fullDate);
    }   

    changeTime = () =>
    {
        this.setState({
            openModal: true
        });
    }

    closeModal = () =>
    {
        this.setState({
            openModal: false
        })
    }
    
  render() {
    return (
    <View>
        <Modal isVisible={this.state.openModal}>
            <View style = {{backgroundColor: 'white', height: '80%'}}>
                <Picker  user={this.props.user} milestone={this.props.milestone} close={this.closeModal} />
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
            <TouchableOpacity style={{flex: 1}} onPress={this.changeTime}>
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
    }
});