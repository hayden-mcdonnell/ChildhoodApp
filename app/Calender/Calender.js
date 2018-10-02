import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Button, Text, TextInput} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Calender from './Components/Calender';

import CameraRollPicker from 'react-native-camera-roll-picker';
import axios from 'axios';
import Modal from "react-native-modal";

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
            currentNote: ''
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
            image: current
        })
    }

    sendPhoto = () =>{
        const data = new FormData();
        
        
        data.append('user', this.state.userId.email);
        data.append('milestone', this.state.currentMilestone);
        data.append('photo', {
        uri: this.state.image.uri,
        type: 'image/jpeg', 
        name: this.state.image.filename,
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                if (percentCompleted === 100){
                    this.setState({
                     cameraRoll: false
                   });
                }
            }.bind(this)
        }
        console.log('data: ', data);
        axios.post('http://localhost:3000/api/milestonePic', data, config); 
    }

    viewNotes = (x) =>{
        this.setState({
            openModal: true,
            currentNote: x
        })

        fetch('http://localhost:3000/api/viewNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(x),
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    viewNote: responseJson.note
                });
            })
    }

    addNote = () =>{
        ;
        var payload = {
            id: this.state.currentNote.id,
            note: this.state.viewNote
        }
        
        fetch('http://localhost:3000/api/editNote', {
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

    closeModal = () =>{
        this.setState({
            openModal: false
        })
    }
    
  render() {

    const normal =  <View style={styles.Main}>
                        <Modal isVisible={this.state.openModal}>
                            <View style={{ flex: 1 }}>
                                <View style = {{backgroundColor: 'white', height: '80%'}}>
                                <TextInput
                                    style={{height: 400, borderColor: 'gray', borderWidth: 1, margin: 10}}
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
                            <Header title='Calender'/>
                            <Calender user={this.state.userId} add={this.addPic} viewNotes={this.viewNotes}/>
                        </ScrollView>
                        <View>
                            <Navigation nav={this.props.navigation} user={this.state.userId}/>
                        </View>
                    </View>;

    const picker = <View style={styles.Main}>
                        <Header title='Calender'/>
                        <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true} assetType={'All'}/>
                        <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
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



