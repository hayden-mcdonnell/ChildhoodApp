import React, { Component } from 'react';
import {TextInput, FlatList, StyleSheet, View, Text, Image, TouchableOpacity, Button} from 'react-native';

import Modal from "react-native-modal";

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
      terms: false,

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

  closeModal = () =>{
    this.setState({ openModal: false });
  }
    
  render() {
    let content;
      if(this.state.linkClicked == 'Change Password')
      {
       content = <View>
       <TextInput style={styles.inputContainers} onChangeText={(currentPw) => this.setState({currentPw})} value={this.state.currentPw} keyboardType={'email-address'} placeholder={'Current Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
       <TextInput style={styles.inputContainers} onChangeText={(newPass) => this.setState({newPass})} value={this.state.newPass} keyboardType={'email-address'} placeholder={'New Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
       <TextInput style={styles.inputContainers} onChangeText={(confirmnewPass) => this.setState({confirmnewPass})} value={this.state.confirmnewPass} keyboardType={'email-address'} placeholder={'Confirm New Password'} placeholderTextColor={'#005691'} autoCapitalize={'none'} />
       <Button onPress={this.updatePW} title={'Submit'} color={'#005691'}/>
       <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
       {this.state.dontMatch ? <Text style={{color: 'red'}}> Passwords dont match. </Text> : null} 
       {this.state.passIncorrect ? <Text style={{color: 'red'}}> Current password is incorrect. </Text> : null} 
     </View>
      }

      else if (this.state.linkClicked == 'Terms')
      {
        content = <View>
        <Text>Terms go here</Text>
         <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
         </View>
      }

      else if (this.state.linkClicked == 'Contact Us')
      {
        content = <View>
        <Text>Contact us go here</Text>
         <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
         </View>
      }

      else if (this.state.linkClicked == 'Photos Sent')
      {
        content = <View>
        <Text>Photos go here</Text>
         <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
         </View>
      }

      else if (this.state.linkClicked == 'Videos Sent')
      {
        content = <View>
        <Text>Videos go here</Text>
         <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
         </View>
      }

      else if (this.state.linkClicked == 'Settings')
      {
        content = <View>
        <Text>Settings go here</Text>
         <Button onPress={this.closeModal} title={'Close'} color={'red'}/>
         </View>
      }


    return (
            
            <View style={styles.container}>
            <Modal isVisible={this.state.openModal}>
              <View style={{ flex: 1 , justifyContent: 'center'}}>
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
                   {key: 'Videos Sent'},
                   {key: 'Settings'},
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
        borderColor: 'gray', 
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    }
})
