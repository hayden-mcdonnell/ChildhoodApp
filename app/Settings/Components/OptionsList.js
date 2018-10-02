import React, { Component } from 'react';
import {TextInput, FlatList, StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';

import Modal from "react-native-modal";
import ImagePrinter from './MilestoneImages';

export default class Options extends Component{

  constructor(props) {
    super(props);
    this.pressed = this.pressed.bind(this);

    this.state = {
      linkClicked: '',
      openModal: false,
      currentPw: '',
      newPass: '',
      confirmnewPass: '',
      dontMatch: false,
      mileStones: []
    };
  }

  pressed(x)
  {
    this.setState({
      linkClicked: x,
      openModal: true
    });
  }

  updatePW = () => {
    current = this.state.currentPw;
    newpw = this.state.newPass;
    confirm = this.state.confirmnewPass;
    email = this.props.user.email;

    if(newpw === confirm)
    {
      this.setState({
        dontMatch: false,
        passIncorrect: false,
      });

      var payload = {email, current, newpw, confirm};
      
      fetch('http://localhost:3000/api/changepw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        }).then((responseJson) => {
          if(responseJson)
          {
            this.setState({
              passIncorrect: true
            })
          }
        });
    }
    else{
      this.setState({
        dontMatch: true
      });
    }
  }

  loadSentImages = () =>{
    fetch('http://localhost:3000/api/milestones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.user),
            }).then((response) => response.json())
            .then((responseJson) => {
              for (var i = 0; i < responseJson.length; i++){
                this.state.mileStones.push(responseJson[i].milestoneName);
              }
            })
    }
 


  closeModal = () =>{
    this.setState({ openModal: false });
  }
    
  render() {
    let content;
      if(this.state.linkClicked == 'Change Password')
      {
          
          content = <View  style={styles.popUpContainer}>
          <Text style={styles.popUpContainerText}>Please confirm your current password before entering a new password. </Text>
       <TextInput style={styles.inputContainers} secureTextEntry={true} onChangeText={(currentPw) => this.setState({currentPw})} value={this.state.currentPw} keyboardType={'email-address'} placeholder={'Current Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
       <TextInput style={styles.inputContainers} secureTextEntry={true} onChangeText={(newPass) => this.setState({newPass})} value={this.state.newPass} keyboardType={'email-address'} placeholder={'New Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
       <TextInput style={styles.inputContainers} secureTextEntry={true} onChangeText={(confirmnewPass) => this.setState({confirmnewPass})} value={this.state.confirmnewPass} keyboardType={'email-address'} placeholder={'Confirm New Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
          
          <TouchableOpacity onPress={this.updatePW}>
          <Image source={require('../../Images/Settings/changePassword.png')} />
          </TouchableOpacity>
       
          //This is how we should probably do buttons, makes x compatability easuer :)
          <View>
          <Text> </Text> //Dirty way to push x down, should probably find a better way
          </View>
          <TouchableOpacity onPress={this.closeModal}>
          <Image source={require('../../Images/Settings/No.png')} />
          </TouchableOpacity>
          
       {this.state.dontMatch ? <Text style={{color: 'red'}}> Passwords dont match. </Text> : null} 
       {this.state.passIncorrect ? <Text style={{color: 'red'}}> Current password is incorrect. </Text> : null} 
     </View>
      }

      else if (this.state.linkClicked == 'Terms')
      {
          content = <View style ={styles.popUpContainer}>
          <Text style={styles.popUpContainerText}>
          By using this application you are agreeing to allow data
          that you enter to be collected by the party supplying the application.
          Any data that is lost will not be the responsibilty of the supplying party.
          Data will not be released by the supplying company under any circumstances
          unless explicitly stated. Please contact the head researcher if you have any questions
              or concerns.
          
        </Text>
          <View>
          <Text> </Text>
          </View>
          <TouchableOpacity onPress={this.closeModal}>
          <Image source={require('../../Images/Settings/No.png')} />
          </TouchableOpacity>
         </View>
      }

      else if (this.state.linkClicked == 'Contact Us')
      {
          content = <View style={styles.popUpContainer}>
          <Text style={styles.popUpContainerText}>Contact us go here</Text>
          <View>
          <Text> </Text>
          </View>
          <TouchableOpacity onPress={this.closeModal}>
          <Image source={require('../../Images/Settings/No.png')} />
          </TouchableOpacity>
         </View>
      }

      else if (this.state.linkClicked == 'Photos Sent')
      {
          this.loadSentImages();
          content = <View style={styles.popUpContainer}>
            <ImagePrinter milestone={this.state.mileStones} user={this.props.user} />
            <TouchableOpacity onPress={this.closeModal}>
              <Image source={require('../../Images/Settings/No.png')} />
          </TouchableOpacity>
         </View>
      }

      else if (this.state.linkClicked == 'Videos Sent')
      {
          content = <View style={styles.popUpContainer}>
          <Text style={styles.popUpContainerText}>Videos go here</Text>
          <View>
          <Text> </Text>
          </View>
          <TouchableOpacity onPress={this.closeModal}>
          <Image source={require('../../Images/Settings/No.png')} />
          </TouchableOpacity>
         </View>
      }


    return (
            
            <View style={styles.container}>
            <Modal isVisible={this.state.openModal}>
              <View style={{ flex: 1 }}>
                <View style = {{backgroundColor: 'white', height: '80%'}}>
                  {content}
                </View>
              </View>
            </Modal>
            <FlatList
            data={[
                   {key: 'Change Password' },
                   {key: 'Terms'},
                   {key: 'Contact Us'},
                   {key: 'Photos Sent'},
                   {key: 'Videos Sent'}
                   ]}
            renderItem={({item}) => <TouchableOpacity onPress={() => this.pressed(item.key)}> <Text style={styles.item}>{item.key}     <Image style={styles.image} source={require('../../Images/Settings/Arrow.png')} /></Text> </TouchableOpacity>} //Image goes in after key item is rendered
            />
            </View>
    );
  }
}



const styles = StyleSheet.create({
     container:
    {
      flex: 4, // Flex here controlls how far down it sits, 4 is nice
      paddingTop: 20 // How far it sits from top of banner
    },
    
    popUpContainer:
    {
      flex: 4, // Flex here controlls how far down it sits, 4 is nice
      paddingTop: 20, // How far it sits from top of banner
      backgroundColor: '#F2F2F2',
      justifyContent: 'center'
      
    },
      
    popUpContainerText:
    {
    color: '#005691',
    fontSize: 18,
    fontWeight: '400',
    margin: 10,
    textAlign: 'center',
                                 marginBottom: 100
    },
                        
    item:
    {
      margin: 10, //Padding doesnt play nice with images
      color: '#005691',
      fontSize: 18,
      fontWeight: '800', //Changed this so it looks more like the mock ups
      height: 44,
      backgroundColor: '#CDCDCD',
    },
    inputContainers: 
    {
        height: 50, 
        width: 300,
        borderColor: '#CDCDCD',
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20,
    
    },
                                 
                                 
   
                                 
})
