import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Button, Platform, Alert, KeyboardAvoidingView, TextInput} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Calender from './Components/Calender';
import {SkypeIndicator} from 'react-native-indicators';


import CameraRollPicker from 'react-native-camera-roll-picker';
import axios from 'axios';
import Modal from "react-native-modal";


export default class homepage extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            cameraRoll: false,
            image: [],
            currentMilestone: {},
            photoSelected: false,
            imageSending: false,
            openModal: false,
            currentNote: '',
            viewNote: ''
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
        this.state.image.push(current);
            this.setState({
                photoSelected: true
            });        
    }

    sendPhoto = () =>{
       if(this.state.photoSelected)
       { 
           this.setState({
            imageSending: true
           })
        const data = new FormData();
        var Name1;

        if (Platform.OS === 'ios'){
            Name1 = this.state.image[0].filename;
        }
        else
        {
            var a = this.state.image[0].uri.split('/');
            var sending = a[a.length-1] + '.jpeg';
            Name1 = sending;
        }
        
        data.append('user', this.state.userId.email);
        data.append('milestone', this.state.currentMilestone);
        data.append('photo', {
        uri: this.state.image[0].uri,
        type: 'image/jpeg', 
        name: Name1,
        });
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                if (percentCompleted === 100){
                    this.setState({
                        cameraRoll: false,
                        photoSelected: false,
                        image: [],
                        imageSending: false
                      });
                }
            }.bind(this)
        }

        axios.post(global.url + '/api/milestonePic', data, config);
        
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
    }

    viewNotes = (x) =>{ //x is milestone id
        this.setState({
            openModal: true, 
            currentNote: x
        })

        var object = {
            id: x
        }
        
        fetch(global.url + '/api/viewNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    viewNote: responseJson.note
                });
            })
    }

    addNote = () =>{
        var payload = {
            id: this.state.currentNote,
            note: this.state.viewNote
        }
        
        fetch(global.url + '/api/editNote', {
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
            cameraRoll: false,
            image: []
        })
    }

    closeModal = () =>{
        this.setState({
            openModal: false
        });
    }
    
  render() {

    const normal =  <View style={styles.Main}>
                        <Modal isVisible={this.state.openModal}>
                            <View style={{ flex: 1 }}>
                                <View style = {{backgroundColor: 'white', height: '80%', borderRadius: 10}}>
                                <TextInput style={{height: 430, borderWidth: 0, margin: 10, backgroundColor: "#f2f09f", borderRadius: 10}}
                                    editable = {true}
                                    multiline= {true}
                                    onChangeText={(viewNote) => this.setState({viewNote})}
                                    value={this.state.viewNote}
                                />
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                                    <Button onPress={this.closeModal} title={'Cancel'} color={'red'}/>
                                    <Button onPress={this.addNote} title={'Confirm'} color={'green'}/>
                                </View>
                               
                                </View>
                            </View>
                        </Modal>
                        <ScrollView>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={40}>
                            <Header title='Calender'/>
                           
                            <Calender user={this.state.userId} add={this.addPic} viewNote={this.viewNotes}/>
                            </KeyboardAvoidingView>
                        </ScrollView>
                        <View>
                            <Navigation nav={this.props.navigation} user={this.state.userId}/>
                        </View>
                    </View>;

    const picker = <View style={styles.Main}>
                        <Header title='Calender'/>
                            <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true} assetType={'All'} selected={this.state.image}/>
                            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                                <Button onPress={this.closeCamera} title={'Cancel'} color={'red'}/>
                                <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
                            </View>
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
    backgroundColor: 'white'
    },


})



