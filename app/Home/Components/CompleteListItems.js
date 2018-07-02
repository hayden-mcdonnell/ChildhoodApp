import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class navBar extends Component{
    
    calenderC = (data) => {
        this.props.cal(data);
    }   
    
  render() {
    return (
    <View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> Add Notes </Text>
                    <Image style={styles.image} source={require('../../Images/Home/Add.png')} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> Add Final Video/Picture </Text>
                    <Image style={styles.image} source={require('../../Images/Home/Camera.png')} />
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