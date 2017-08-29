import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import HLText from '../HLText/HLText';
import Util from '../../models/Util';
import ClosedOrderListItem from '../ClosedOrderListItem/ClosedOrderListItem';
import { connect } from 'react-redux';
import styles from '../../config/styles';
import { requestOrderHistory } from '../../actions/order_history';
import { requestBalances, requestBalance } from '../../actions/wallet';

class CoinDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ 
    title: 'Coin Details: ' + navigation.state.params.coin.currency
  });

  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this._currency = props.navigation.state.params.coin.currency;
  }

  componentDidMount() {
    this.props.loadOrders();
  }

  onRefresh = () => {
    this.props.loadWallet();
    this.props.loadOrders();
    this.props.loadBalance(this._currency);
  }

  orders_data = () => {
    if(this.props.loading) return [];
    return this.props.orders_list.search(this._currency);
  }

  renderOrdersHeader = () => {
    if(this.props.loading) return null; 

    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#CCC', paddingBottom: 10}}>
          <Text style={[styles.label, styles.bigText]}>Order History</Text>
        </View>

        { (!this.props.orders_list.exists(this._currency)) &&
          <View style={{marginTop: 10}}><Text>No orders yet</Text></View>
        }
      </View>
    );
  }

  render() {
    var btcPrice = this.props.market_summary.getLast("USDT", "BTC");
    var last = this.props.market_summary.getLast("BTC", this._currency);
    var coinBal = this.props.wallet.getCoinBalance(this._currency);

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.onRefresh}
          />
        }
      >
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.summaryPanel}>
          
            <View style={{paddingBottom: 10, flexDirection: 'row'}}>
              { this._currency == "BTC" || this._currency == "BCC" ? (
                <Text style={[styles.label, styles.bigText]}>Market Value: <HLText>${Util.round(btcPrice * coinBal.available, 2)}</HLText> / <HLText>{coinBal.available} BTC</HLText></Text>
              ) : (
                <Text style={[styles.label, styles.bigText]}>Market Value: <HLText>${Util.round(btcPrice * coinBal.available * last, 2)}</HLText> / <HLText>{Util.formatNbr(coinBal.available * last, 8)} BTC</HLText></Text>
              )}
            </View>

            <View style={{paddingBottom: 10, flexDirection: 'row'}}>
              <View style={{flex: .5}}>
                <Text style={styles.label}>Available Balance: </Text><Text>{coinBal.available}</Text>
              </View>
              <View style={{flex: .5, justifyContent: 'flex-end'}}>
                <Text style={styles.label}>Pending Deposit: </Text><Text>{coinBal.pending}</Text>
              </View>
            </View>

            <View style={{paddingBottom: 10, flexDirection: 'row'}}>
              <View style={{flex: .5}}>
                <Text style={styles.label}>Total: </Text><Text>{coinBal.balance}</Text>
              </View>
              <View style={{flex: .5, justifyContent: 'flex-end'}}>
                <Text style={styles.label}>Last: </Text><Text>{last}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container}> 
            <FlatList
              extraData={this.state}
              data={this.orders_data()}
              renderItem={({item}) => { return ( <ClosedOrderListItem item={item} itemSelected={this._onSelectOrder} /> ); }}
              keyExtractor={item => item.orderUuid}
              ListHeaderComponent={this.renderOrdersHeader}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  _onSelectOrder = (item) => {
    const { navigate } = this.props.navigation;
    navigate('OrderDetails', { order: item })
  }
}

Object.assign(styles, {
  summaryPanel: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    flexDirection: 'column'
  },
});

const mapStateToProps = (state) => {
  return {
    loading: state.order_history.loading || state.market_summary.loading || state.wallet.loading,
    market_summary: state.market_summary.market_summary,
    orders_list: state.order_history.orders_list,
    wallet: state.wallet.wallet
  };
};

const mapDispatchToEvents = (dispatch) => {
  return {
    loadOrders: () => {
      dispatch(requestOrderHistory());
    },
    loadWallet: () => {
      dispatch(requestBalances());
    },
    loadBalance: (currency) => {
      dispatch(requestBalance(currency));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToEvents)(CoinDetailsScreen);