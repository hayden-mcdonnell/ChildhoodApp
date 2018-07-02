import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, TouchableOpacity, Image} from 'react-native';

import Picker from './Picker';

export default class inputfields extends Component {
    
    showMilestones = () =>
    {
       this.setState({
        clicked: true
        });
    }

  render() {
    return (
        <View style={styles.viewContainer}> 
            <View style={styles.dateBoxes}>
                <Text style={styles.text}> Milestone: </Text>>
                <TextInput style={styles.box} />
            </View>
            <Picker />
            <TouchableOpacity style={styles.inputSubmit}> 
                <Image source={require('../../Images/Calender/Checkbox.png')} />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    viewContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainers: 
    {
        width: 300,
        borderColor: 'gray', 
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    },
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
    box:
    {
        width: 200,
        height: 40,
        backgroundColor: '#CDCDCD',
        borderRadius: 5
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
    }
});