import React, { Component } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class image extends Component{
    constructor(props){
        super(props);

        this.state = {
            image1: '',
            image2: '',
            loadingImages: true
        }
    }

  render() {
      var temp = this.props.imageData;
      var temp1 = this.props.data;
      var img1;
      var img2;
      
      setTimeout(function(){
       console.log(temp);
        for (var i = 0; i < temp.length; i++){
            if (temp[i].folder === temp1.Name1)
            {
                this.setState({
                    image2: temp[i].file
                })
            }

            else if (temp[i].folder === temp1.Name2)
            {
                this.setState({
                    image2: temp[i].file
                })
            }
            this.setState({
                loadingImages: false
            });
          }


      }.bind(this), 100);
        
     
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name1}</Text>
                    {this.state.loadingImages ? null : <Image source={{uri: 'http://localhost:3000/'+ this.state.image1}} style={{ height: 100, width: 100}}/>}
                    <Text style={styles.otherText}>{this.props.data.sDate1} - {this.props.data.eDate1}</Text>
                </View>
            </View>
            {this.props.data.part2 ? 
            <View style={styles.container}>
                <View style={styles.tile}>
                    <Text style={styles.headerText}>{this.props.data.Name2}</Text>
                    {this.state.loadingImages ? null : <Image source={{uri: 'http://localhost:3000/' + this.state.image2}} style={{ height: 100, width: 100}}/>}
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