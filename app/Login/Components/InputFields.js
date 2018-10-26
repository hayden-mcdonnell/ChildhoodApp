import React, { Component } from 'react';
import {StyleSheet, TextInput, Text, KeyboardAvoidingView, TouchableOpacity, Image, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

export default class inputfields extends Component{
    
    constructor(props) 
    {
        super(props);
        this.state = { 
            email: '',
            password: '',   
            error: false,   
            loading: false,
            showPassword: true
        };
    }
    
    authenticate = () => {
        if (this.state.showPassword)
        {
            if(this.state.email === '' || this.state.password === ''){
                this.setState({
                    error: true
                });
            }
            else{
                this.setState({ 
                    loading: true
                });
        
                var email = this.state.email;   
                var passWord = this.state.password;
                
                var payload = {email, passWord}; 
                
                fetch(global.url + '/api/users', {
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
        }

        else{
            var payload = {
                email: this.state.email
            }
            fetch(global.url + '/api/reqPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),  
                })

            this.setState({
                showPassword: true
            })
            alert("Email has been sent requesting new password. Please wait for contact");
        }
        
    }

    forgotPW = () =>
    {
        this.setState({
            showPassword: false
        })
    }

    return = () =>{
        this.setState({
            showPassword: true
        })
    }

        
  render() {
    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40} style={styles.viewContainer}>
        {this.state.loading ? <SkypeIndicator color={"#005691"}/> : null}
        {this.state.error ? <Text style={{color: 'red'}}>Invalid username and password. Please try again.</Text> : null}
        <View style={{paddingTop: 20, justifyContent: "center", alignItems: 'center'}}>
            <TextInput style={styles.inputContainers} onChangeText={(email) => this.setState({email})} value={this.state.email} keyboardType={'email-address'} placeholder={'Email'} placeholderTextColor={'#005691'} autoCapitalize={'none'} onFocus={this.props.toggleImage}/> 
            {this.state.showPassword ? <TextInput style={styles.inputContainers}  secureTextEntry={true} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder={'Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} onFocus={this.props.toggleImage}/> : null}
            {this.state.showPassword ? <TouchableOpacity onPress={() => this.forgotPW()}>  
                <Text style={{color: '#005691', marginBottom: 20}}> Forgot your password? </Text>
            </TouchableOpacity> : null}
            <TouchableOpacity onPress={this.authenticate}>
                <Image source={require('../../Images/Login/Continue.png')} />
            </TouchableOpacity>
            {this.state.showPassword ? null :<TouchableOpacity onPress={this.return} style={{paddingTop: 20}}>
                <Text style={{color: 'red'}}>Go back</Text> 
            </TouchableOpacity>}
            </View>
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
        marginBottom: 20,
    }
});
