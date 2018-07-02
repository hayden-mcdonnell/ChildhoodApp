import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class header extends Component{
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{this.props.name.Name} </Text>
            <Text style={styles.date}>{this.props.name.SDate} - {this.props.name.EDate} </Text>
        </View>
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
    },
    name:
    {
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 0,
        color: '#005691',
        fontWeight: 'bold',
        fontSize: 14
    },
    date:
    {
        marginTop: 0,
        textAlign: 'center',
        color: '#005691',
        fontSize: 12
    },
});