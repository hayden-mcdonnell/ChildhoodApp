import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';

export default class Banner extends Component {
    render() {
        return (
                <View style={{flex: 2}}> //This controlls the banners height
                <View style={styles.bg}>
                
                
                // Banner info goes here
                
                
                </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({

                                 bg:
                                 {
                                 flex: 2, //flex here also controlls banners height
                                 backgroundColor: '#005691'
                                 
                                 },
                                 


})
