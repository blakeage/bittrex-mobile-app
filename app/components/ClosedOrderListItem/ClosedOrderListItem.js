import React, { Component } from 'react';
import Moment from 'moment';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import HLText from '../HLText/HLText';
import Util from '../../models/Util';
import styles from './styles';

class ClosedOrderListItem extends Component {
  constructor(props) {
    super(props)
    this._order = this.props.item;
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#EFEFEF" onPress={() => {this.props.itemSelected(this._order)}}>
        <View key={this._order.orderUuid} style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <Text><Text style={styles.label}>Close Date:</Text> {Util.formatDate(this._order.closed)}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Market:</Text> <HLText>{this._order.exchange}</HLText></Text>
            </View>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Qty:</Text> {this._order.quantity}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .4}}>
              <Text><Text style={styles.label}>Order Type:</Text> <Text style={{fontStyle: 'italic'}}>{this._order.orderTypeStr()}</Text></Text>
            </View>         
            <View style={{flex: .6}}>
              <Text><Text style={styles.label}>Actual Rate:</Text> {Util.formatNbr(this._order.pricePerUnit, 8)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ClosedOrderListItem;