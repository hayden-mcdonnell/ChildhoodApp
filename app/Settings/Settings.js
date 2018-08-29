import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Options from './Components/OptionsList'; //Settings option view will go in here
import Banner from './Components/Banner';
import CameraRollPicker from 'react-native-camera-roll-picker';


export default class homepage extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            cameraRoll: false,
            image: {}
        };
    }

    cameraRollChange = () => {
        this.setState({
            cameraRoll: true
        });
    }

    getSelectedImages = (images, current) => {
        this.setState({
            image: current
        })
        console.log(current);
    }

    sendPhoto = () =>{
        fetch('http://localhost:3000/api/profilePic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.image),
            });
        console.log(this.state.image);
    }
    
    render() {
        const normal = <View style={styles.Main}> //Flex needs to be 1 here to set menu bar to bottom
                
                        
                    
                        <Banner camera={this.cameraRollChange}/>
                        <Options user={this.state.userId}/>
                            
                            
                            <Navigation nav={this.props.navigation} user={this.state.userId}/>
                            </View>;

            const picker = <View style={styles.Main}>
                               <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true}/>
                               <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
                            </View>;



        return (
                <View style={styles.Main}>
                    <View>
                        <Header title='Settings'/>
                    </View>
                    {this.state.cameraRoll ? picker : normal}
                </View>
                );
    }
}
const styles = StyleSheet.create({

                                 Main:
                                 {flex: 1,
                                 justifyContent: 'space-between',
                                 backgroundColor: '#CDCDCD'
                                 },


})
