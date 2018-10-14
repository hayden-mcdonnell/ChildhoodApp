import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

var url = "http://192.168.0.199:3000";

export default class inputfields extends Component{
    
    constructor(props) 
    {
        super(props);
        this.state = { 
            email: 'hayden.mcdonnell@gmail.com',
            password: 'dab',   
            error: false,   
            loading: false,
        };
    }
    
    authenticate = () => {
        this.setState({ 
            loading: true
        });

        var email = this.state.email;   
        var passWord = this.state.password;
        
        var payload = {email, passWord}; 
        
        fetch(url + '/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  
        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.Confirmation == "Success")  
            {
                this.setState({
                    loading: false 
                });
                this.props.login(responseJson.Data);  
            }
            else   
            {
                this.setState({
                    error: true,
                    loading: false
                });
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }

        
  render() {
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40} style={styles.viewContainer}>
        {this.state.loading ? <SkypeIndicator /> : null}
        {this.state.error ? <Text>Error</Text> : null}
            <TextInput style={styles.inputContainers} onChangeText={(email) => this.setState({email})} value={this.state.email} keyboardType={'email-address'} placeholder={'Email'} placeholderTextColor={'#005691'} autoCapitalize={'none'} onFocus={this.props.toggleImage}/> 
            <TextInput style={styles.inputContainers}  secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder={'Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} onFocus={this.props.toggleImage}/>
            <TouchableOpacity>  
                <Text style={{color: '#005691', marginBottom: 20}}> Forgot your password? </Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={this.authenticate}>
                <Image source={require('../../Images/Login/Continue.png')} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
