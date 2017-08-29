import React, { Component } from 'react';
import Moment from 'moment';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import HLText from '../HLText/HLText';
import Util from '../../models/Util';
import styles from './styles';

class OpenOrderListItem extends Component {
  constructor(props) {
    super(props)
    this._order = this.props.item;
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#EFEFEF" onPress={() => {this.props.itemSelected(this._order)}}>
        <View key={this._order.orderUuid} style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <Text><Text style={styles.label}>Order Date:</Text> {Util.formatDate(this._order.opened)}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Market:</Text> <HLText>{this._order.exchange}</HLText></Text>
            </View>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Bid/Ask:</Text> {Util.formatNbr(this._order.limit, 8)}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Units Filled:</Text> {this._order.unitsFilled()}</Text>
            </View>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Units Total:</Text> {this._order.quantity}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Order Type:</Text> <Text style={{fontStyle: 'italic'}}>{this._order.orderTypeStr()}</Text></Text>
            </View>         
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Actual Rate:</Text> {this._order.pricePerUnit ? Util.formatNbr(this._order.pricePerUnit, 8) : Util.formatNbr(0, 8)}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text><Text style={styles.label}>Estimated Total:</Text> <Text style={{fontStyle: 'italic'}}>{this._order.estTotal()}</Text></Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
}

export default OpenOrderListItem;