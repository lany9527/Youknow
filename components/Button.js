import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
  render () {
    return (
      <TouchableOpacity
        underlayColor={this.props.underlayColor}
        activeOpacity={0.5}
        style={this.props.style}
        onPress={this.props.onPress}   >
          <Text style={{fontSize:16,color:'#fff'}}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
