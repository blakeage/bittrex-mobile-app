import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, FlatList } from 'react-native';
import HLText from '../HLText/HLText';
import ApiHelper from '../../models/ApiHelper';
import Util from '../../models/Util';
import OrdersList from '../../models/OrdersList';
import ClosedOrder from '../../models/ClosedOrder';
import ClosedOrderListItem from '../ClosedOrderListItem/ClosedOrderListItem';
import styles from '../../config/styles';

class CoinDetailsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({ 
		title: 'Coin Details: ' + navigation.state.params.coin.Currency
	});

	constructor(props) {
		super(props);
		this.state = { loading: true, refreshing: false };
		const { navigate } = this.props.navigation;
		this.coin = props.navigation.state.params.coin;
		this._ordersList = new OrdersList();
		this._marketSummary = props.navigation.state.params.marketSummary;
	}

	componentDidMount() {
		this.getApiHelper().fetchOrderHistory(this.ordersLoaded);
	}

	getApiHelper() {
		return new ApiHelper();
	}

	ordersLoaded = (data) => {
		let orders = data.map((ord_data) => { return new ClosedOrder(ord_data); });
		this._ordersList.set(orders);
		this.setState({ loading: false });
	}

	onRefresh = () => {
		/*this._initModels();
		this.setState({ refreshing: true });
		this.getApiHelper().fetchWallet(this.walletLoaded);
		*/
	}

	renderOrdersFooter = () => {
		if (!this.state.loading && !this.state.refreshing) return null;

		return (
			<View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}>
				<ActivityIndicator animating size="large" />
			</View>
		);
	}

	renderOrdersHeader = () => {
		let noOrdersNote = null;
		if(!this._ordersList.exists(this.coin.Currency)) {
			noOrdersNote = <View style={{marginTop: 10}}><Text>No orders yet</Text></View>;
		}

		return (
			<View>
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#CCC', paddingBottom: 10}}>
					<Text style={[styles.label, styles.bigText]}>Order History</Text>
				</View>
				{noOrdersNote}
			</View>
		);
	}

	render() {
		var btcPrice = this._marketSummary.getLast("USDT", "BTC");
		var last = this._marketSummary.getLast("BTC", this.coin.Currency);

		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={styles.summaryPanel}>
				
					<View style={{paddingBottom: 10, flexDirection: 'row'}}>
						{ this.coin.Currency == "BTC" || this.coin.Currency == "BCC" ? (
							<Text style={[styles.label, styles.bigText]}>Market Value: <HLText>${Util.round(btcPrice * this.coin.Available, 2)}</HLText> / <HLText>{this.coin.Available} BTC</HLText></Text>
						) : (
							<Text style={[styles.label, styles.bigText]}>Market Value: <HLText>${Util.round(btcPrice * this.coin.Available * last, 2)}</HLText> / <HLText>{Util.round(this.coin.Available * last, 8)} BTC</HLText></Text>
						)}
					</View>

					<View style={{paddingBottom: 10, flexDirection: 'row'}}>
						<View style={{flex: .5}}>
							<Text style={styles.label}>Available Balance: </Text><Text>{this.coin.Available}</Text>
						</View>
						<View style={{flex: .5, justifyContent: 'flex-end'}}>
							<Text style={styles.label}>Pending Deposit: </Text><Text>{this.coin.Pending}</Text>
						</View>
					</View>

					<View style={{paddingBottom: 10, flexDirection: 'row'}}>
						<View style={{flex: .5}}>
							<Text style={styles.label}>Total: </Text><Text>{this.coin.Balance}</Text>
						</View>
						<View style={{flex: .5, justifyContent: 'flex-end'}}>
							<Text style={styles.label}>Last: </Text><Text>{last}</Text>
						</View>
					</View>
				</View>

				<View style={styles.container}>	
					<FlatList
						extraData={this.state}
						data={this._ordersList.search(this.coin.Currency)}
						renderItem={({item}) => { return ( <ClosedOrderListItem item={item} itemSelected={this._onSelectOrder} /> ); }}
						keyExtractor={item => item.orderUuid}
						ListFooterComponent={this.renderOrdersFooter}
						ListHeaderComponent={this.renderOrdersHeader}
					/>
				</View>
			</View>
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

export default CoinDetailsScreen;