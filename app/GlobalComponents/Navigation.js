import React, { Component } from 'react';

import NavBar from './NavBar'

var url = '172.20.10.2';

export default class homepage extends Component{
     constructor(props){
        super(props);
    }
    
    navigate = (data) =>
        {
            if (data === "Calender")
            {
                this.props.nav.navigate('Calender', {UserData: this.props.user, URL: url});
            }

            else if (data === "History")
            {
                this.props.nav.navigate('History', {UserData: this.props.user, URL: url});
            }

            else if (data === "Home")
            {
                 this.props.nav.navigate('Home', {UserData: this.props.user, URL: url});
            }

            else if (data === "Add")
            {
                this.props.nav.navigate('Add', {UserData: this.props.user, URL: url});
            }

            else if (data === "Settings")
            {
                 this.props.nav.navigate('Settings', {UserData: this.props.user, URL: url});
            }

        }
render() {
    return (
        <NavBar cal={this.navigate} curPage={this.props.nav}/>
    );
  }
}