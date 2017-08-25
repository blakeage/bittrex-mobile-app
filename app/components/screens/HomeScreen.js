import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button } from 'react-native';

import styles from '../../config/styles';

class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Bittrex Mobile' };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Button title='Completed Orders' style={{flex: .7}} color='#000' onPress={() => navigate('CompletedOrders', { name: 'CompletedOrders' })} />

            <View style={{marginLeft: 10, flex: .3, justifyContent: 'center'}}>
              <Button title='Wallet' color='#000' onPress={() => navigate('Wallet', { name: 'Wallet' })} />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Button title='Open Orders' style={{flex: .7}} color='#000' onPress={() => navigate('OpenOrders', { name: 'OpenOrders' })} />

            <View style={{marginLeft: 10, flex: .3, justifyContent: 'center'}}>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;