import React, { Component } from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default class image extends Component{
  render() {
    return (
        <View style={styles.imageLocation}>
            <Image style={styles.imageLocation} source={require('../../Images/Login/duck.png')} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    imageLocation:
    {
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
 

