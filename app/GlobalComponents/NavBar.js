import React, { Component } from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

export default class navBar extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            currentPage: this.props.curPage.state.routeName.toString()
        }
    }

     calenderC = (data) => {
        this.props.cal(data);
    }   

  render() {
    return (
        <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => this.calenderC('Calender')}>
                <Image style={styles.image} source={this.state.currentPage === 'Calender' ? require('../Images/NavbarLight/Calender/Calender.png'):require('../Images/NavbarNormal/Calender/Calender.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.calenderC('History')}>
                <Image style={styles.image} source={this.state.currentPage === 'History' ? require('../Images/NavbarLight/History/History.png'):require('../Images/NavbarNormal/History/History.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.calenderC('Home')}>
                <Image style={styles.image} source={this.state.currentPage === 'Home' ? require('../Images/NavbarLight/Home/Home.png'):require('../Images/NavbarNormal/Home/Home.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.calenderC('Add')}>
                <Image style={styles.image} source={this.state.currentPage === 'Add' ? require('../Images/NavbarLight/Add/Add.png'):require('../Images/NavbarNormal/Add/Add.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.calenderC('Settings')}>
                <Image style={styles.image} source={this.state.currentPage === 'Settings' ? require('../Images/NavbarLight/Settings/Settings.png'):require('../Images/NavbarNormal/Settings/Settings.png')} />
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    navContainer: 
    {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005691',
        flexDirection: 'row',
    },
    image:
    {
        marginLeft: 25,
        marginRight: 25
    }
});