import React, { Component } from 'react';

import Login from './app/Login/Login';
import Home from './app/Home/Home';
import Calender from './app/Calender/Calender';
import History from './app/History/History';
import Add from './app/Add/Add';
import Settings from './app/Settings/Settings';
import Navigation from './app/GlobalComponents/Navigation';
global.url = "http://url:3000"; //GLOBAL URL

console.disableYellowBox = true;

import { createSwitchNavigator } from 'react-navigation';

const MainNavigation = createSwitchNavigator({
    Login: Login,
    Home: Home,
    Calender: Calender,
    History: History,
    Add: Add,
    Settings: Settings,
    Navigation: Navigation,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default class homepage extends Component{
  constructor(props){
    super(props);
    this.state = {
      hello: 0
    };

   
  }

  render() {
        return <MainNavigation />;    
  }
}