import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, View, Text, Image} from 'react-native';

export default class Options extends Component{
  render() {
    return (
            
            <View style={styles.container}>
            <FlatList
            data={[
                   {key: 'Change Password' },
                   {key: 'Terms'},
                   {key: 'Contact Us'},
                   {key: 'Photos Sent'},
                   {key: 'Videos Sent'},
                   {key: 'Settings'},
                   ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}     <Image style={styles.image} source={require('../../Images/Settings/Arrow.png')} /></Text>} //Image goes in after key item is rendered
            />
            </View>
    );
  }
}



const styles = StyleSheet.create({
                                 
                                 container:
                                 {
                                 flex: 4, // Flex here controlls how far down it sits, 4 is nice
                                 paddingTop: 20 // How far it sits from top of banner
                                 },
                                 item:
                                 {
                                 margin: 10, //Padding doesnt play nice with images
                                 color: '#005691',
                                 fontSize: 18,
                                 fontWeight: '800', //Changed this so it looks more like the mock ups
                                 height: 44,
                                 backgroundColor: '#CDCDCD',
                                 },
                                 
                                 image:
                                 {
                                 
                                 },
            })
