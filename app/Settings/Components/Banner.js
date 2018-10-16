import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

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
          console.log(this.props.user.email);
            fetch(global.url + '/api/getProfilePic', {
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
                <View style={{height: 180}}>
                
                    <View style={styles.bg}>
                   
                        <TouchableOpacity onPress={this.openRoll} style={{borderRadius:50}}>
                            {this.state.profilePicLoaded ? <Image source={{uri: this.state.profilePic}} style={{ height: 100, width: 100, borderRadius:50}} /> : <SkypeIndicator color="#0000ff" />}
                        </TouchableOpacity>
                    
                    </View> 
                </View>
                );
    }
}

const styles = StyleSheet.create({

    bg:
    {
        flex: 1, //flex here also controlls banners height
        backgroundColor: '#005691',
        justifyContent: 'center',
        alignItems: 'center'
     }
});
