import React, { Component } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Fade from 'react-native-fade-in-image';
import {SkypeIndicator} from 'react-native-indicators';

var url = "http://192.168.0.199:3000";

export default class image extends Component{
    constructor(props){
        super(props);

        this.state = {
            image1: '',
            image2: '',
            image1Load: false,
            image2Load: false,
            userEmail: this.props.user.email
        }
    }

    componentDidMount(){
        var payload = {
            User: this.props.user.email,
            Milestone: this.props.data.Name1,
            Milestone2: this.props.data.Name2
        }

        fetch(url + '/api/getaMilestonePic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), 
            }).then((response) => response.json())
            .then((responseJson) => {
                var data = this.props.data;

                var data1;
                var data2;

                for (var i = 0; i < responseJson.data.length; i++){

                    if(responseJson.data[i].File !== 'noFile'){
                        if (data.Name1 === responseJson.data[i].Milestone)
                        {
                            data1 = {
                                Milestone: data.Name1,
                                File: responseJson.data[i].File
                            }
                        }
                    }
                    else{
                        data1 = {
                            Milestone: data.Name1,
                            File: 'noFile'
                        }
                    }
                    if(responseJson.data[i].File !== 'noFile'){
                        if (data.Name2 === responseJson.data[i].Milestone)
                        {
                            data2 = {
                                Milestone: data.Name2,
                                File: responseJson.data[i].File
                            }
                        }
                    }
                    else{
                        data2 = {
                            Milestone: data.Name2,
                            File: 'noFile'
                        }
                    }
                  }
                  console.log(data1);
                  console.log(data2);

                var payload = {
                    User: this.props.user.email,
                    Milestone: data1.Milestone,
                    Filename: data1.File
                }

                if (data.Name2 != null)
                {
                    var payload2 = {
                        User: this.props.user.email,
                        Milestone: data2.Milestone,
                        Filename: data2.File
                    }
                }
                
               
                fetch(url + '/api/getMilestonePicsInd', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload) 
                    }).then((response) => {
                        const fileReaderInstance = new FileReader();
                        fileReaderInstance.readAsDataURL(response._bodyBlob); 
                       
                        fileReaderInstance.onload = () => {
                            base64data = fileReaderInstance.result;
                            this.setState({
                                image1: base64data,
                                image1Load: true
                            })
                        }
                    })   

                    fetch(url + '/api/getMilestonePicsInd', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload2) 
                        }).then((response) => {
                            const fileReaderInstance = new FileReader();
                            fileReaderInstance.readAsDataURL(response._bodyBlob); 
                           
                            fileReaderInstance.onload = () => {
                                base64data = fileReaderInstance.result; 
                                this.setState({
                                    image2: base64data,
                                    image2Load: true
                                });

                            }
                        })   


            })
    }

  render() {
        
     var spinner = <SkypeIndicator />
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name1}</Text>
                        <Fade renderPlaceholderContent={spinner} placeholderStyle={{backgroundColor: '#CDCDCD'}}><Image source={{uri: this.state.image1}} style={{ height: 85, width: 85}}/></Fade>
                    <Text style={styles.otherText}>{this.props.data.sDate1} - {this.props.data.eDate1}</Text>
                </View>
            </View>
            {this.props.data.part2 ? 
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name2}</Text>
                        <Fade renderPlaceholderContent={spinner} placeholderStyle={{backgroundColor: '#CDCDCD'}}><Image source={{uri: this.state.image2}} style={{ height: 85, width: 85}}/></Fade>
                    <Text style={styles.otherText}>{this.props.data.sDate2} - {this.props.data.eDate2}</Text>
                </View>
            </View> : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    tile: 
     {
         alignItems: 'center',
         width: 125,
         height: 125,
         backgroundColor: '#CDCDCD',
         borderRadius: 5
     },
     headerText:
     {
        fontSize: 20,
        color: '#005691',
     },
     otherText:
     {
        fontSize: 8,
        color: '#005691',
     }
 });