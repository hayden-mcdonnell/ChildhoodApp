import React, { Component } from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class image extends Component{
    constructor(props){
        super(props);
    }

  render() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name1}</Text>
                    <Text style={styles.headerText}>IMAGE GOES HERE</Text>
                    <Text style={styles.otherText}>{this.props.data.sDate1} - {this.props.data.eDate1}</Text>
                </View>
            </View>
            {this.props.data.part2 ? 
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name2}</Text>
                    <Text style={styles.headerText}>IMAGE GOES HERE</Text>
                    <Text style={styles.otherText}>{this.props.data.sDate2} - {this.props.data.eDate2}</Text>
                </View>
            </View> : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    tile: 
     {
         alignItems: 'center',
         width: 125,
         height: 125,
         backgroundColor: '#CDCDCD',
         borderRadius: 5
     },
     headerText:
     {
        fontSize: 20,
        color: '#005691',
     },
     otherText:
     {
        fontSize: 8,
        color: '#005691',
     }
 });