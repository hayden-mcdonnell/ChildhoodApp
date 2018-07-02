import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class header extends Component {
  render() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> {this.props.title} </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerContainer: 
    {
        marginTop: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005691',
    },
    headerText:
    {
        marginTop: 15,
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'System'
    }

});