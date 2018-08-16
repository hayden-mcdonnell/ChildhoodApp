import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, View, Text} from 'react-native';

export default class Options extends Component{
  render() {
    return (
            
            <View style={styles.container}>
            <FlatList
            data={[
                   {key: 'Change Password'},
                   {key: 'Terms'},
                   {key: 'Contact Us'},
                   {key: 'Photos Sent'},
                   {key: 'Videos Sent'},
                   {key: 'Settings'},
                   ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
                                 padding: 30,
                                 color: '#005691',
                                 fontSize: 18,
                                 fontWeight: 'bold',
                                 height: 44,
                                 backgroundColor: '#CDCDCD',
                                 },
            })
