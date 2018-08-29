import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, Image, Button } from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Banner extends Component {
     constructor(props) {
        super(props);

      }

      openRoll = () =>{
          this.props.camera();
      }
      
    render() {
        return (
                <View style={{flex: 2}}> //This controlls the banners height
                    <View style={styles.bg}>
                    
                   
                    <Button onPress={this.openRoll} title={'Open modal'} color={'red'}/>
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
     },
    imageLocation:
    {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 50
    }


});
