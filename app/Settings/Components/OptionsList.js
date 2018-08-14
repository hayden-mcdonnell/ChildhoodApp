import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, View, Text} from 'react-native';

export default class Options extends Component{
  render() {
    return (
            
            <View style={styles.container}>
            <FlatList
            data={[
                   {key: 'Devin'},
                   {key: 'Jackson'},
                   {key: 'James'},
                   {key: 'Joel'},
                   {key: 'John'},
                   {key: 'Jillian'},
                   {key: 'Jimmy'},
                   {key: 'Julie'},
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
                                 flex: 1,
                                 paddingTop: 100
                                 },
                                 item:
                                 {
                                 padding: 5,
                                 color: '#005691',
                                 fontSize: 18,
                                 height: 44,
                                 },
                                 })
