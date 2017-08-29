import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Moment from 'moment';
import HLText from '../HLText/HLText';
import Util from '../../models/Util';
import styles from '../../config/styles';

class OrderDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ 
    title: 'Order Details: ' + navigation.state.params.order.exchange
  });

  constructor(props) {
    super(props);
    this.state = { loading: true, refreshing: false };
    const { navigate } = this.props.navigation;
    this._order = props.navigation.state.params.order;
  }

  render() {
    return (
      <View style={styles.container}>
        { this._order.closed ? (
          <View style={{paddingBottom: 10, flexDirection: 'row'}}><Text style={styles.label}>Opened Date: </Text><Text>{Util.formatDate(this._order.timeStamp)}</Text></View>
        ) : (
          <View style={{paddingBottom: 10, flexDirection: 'row'}}><Text style={styles.label}>Order Date: </Text><Text>{Util.formatDate(this._order.opened)}</Text></View>
        )}

        { this._order.closed && 
          <View style={{paddingBottom: 10, flexDirection: 'row'}}>
            <Text style={styles.label}>Closed Date: </Text><Text>{Util.formatDate(this._order.closed)}</Text>
          </View>
        }

        <View style={{paddingBottom: 10, flexDirection: 'row'}}>
          <View style={{flex: .5}}>
            <Text style={styles.label}>Market: </Text><HLText>{this._order.exchange}</HLText>
          </View>
          <View style={{flex: .5, justifyContent: 'flex-end'}}>
            <Text style={styles.label}>Order Type: </Text><Text>{this._order.orderTypeStr()}</Text>
          </View>
        </View>

        <View style={{paddingBottom: 10, flexDirection: 'row'}}>
          <View style={{flex: .5}}>
            <Text style={styles.label}>Units Filled: </Text><Text>{this._order.unitsFilled()}</Text>
          </View>
          <View style={{flex: .5, justifyContent: 'flex-end'}}>
            <Text style={styles.label}>Units Total: </Text><Text>{this._order.quantity}</Text>
          </View>
        </View>

        <View style={{paddingBottom: 10, flexDirection: 'row'}}>
          <View style={{flex: .5}}>
            <Text style={styles.label}>Bid/Ask: </Text><Text>{Util.formatNbr(this._order.limit, 8)}</Text>
          </View>
          <View style={{flex: .5, justifyContent: 'flex-end'}}>
            <Text style={styles.label}>Actual Rate: </Text><Text>{this._order.pricePerUnit ? Util.formatNbr(this._order.pricePerUnit, 8) : Util.formatNbr(0, 8)}</Text>
          </View>
        </View>

        <View style={{paddingBottom: 10, flexDirection: 'row'}}>
          { this._order.closed ? (
            <View><Text style={styles.label}>Cost/Proceeds: </Text><Text>{this._order.cost()}</Text></View>
          ) : (
            <View><Text style={styles.label}>Estimated Total: </Text><Text>{this._order.estTotal()}</Text></View>
          )}
        </View>
      </View>
    );
  }
}

export default OrderDetailsScreen;