import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Util from '../../models/Util';
import HLText from '../HLText/HLText';
import styles from './styles';

class WalletListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableHighlight underlayColor="#EFEFEF" onPress={() => {this.props.itemSelected(this.props.item)}}>
        <View key={this.props.item.currency} style={styles.listItem}>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Currency:</Text> <HLText>{this.props.item.currency}</HLText></Text>
            </View>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Balance:</Text> {Util.formatNbr(this.props.item.available, 8)}</Text>
            </View>
          </View>


          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Pending:</Text> {this.props.item.pending}</Text>
            </View>

            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Total:</Text> {Util.formatNbr(this.props.item.balance, 8)}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: .5}}>
              <Text><Text style={styles.label}>Change:</Text> {this.props.item.marketSummary ? this.props.item.marketSummary.getChange() : 0}%</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              { this.props.item.currency == "BTC" || this.props.item.currency == "BCC" ? (
                <Text><Text style={styles.label}>Market Value:</Text> <HLText>${Util.round(this.props.btc_price * this.props.item.available, 2)} USD</HLText> / {Util.formatNbr(this.props.item.available, 8)} BTC</Text>
              ) : (
                <Text><Text style={styles.label}>Market Value:</Text> <HLText>${Util.round(this.props.btc_price * this.props.item.available * this.props.item.marketSummary.last, 2)} USD</HLText> / {Util.formatNbr(this.props.item.available * this.props.item.marketSummary.last, 8)} BTC</Text>
              )}
            </View>
          </View>
        </View>     
      </TouchableHighlight>
    );
  }
}

export default WalletListItem;