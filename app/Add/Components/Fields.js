import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

import Picker from './Picker';

export default class inputfields extends Component {
    constructor(props){
        super(props);

        this.state = {
            milestone:''
        }
      }

  render() {
    return (
        <View style={styles.viewContainer}> 
            <View style={styles.dateBoxes}>
                <Text style={styles.text} > Milestone: </Text>>
                <TextInput style={styles.box} onChangeText={(milestone) => this.setState({milestone})} value={this.state.milestone}/>
            </View>
            <Picker milestone={this.state.milestone} user={this.props.user}/>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    viewContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainers: 
    {
        width: 300,
        borderColor: 'gray', 
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    },
    text:
    {
        color: '#005691',
    },
    dateBoxes:
    {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    box:
    {
        width: 200,
        height: 40,
        backgroundColor: '#CDCDCD',
        borderRadius: 5
    }
});