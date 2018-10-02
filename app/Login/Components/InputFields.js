import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Text, Button, TouchableOpacity, Image} from 'react-native';


export default class inputfields extends Component{
    
    constructor(props) 
    {
        super(props);
        this.state = 
        { 
            email: 'nathanielsmith1230@gmail.com',
            password: 'yes',
            error: false,
            loading: false
        };
    }
    
    authenticate = () => {
        var userName = this.state.email;
        var passWord = this.state.password;

        var payload = {userName, passWord};
        
       
        fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.Confirmation == "Success")
          {
              this.props.login(responseJson.Data);
            }
          else{
            this.setState({
                error: true
                });
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }


        
  render() {
    return (
        <View style={styles.viewContainer}>
            {this.state.error ? <Text style={{color: 'red'}}> Invalid username or password </Text> : null}  

            <TextInput style={styles.inputContainers} onChangeText={(email) => this.setState({email})} value={this.state.email} keyboardType={'email-address'} placeholder={'Email'} placeholderTextColor={'#005691'} autoCapitalize={'none'}/>

            <TextInput style={styles.inputContainers}  secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} keyboardType={'email-address'} placeholder={'Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />

            <Text style={{color: '#005691', marginBottom: 20}}> Forgot your password? </Text>

            <TouchableOpacity onPress={this.authenticate}>
            <Image source={require('../../Images/Login/Continue.png')} />
            </TouchableOpacity>
            
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
