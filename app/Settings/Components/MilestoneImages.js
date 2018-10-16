import React, { Component } from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from 'react-native';
import Fade from 'react-native-fade-in-image';
import {SkypeIndicator} from 'react-native-indicators';

export default class container extends Component{
    constructor(props){
        super(props);
 
        this.state = {
            profilePic: '',
            profilePicLoaded: false,
            files: [],
            dataLoaded: false,
        }
    }

    componentDidMount = () =>{
        fetch(global.url + '/api/getMilestonePics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"User" : this.props.user.email}), 
            }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.data === "Empty"){
                    this.setState({
                        dataLoaded: true
                    });
                }
                else{
                    var counter = 1;
                    var object = [];
                    var fileCounter = 0;
                    for (var i = 0; i < responseJson.data.length; i++){
                        var b = responseJson.data[i].files;
                
                        for (var h = 0; h < b.length; h++){ //For every file 
                            var payload = {
                                User: this.props.user.email,
                                Milestone: responseJson.data[i].folder,
                                Filename: responseJson.data[i].files[h]
                            }
                        

                            fetch(global.url + '/api/getMilestonePicsInd', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(payload) 
                                }).then((response) => {
                                    
                                    const fileReaderInstance = new FileReader();
                                    fileReaderInstance.readAsDataURL(response._bodyBlob); 
                                
                                    fileReaderInstance.onload = () => {
                                        fileCounter++;
                                        base64data = fileReaderInstance.result; 
                                        object.push(base64data);
                                    
                                        if(responseJson.length === fileCounter)
                                        {
                                            for (var i = 0; i < object.length; i += 3) {
                                                var a = object.slice(i, i+3);
                                                this.state.files.push(a);
                                            }
                                            this.setState({
                                                dataLoaded: true
                                            });
                                        }    
                                    }
                                })
                            }
                        }

                    }
                        
                })
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }

    render() {
        var Images = <ScrollView>
        {this.state.files.map((p, i) => {
           return (
                <View>
                    <View style={{flexDirection: "row"}}>
                    <Fade>
                       <Image key={i*3-2} style={{width: 100, height: 100, margin: 5}} source={{uri: this.state.files[i][0]}}/>
                    </Fade>
                    <Fade>
                       <Image key={i*3-1} style={{width: 100, height: 100, margin: 5}} source={{uri: this.state.files[i][1]}}/>
                       </Fade>
                       <Fade>
                       <Image key={i*3} style={{width: 100, height: 100, margin: 5}} source={{uri: this.state.files[i][2]}}/>
                       </Fade>
                   </View>
                </View>
             );
       })}
       </ScrollView>


      return (
        <View style={styles.Main}>
        <Text style={styles.Text}>Photos Sent</Text>
        { this.state.dataLoaded ? Images : <SkypeIndicator color={'#005691'} size={70}/> }
        </View>
      );
    }
  }

  const styles = StyleSheet.create({

    Main:
    {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    Text:
    {
        marginTop: 15,
        fontSize: 20,
        color: '#005691',
        fontWeight: 'bold',
        fontFamily: 'System'
    }

})