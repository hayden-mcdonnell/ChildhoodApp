import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class image extends Component{
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.tile}>
                <Text>Hello</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile: 
     {
         justifyContent: 'center',
         alignItems: 'center',
         width: 125,
         height: 125,
         backgroundColor: '#CDCDCD',
     }
 });