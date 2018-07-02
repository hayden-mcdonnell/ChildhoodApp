import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, Button} from 'react-native';

export default class inputfields extends Component{
    
    constructor(props) 
    {
        super(props);
        this.state = 
        { 
                email: '',
                password: ''
        };
    }
    
    authenticate = () => {
        this.props.login(); 
}
        
  render() {
    return (
        <View style={styles.viewContainer}>
            <TextInput style={styles.inputContainers} onChangeText={(email) => this.setState({email})} value={this.state.email} clearTextOnFocus={true} keyboardType={'email-address'} placeholder={'Email'} placeholderTextColor={'#005691'} autoCapitalize={'none'}/>

            <TextInput style={styles.inputContainers} onChangeText={(password) => this.setState({password})} value={this.state.password} clearTextOnFocus={true} keyboardType={'email-address'} placeholder={'Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />

            <Text style={{color: '#005691', marginBottom: 20}}> Forgot your password? </Text>

            <Button onPress={this.authenticate} title={'Submit'} color={'#005691'}/>    
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
        height: 50, 
        width: 300,
        borderColor: 'gray', 
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    }
});