import React, { Component } from 'react';
import {View} from 'react-native';

import Header from '../GlobalComponents/Header';
import Photo from './Components/Image';
import Input from './Components/InputFields';

export default class homepage extends Component {
    constructor(props){
    super(props);
}
       
    login = () =>
    {
        this.props.navigation.navigate('Home');
    }

  render() {
    return (
        <View>
            <Header title='Log in to continue'/>
            <Photo />
            <Input login={this.login}/>
        </View>
    );
  }
}
