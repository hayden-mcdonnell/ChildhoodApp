import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default class navBar extends Component{ 
    
  render() {
    return (
    <View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.props.viewNotes(this.props.milestone.id)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.text}> View Notes </Text>
                    <Image style={styles.image} source={require('../../Images/Home/Add.png')} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.navContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.props.openRoll(this.props.milestone.Name)}>
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