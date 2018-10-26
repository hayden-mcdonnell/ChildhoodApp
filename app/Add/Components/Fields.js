import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';

import Picker1 from './Picker';
import Picker2 from 'react-native-simple-picker';

const options = ['Rolling1', 'Rolling2', 'Sitting1', 'Sitting2', 'Sitting3', 'Creeping', 'Scooting', 'FourPointKneeling', 'Crawling', 'SupportedStanding', 'PullingUp', 'Cruising', 'StandsWithoutSupport', 'FirstSteps', 'WalkingAlone'];

export default class inputfields extends Component {
    constructor(props){
        super(props);

        this.state = {
            milestone:'',
            milestonePicker: false,
            description: '',
            milestoneChosen: false,
            mostRecent: 'nil',
            future: [],
            loaded: false
        }
      }

      componentDidMount(){
        this.setState({
            future: []
        });

        fetch(global.url + '/api/getRecentMilestone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.user),
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    mostRecent: responseJson.milestone
                });
                this.getFuture();
            });
      }

      getFuture = () => {
        if(this.state.mostRecent === ""){
            this.state.future.push({Key: '0', Name:  options[0], description: this.getDescription(options[0])});
            this.state.future.push({Key: '1', Name:  options[1], description: this.getDescription(options[1])});
            this.state.future.push({Key: '2', Name:  options[2], description: this.getDescription(options[2])});
            this.setState({
                loaded: true
            });
        }
        else{
            var i = options.indexOf(this.state.mostRecent);
            var first = i+1;
            var second = i+2;
            var third = i+3;
            if (first <= 14){
                var desc = this.getDescription(options[first]);
                this.state.future.push({Key: '0',Name: options[first], description: desc});
            }

            if (second <= 14){
                var desc = this.getDescription(options[second]);
                this.state.future.push({Key: '1',Name: options[second], description: desc});
            }

            if (third <= 14){
                var desc = this.getDescription(options[third]);
                this.state.future.push({Key: '2', Name: options[third], description: desc});
            }
            this.setState({
                loaded: true
            });
        }
      }

      openMilestonePicker = () =>{
        this.refs.picker.show()
      }

      setDesc = (x) => {
        this.setState({
            milestone: x,
            milestoneChosen: true,
            description: this.getDescription(x),
        });
      }

      getDescription = (x) => {
          if (x === "Rolling1"){
              return  "Rolls from stomach to back";
          }
          else if (x === "Rolling2"){
              return "Rolls from back to stomach";
          }
          else if (x === "Sitting1"){
             return "Sits supported by own arms";
          }
          else if (x === "Sitting2"){
              return "Sits up briefly without support of own arms";
          }
          else if (x === "Sitting3"){
              return "Sustained sitting up without support of own arms";
          }
          else if (x === "Creeping"){
              return "Pushing self around on stomach";
          }
          else if (x === "Scooting"){
              return "Crawling on one leg and dragging the other";
          }
          else if (x === "FourPointKneeling"){
              return "Gets into a crawling position on hands and knees";
          }
          else if (x === "Crawling"){
              return "Travels one metre on hands and knee";
          }
          else if (x === "SupportedStanding"){
              return "Supports whole weight when on legs and held upright";
          }
          else if (x === "PullingUp"){
              return "Pulls self up on furniture to stand";
          }
          else if (x === "Cruising"){
              return "Moves around room holding on to furniture";
          }
          else if (x === "StandsWithoutSupport"){
              return "Stands alone momentarily";
          }
          else if (x === "FirstSteps"){
              return "Moves a few short steps independently";
          }
          else if (x === "WalkingAlone"){
              return "Travels one metre walking independently";
          }
      }

  render() {
    return (
        <View style={styles.viewContainer}>
            <View style={styles.dateBoxes}>
                <Text style={styles.text}> Milestone:            </Text>
                <TouchableOpacity style={styles.box} onPress={this.openMilestonePicker} >
                    <Text textAlign="center">{this.state.milestone}</Text>
                </TouchableOpacity>
            </View>            
            <Picker1 milestone={this.state.milestone} user={this.props.user}/>
            {this.state.milestoneChosen ? <View style={{paddingTop: 20}}><Text style={{color: '#005691'}}>{this.state.milestone}: {this.state.description}</Text></View> : null}
            {this.state.loaded ?  <View style={{height: 150, paddingTop: 20, paddingLeft: 20, paddingRight: 20}}><Text style={{color:'#005691'}} >Milestones to look out for: </Text><FlatList data={this.state.future} renderItem={({item, index}) => <Text style={{color:'#005691'}}> {index+1}.  {item.Name}: {item.description} </Text>}/> </View>: null}
            <Picker2 ref={'picker'} options={options} cancelTextStyle={{color: 'red'}} confirmTextStyle={{color: '#005691'}} onSubmit={(option) => {this.setDesc(option)}}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    viewContainer:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    inputContainers: 
    {
        width: 300,
        borderColor: 'gray', 
        backgroundColor: '#CDCDCD',
        borderRadius: 50,
        textAlign: 'center',
        color: '#005691',
        marginBottom: 20
    },
    text:
    {
        color: '#005691',
    },
    dateBoxes:
    {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    box:
    {
        width: 200,
        height: 40,
        backgroundColor: '#CDCDCD',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});