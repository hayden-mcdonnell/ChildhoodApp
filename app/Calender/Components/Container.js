import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';

var url = "http://192.168.0.199:3000";

export default class container extends Component{
    constructor(props){
        super(props);
        this.state = {
            note: ''
        }
    }

    addNote = () =>{
        var payload = {
            id: this.props.name.id,
            note: this.state.note,
        }
        fetch(url + '/api/addNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            })
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.name}> {this.props.name.Name} </Text> 
            <View style={{alignItems: 'center', paddingTop: 10}}>
                <TextInput style={styles.inputContainers} onChangeText={(note) => this.setState({note})} value={this.state.note} clearTextOnFocus={true} placeholder={'Add Notes:'} placeholderTextColor={'#005691'} autoCapitalize={'sentences'}/>
                <TouchableOpacity onPress={this.addNote} style={styles.inputSubmit}> 
                    <Image source={require('../../Images/Calender/Checkbox.png')} />
                </TouchableOpacity>
                
                <View style={styles.navContainer}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.props.add(this.props.name.Name)}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.text}> Add Progress Video/Photo </Text>
                            <Image style={styles.image} source={require('../../Images/Home/Camera.png')} />
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: 
     {
         marginTop: 5,
         marginLeft: 10,
         marginRight: 10,
         backgroundColor: '#CDCDCD',
         borderRadius: 5
     },
     name:
     {
         marginTop: 5,
         marginLeft: 15,
         marginBottom: 0,
         color: '#005691',
         fontWeight: 'bold',
         fontSize: 18
     },
     date:
     {
         marginTop: 0,
         textAlign: 'center',
         color: '#005691',
         fontSize: 12
     },
     inputContainers: 
    {
        height: 50, 
        width: 300,
        borderColor: 'gray', 
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    },
    inputSubmit: 
    {
        height: 35, 
        width: 250,
        borderColor: 'gray', 
        backgroundColor: '#005691',
        borderRadius: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:
    {
        marginLeft: 15,
        color: '#004A7C',
        fontSize: 12,
    },
    image:
    {
        marginRight: 15
    },
    navContainer: 
    {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
 });