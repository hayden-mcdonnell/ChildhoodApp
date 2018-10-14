import React, { Component } from 'react';
import {ScrollView, View, FlatList, ActivityIndicator, Button, StyleSheet, Platform, TextInput} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Container from './Components/Container';

import CameraRollPicker from 'react-native-camera-roll-picker';
import axios from 'axios';
import Modal from "react-native-modal";

var url = "http://192.168.0.199:3000";


export default class homepage extends Component{
    constructor(props){ 
        super(props);

        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),  //This gets the user ID from other navigations..How a user is kept logged in
            milestoneData: [],  //Stored data regarding milestones, database queried for this info
            noMilestones: false,    //Set to true if no milestones are found for given user  
            isLoading: true,    //Used in a ternery expression when rendering
            cameraRoll: false,
            image: {},
            imageSelected: false,
            currentMilestone: '',
            viewNote: '',
            openModal: false,
            currentNote: ''
        };   
    }
    
    componentDidMount() {   //When the component or module loads... This is a lifecycle method built into react native
        var payload = { //Object send to backend consisting of the email
            email: this.state.userId.email
        }

        fetch(url + '/api/milestones', { //Fetches milestones that have been added
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', //Specifies of JSON type
            },
            body: JSON.stringify(payload),    //Sends the payload (email) of the person to find all milestones associated with that email
            }).then((response) => response.json())  //Backend sends a response to the request. Transforms it into JSON format
            .then((responseJson) => {   //With the responseJson 
                if (responseJson.length === 0){ //If there are no milestones set to true... Used to render something when milestones are empty
                    this.setState({
                        noMilestones: true
                    });
                }

                else    //Otherwise for every milestones add an object with its information to an array
                {
                    for (i = 0; i < responseJson.length; i++)
                    {
                        var sDate = this.getDate(responseJson[i].startDate);    //Formated into a date object via method below
                        var eDate = this.getDate(responseJson[i].endDate);      //Formated into a date object via method below
                        var key = String(i+1);  //Needs a unique key or warning
                        
                        this.state.milestoneData.push({key: key, Name: responseJson[i].milestoneName, SDate: sDate, EDate: eDate,  id: responseJson[i]._id});  //Pushes to milestone data array
                    }       
                }
                this.setState({ //Once everything is complete set loading to false... This is to make sure all data is loaded before information is rendered
                    isLoading: false
                });
            })
            .catch((error) => { //Catches any errors...
              console.error(error);
            });
    }

    //Transforms date from string format into date format. Used for progress bar
    getDate = (date) => { 
        var stringDate = date.split("-");
        var objectDate = new Date(parseInt(stringDate[2]), parseInt(stringDate[1]-1), parseInt(stringDate[0]));
        return objectDate;
    }

    openRoll = (x) => {
        this.setState({
            cameraRoll: true,
            currentMilestone: x
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

     getSelectedImages = (images, current) => {
        this.setState({
            image: current,
            photoSelected: true
        })
    }

    viewNotes = (x) =>{
        this.setState({
            openModal: true,
            currentNote: x
        })

        var object = {
            id: x
        }
        
        fetch(url + '/api/viewNote', {
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

    closeModal = () =>{
        this.setState({
            openModal: false
        })
    }
    closeCamera = () =>{
        this.setState({
            cameraRoll: false
        })
    }

    addNote = () =>{
        var payload = {
            id: this.state.currentNote,
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
 

  render() { 
    const normal = <View style={{flex: 1}}>
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
                            <Header title='Home'/> 
                                {this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff"/> : <FlatList data={this.state.milestoneData} renderItem={({item}) => <Container name={item} user={this.state.userId} openRoll={this.openRoll} viewNotes={this.viewNotes}/>}/>}
                                <View style={{height: 30}} /> 
                        </ScrollView>
                        <View>
                            <Navigation nav={this.props.navigation} user={this.state.userId}/> 
                        </View>
                    </View>

    const picker = <View style={styles.Main}>
                        <Header title='Home'/>
                            <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true} assetType={'All'}/>
                        <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
                        <Button onPress={this.closeCamera} title={'Cancel'} color={'red'}/>
                    </View>; 
    
    return (
    <View style={{flex: 1}}>   
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
