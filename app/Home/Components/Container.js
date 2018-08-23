import React, { Component } from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import DateDiff from 'date-diff';
import ListItems from './ListItems';
import CompleteListItems from './CompleteListItems';

export default class header extends Component{
    state = {
    progress: 0,
    stringSDate: this.props.name.SDate.getDate(),
    stringSMonth: this.props.name.SDate.getMonth(),
    stringEDate: this.props.name.EDate.getDate(), 
    stringEMonth: this.props.name.EDate.getMonth()
    };

    finishProgress = (x) =>
    {
        this.props.name[5] = x;
        fetch('http://localhost:3000/api/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.name), x
            });
             

        this.setState({ 
            progress: 100
        });
    }

    componentDidMount()
    {        
        var now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
       
        var diff = new DateDiff(this.props.name.EDate, this.props.name.SDate);
        var answer = diff.days();
         
        var diffBetweenStartCurrent = new DateDiff(now, this.props.name.SDate);
        var newanswer = diffBetweenStartCurrent.days();
        
        if (now > this.props.name.EDate)
        {
            var percentage = 100;
        }
        else
        {
            var percentage = newanswer/answer * 100;
        }
        
        this.setState({ 
            progress: this.state.progress += percentage
        });
        
    }

  render() {
      const barWidth = Dimensions.get('screen').width - 60;
      
      const complete = <View style={{flex:1}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}> 
                                <Text style={styles.complete}> Completed! </Text> 
                            </View>
                        <CompleteListItems  />
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
                            <ListItems finishPro={this.finishProgress} />
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
    },
    navContainer: 
    {
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
});
