import React, { Component } from 'react';
import {View} from 'react-native';

import Header from '../GlobalComponents/Header';
import Photo from './Components/Image';
import Input from './Components/InputFields';

export default class homepage extends Component {
    constructor(props){
    super(props);
    this.state = {
        image: true
    }
}
       
    login = (user) =>   //Ran if username and password is correct.... With the user details as a parameter
    {
        this.props.navigation.navigate('Home', {UserData: user});   //Changes view passing the user as parameter
    }

    toggleImage = () => {
        this.setState({
            image: false
        })
    }

  render() {
    return (
        <View>
            <Header title='Log in to continue'/>    
            {this.state.image ? <Photo /> : <View style={{height: 100}}></View>}
             <Input login={this.login} toggleImage={this.toggleImage}/> 
        </View>
    );
  }
}
