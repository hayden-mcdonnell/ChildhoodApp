import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Banner extends Component {
     constructor(props) {
        super(props);

        this.state = {
           profilePic: '',
           profilePicLoaded: false
        };
      }

      openRoll = () =>{
          this.props.camera();
      }

      loadProfilePic = () => {
          
            fetch('http://localhost:3000/api/getProfilePic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"User" : this.props.user.email}),
            }).then((response) => {
                const fileReaderInstance = new FileReader();
                fileReaderInstance.readAsDataURL(response._bodyBlob); 
                fileReaderInstance.onload = () => {
                    base64data = fileReaderInstance.result;       
                    this.setState({
                        profilePic: base64data,
                        profilePicLoaded: true
                    });      
                }
            })
      }
      
    render() {
        return (
                <View style={{flex: 2}}> //This controlls the banners height
                    <View style={styles.bg}>
                        <TouchableOpacity onPress={this.openRoll} style={{borderRadius:50}}>
                            {this.state.profilePicLoaded ? <Image source={{uri: this.state.profilePic}} style={{ height: 100, width: 100, borderRadius:50}} /> : <ActivityIndicator size="large" color="#0000ff" />}
                        </TouchableOpacity>
                    </View>
                </View>
                );
    }
}

const styles = StyleSheet.create({

    bg:
    {
        flex: 2, //flex here also controlls banners height
        backgroundColor: '#005691',
        justifyContent: 'center',
        alignItems: 'center'
     }
});
