import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, Switch } from 'react-native';
import HLText from '../HLText/HLText';
import WalletListItem from '../WalletListItem/WalletListItem';
import { connect } from 'react-redux';
import { requestBalances } from '../../actions/wallet';
import styles from '../../config/styles';

class WalletScreen extends React.Component {
  static navigationOptions = {
    title: 'Wallet'
  };

  constructor(props) {
    super(props);
    this.state = { showZero: true };
  }

  componentDidMount() {
    this.props.loadBalances(false);
  }

  wallet_data = () => {
    if(this.props.loading) return [];
    return this.props.wallet.getCoinsWithMarketSummary(this.state.showZero);
  }

  toggleZeroBalances = (val) => {
    this.setState({ showZero: !this.state.showZero });
  }

  onRefresh = () => {
    this.props.loadBalances(true);
  }

  renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  renderHeader = () => {
    if(this.props.loading) return null;

    return (
      <View style={{borderBottomWidth: 1, borderColor: '#CCC', paddingBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5}}>
          <Switch
            onValueChange={this.toggleZeroBalances}
            onTintColor="#1993b7"
            thumbTintColor="#666"
            value={this.state.showZero} />
          <Text style={{marginLeft: 3}}>Show Zero Balances</Text>
        </View>

        <View style={styles.listHeader}>
          <Text style={{fontWeight: 'bold'}}>Estimated Value:</Text>
          <HLText>{this.props.wallet.getTotalBtc()} BTC / ${this.props.wallet.getTotalUsd()} USD</HLText>
        </View>
      </View>
    );
  }

  render() {
    var btcPrice = this.props.marketSummary ? this.props.marketSummary.getCoinMarketSummary("USDT", "BTC").last : 0;
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state}
          data={this.wallet_data()}
          keyExtractor={coin => coin.currency}
          renderItem={({item}) => { 
              return ( 
                <WalletListItem item={item} btc_price={btcPrice} itemSelected={this._onSelectCoin} />
              ); 
            }
          }
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          refreshing={this.props.loading}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }

  // private methods
  _onSelectCoin = (item) => {
    const { navigate } = this.props.navigation;
    navigate('CoinDetails', { coin: item })
  }
}

Object.assign(styles, {
  listHeader: {
    flexDirection: 'column',
  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.wallet.loading || state.market_summary.loading,
    wallet: state.wallet.wallet,
    marketSummary: state.market_summary.market_summary
  };
};

const mapDispatchToEvents = (dispatch) => {
  return {
    loadBalances: (forceRefresh) => {
      dispatch(requestBalances(forceRefresh));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToEvents)(WalletScreen);