import React, { Component } from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';

export default class container extends Component{
    constructor(props){
        super(props);
 
        this.state = {
            profilePic: '',
            profilePicLoaded: false,
            files: [],
            titles: [],
            dataLoaded: false
        }
    }

    componentDidMount = () =>{
        fetch('http://localhost:3000/api/getMilestonePics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"User" : this.props.user.email}), 
            }).then((response) => response.json())
            .then((responseJson) => {
                for (var i =0; i<responseJson.length; i++)
                {
                    var a = responseJson[i].folder;
                    var b = responseJson[i].files;

                    
                    for (var h = 0; h < b.length; h++){ //For every file 
                        var match = false;
                    
                        for (var j = 0; j < this.state.files.length; j++){  //Loop through currently added files
                            if ((b[h]) === this.state.files[j]) //If it exist match = true
                            {
                               match = true;
                            }
                        }
        
                        if (match === false)
                        {
                            this.state.files.push(b[h]);
                        }
                    }

                    var folder = {
                        folder: a
                    }
                    
                    this.state.titles.push(folder);
                }

                this.setState({
                    
                    dataLoaded: true
                })
            })
          
    }

    render() {
      return (
        <View style={styles.Main}>
            <FlatList
                data={this.state.files}
                numColumns={3}
                renderItem={({item}) => <View style={{margin: 5}}><Image source={{uri: 'http://localhost:3000/' + item}} style={{ height: 100, width: 100}}/> </View>}
            />
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


})