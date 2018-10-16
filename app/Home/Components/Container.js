import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';   //Progress bar module
import DateDiff from 'date-diff';   //Gets difference between 2 dates
import ListItems from './ListItems';    
import CompleteListItems from './CompleteListItems';


export default class header extends Component{

    constructor(props){ 
        super(props)

        this.state = {
            progress: 0,    //Default progress set to 0
            stringSDate: this.props.name.SDate.getDate(),   //Gets information passed to it through the flatlist in ../Home.js   
            stringSMonth: this.props.name.SDate.getMonth(),
            stringEDate: this.props.name.EDate.getDate(), 
            stringEMonth: this.props.name.EDate.getMonth()
            };
    }
    

    finishProgress = (todaysDate) => //Method for the finish progress button. 
    {
        this.props.name[5] = todaysDate;    

        fetch(global.url + '/api/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.name), todaysDate
            });
             

        this.setState({    //For local update, so page doesnt have to be refreshed
            progress: 100
        });
    }

    componentDidMount() //Used for calcluating progress
    {        
        var now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());  //Todays date
        var diff = new DateDiff(this.props.name.EDate, this.props.name.SDate);  //Gets the difference between the start and end date of the milestone
        var answer = diff.days();   //Gets the difference in days
         
        var diffBetweenStartCurrent = new DateDiff(now, this.props.name.SDate); //Difference between now and the start date
        var newanswer = diffBetweenStartCurrent.days(); //In days
        
        if (now > this.props.name.EDate)    //If now is biggere than the end date progress set you 100%
        {
            var percentage = 100;
        }
        else     //Otherwise progress is set to how far through
        {
            var percentage = newanswer/answer * 100;
        }
        
        this.setState({     //Sets the state so bar can be rendered
            progress: this.state.progress += percentage
        });
        
    }

  render() {
      const barWidth = Dimensions.get('screen').width - 60; 
      
      const complete =
                    <View style={{flex:1}}>  
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}> 
                            <Text style={styles.complete}> Completed! </Text> 
                        </View>
                        <CompleteListItems openRoll={this.props.openRoll} milestone={this.props.name} viewNotes={this.props.viewNotes}/>  
                    </View>

      const notcomplete =  
                        <View style={{flex: 1}}>
                            <View style={{flex: 1, flexDirection: 'row'}}> 
                                <View style={{flex: 1}}>
                                    <Text style={styles.start}>Start</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={styles.finish}>Finish</Text>
                                </View>  
                            </View>
                            <ListItems finishPro={this.finishProgress} user={this.props.user} milestone={this.props.name} openRoll={this.props.openRoll}/> 
                        </View>;
        
    return (
        <View style={styles.container}>
            <Text style={styles.name}> {this.props.name.Name} </Text>   
            <Text style={styles.date}> {this.state.stringSDate}/{this.state.stringSMonth+1}/{this.props.name.SDate.getFullYear()} - {this.state.stringEDate}/{this.state.stringEMonth+1}/{this.props.name.EDate.getFullYear()} </Text> 
            <View style={{paddingLeft: 17}}>
                <ProgressBarAnimated width={barWidth} value={this.state.progress} backgroundColorOnComplete="#6CC644" />   
            </View>
            {this.state.progress === 100 ? complete : notcomplete}  
        </View>
    );
  }
}

const styles = StyleSheet.create({
   container: 
    {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#CDCDCD'
    },
    name:
    {
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 0,
        color: '#005691',
        fontWeight: 'bold',
        fontSize: 18
    },
    date:
    {
        marginBottom: 15,
        textAlign: 'center',
        color: '#005691',
        fontSize: 12
    },
    complete:
    {
        marginTop: 5,
        textAlign: 'center',
        color: '#005691',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 15
    },
    start:
    {
        marginTop: 5,
        textAlign: 'left',
        color: '#005691',
        fontSize: 12,
        fontWeight: 'bold',
        paddingLeft: 17
    },
    finish:
    {
        marginTop: 5,
        textAlign: 'right',
        color: '#005691',
        fontSize: 12,
        fontWeight: 'bold',
        paddingRight: 17
    }
});
