import React, { Component } from 'react';

import NavBar from './NavBar'

export default class homepage extends Component{
     constructor(props){
        super(props);
    }

    
    
    navigate = (data) =>
        {
            if (data === "Calender")
            {
                this.props.nav.navigate('Calender');
            }

            else if (data === "History")
            {
                this.props.nav.navigate('History');
            }

            else if (data === "Home")
            {
                 this.props.nav.navigate('Home');
            }

            else if (data === "Add")
            {
                this.props.nav.navigate('Add');
            }

            else if (data === "Settings")
            {
                 this.props.nav.navigate('Settings');
            }

        }
render() {
    return (
        <NavBar cal={this.navigate} curPage={this.props.nav}/>
    );
  }
}