import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Button, Platform, Alert, KeyboardAvoidingView} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Calender from './Components/Calender';

import CameraRollPicker from 'react-native-camera-roll-picker';
import axios from 'axios';
import Modal from "react-native-modal";

var url = "http://192.168.0.199:3000";

export default class homepage extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            cameraRoll: false,
            image: {},
            currentMilestone: {},
            openModal: false,
            viewNote: '',
            currentNote: '',
            photoSelected: false
        }; 
    }

    addPic = (x) =>
    {
        this.setState({
            cameraRoll: true,
            currentMilestone: x
        });
    }

    getSelectedImages = (images, current) => {
        this.setState({
            image: current,
            photoSelected: true
        })
    }

    sendPhoto = () =>{
       if(this.state.photoSelected)
       { 
        const data = new FormData();
        var Name1;

        if (Platform.OS === 'ios'){
            Name1 = this.state.image.filename;
        }
        else
        {
            var a = this.state.image.uri.split('/');
            var sending = a[a.length-1] + '.jpeg';
            Name1 = sending;
        }
        
        data.append('user', this.state.userId.email);
        data.append('milestone', this.state.currentMilestone);
        data.append('photo', {
        uri: this.state.image.uri,
        type: 'image/jpeg', 
        name: Name1,
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post(url + '/api/milestonePic', data, config); 
        
        this.setState({
            cameraRoll: false,
            image: {},
          });
       }
       
        else{
            Alert.alert(
                'Error',
                'You must choose an image or video',
                [
                  {text: 'Confirm', onPress: () =>{}},
                ],
                { cancelable: false }
              )
           }

           this.setState({
            image: {},
            photoSelected: false
        })
    }

    addNote = () =>{
        var payload = {
            id: this.state.currentNote.id,
            note: this.state.viewNote
        }
        
        fetch(url + '/api/editNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            })

            this.setState({
                openModal: false
            })
    }

    closeCamera = () =>{
        this.setState({
            cameraRoll: false
        })
    }

    closeModal = () =>{
        this.setState({
            openModal: false
        })
    }
    
  render() {

    const normal =  <View style={styles.Main}>
                        <ScrollView>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={40}>
                            <Header title='Calender'/>
                           
                            <Calender user={this.state.userId} add={this.addPic}/>
                            </KeyboardAvoidingView>
                        </ScrollView>
                        <View>
                            <Navigation nav={this.props.navigation} user={this.state.userId}/>
                        </View>
                    </View>;

    const picker = <View style={styles.Main}>
                        <Header title='Calender'/>
                            <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true} assetType={'All'}/>
                        <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
                        <Button onPress={this.closeModal} title={'Cancel'} color={'red'}/>
                    </View>;
    return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
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



