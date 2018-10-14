import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

import Picker1 from './Picker';
import Picker2 from 'react-native-simple-picker';

export default class inputfields extends Component {
    constructor(props){
        super(props);

        this.state = {
            milestone:'',
            milestonePicker: false
        }
      }

      openMilestonePicker = () =>{
        this.refs.picker.show()
      }

  render() {
    const options = ['Crawling', 'Walking', 'Running'];
    return (
        <View style={styles.viewContainer}>
        
            <View style={styles.dateBoxes}>
                <Text style={styles.text}> Milestone: </Text>
                <TouchableOpacity style={styles.box} onPress={this.openMilestonePicker} >
                    <Text textAlign="center">{this.state.milestone}</Text>
                </TouchableOpacity>
            </View>
            <Picker1 milestone={this.state.milestone} user={this.props.user}/>
            <Picker2 ref={'picker'} options={options} cancelTextStyle={{color: 'red'}} confirmTextStyle={{color: '#005691'}} onSubmit={(option) => {this.setState({milestone: option})}}/>
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
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});