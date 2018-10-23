import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, Platform, Alert} from 'react-native';

import Header from '../GlobalComponents/Header';
import Navigation from '../GlobalComponents/Navigation';
import Options from './Components/OptionsList'; //Settings option view will go in here
import Banner from './Components/Banner';
import CameraRollPicker from 'react-native-camera-roll-picker';

import axios from 'axios';

export default class homepage extends Component{
    
    constructor(props){
        super(props);

        this.child = React.createRef();
        this.state = {
            userId: this.props.navigation.getParam('UserData', 'NO-Data'),
            cameraRoll: false,
            image: [],
            imageChosen: false
        };
    }

    componentDidMount() {
        this.child.current.loadProfilePic();
    }

    cameraRollChange = () => {
        this.setState({
            cameraRoll: true
        });
    }

    closeRoll = () => {
        this.setState({
            cameraRoll: false,
            imageChosen: false
          });
    }

    getSelectedImages = (images, current) => {
        this.state.image.push(current);
        this.setState({
            imageChosen: true
        })
    }

    sendPhoto = () =>{

       if (this.state.imageChosen){
        var nameSent;
        if (Platform.OS === "ios"){
            nameSent = this.state.image[0].uri;
        }
        else if (Platform.OS === "android"){
            var a = this.state.image[0].uri.split('/');
            var sending = a[a.length-1] + '.jpeg';
            nameSent = sending;
        }

        const data = new FormData();

        data.append('user', this.state.userId.email);
        data.append('photo', {
        uri: this.state.image[0].uri,
        type: 'image/jpeg', 
        name: nameSent,
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
    
        axios.post(global.url + '/api/profilePic', data, config);
       }

       else{
        Alert.alert(
            'Error',
            'You must choose an image',
            [
              {text: 'Confirm', onPress: () =>{}},
            ],
            { cancelable: false }
          )
       }
    }
    
    render() {
        const normal = <View style={styles.Main}> 
                           <Banner camera={this.cameraRollChange} ref={this.child} user={this.state.userId}/>
                             <Options user={this.state.userId}/>
                            <Navigation nav={this.props.navigation} user={this.state.userId}/>
                        </View>;

            const picker = <View style={styles.Main}>
                               <CameraRollPicker callback={this.getSelectedImages} selectSingleItem={true} selected={this.state.image}/>
                               <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, backgroundColor: 'white'}}>
                               <Button onPress={this.closeRoll} title={'Cancel'} color={'red'}/>
                                <Button onPress={this.sendPhoto} title={'Confirm'} color={'green'}/>
                               </View>
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
