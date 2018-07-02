import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class navBar extends Component{
    
    finish = () =>
    {
        this.props.finishPro();
    }   

    changeTime = () =>
    {
        alert('Update time in database and refresh')
    }
    
  render() {
    return (
    <View>
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
            <TouchableOpacity style={{flex: 1}} onPress={this.finish}>
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