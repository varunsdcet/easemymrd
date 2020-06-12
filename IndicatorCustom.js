import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
const GLOBAL = require('./Global');
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class IndicatorCustom extends Component {

	render(){
		return(
        <View style={{flex: 1, backgroundColor:'transparent'}}>
        <UIActivityIndicator count= {10}
         size={90} color="#1976D2" />
        </View>

			)
	}

}
