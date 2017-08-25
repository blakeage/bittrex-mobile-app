import React, { Component } from 'react';
import { Text } from 'react-native';
import styles from './styles';

class HLText extends Component {
  render() {
  return (
    <Text style={[styles.text, this.props.style]}>
      {this.props.children} 
    </Text>
  );
  }
}

export default HLText;