import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, TextInput } from 'react-native';
import ClosedOrderListItem from '../ClosedOrderListItem/ClosedOrderListItem';
import styles from '../../config/styles';
import { connect } from 'react-redux';
import { requestOrderHistory } from '../../actions/order_history';

class CompletedOrdersScreen extends React.Component {
	static navigationOptions = { title: 'Completed Orders' };

	constructor(props) {
		super(props);
		this.state = { searchStr: null };
	}

	componentDidMount() {
		this.props.loadOrders();
	}

	renderFooter = () => {
		if (!this.props.loading) return null;

		return (
			<View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE"}}>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	orders = () => {
		if(!this.props.orders_list) return [];
		return this.props.orders_list.search(this.state.searchStr);
	}
	
	searchChanged = (text) => {
		this.setState({ searchStr: text });
	}

	renderHeader = () => {
		return (
			<View style={{borderBottomWidth: 1, borderColor: '#CCC', paddingBottom: 10}}>
				<TextInput keyboardType={this.props.keyboardType} 
					placeholder="Search ..."
					placeholderTextColor='#AAA'
					underlineColorAndroid='transparent'
					autoCorrect={false}
					style={styles.textInput}
					onChangeText={(text) => this.searchChanged(text)} />
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.orders()}
					extraData={this.state}
					renderItem={({item}) => { return ( <ClosedOrderListItem item={item} itemSelected={this._onSelectOrder} /> ); }}
					keyExtractor={item => item.orderUuid}
					ListFooterComponent={this.renderFooter}
					ListHeaderComponent={this.renderHeader}
				/>
			</View>
		);
	}

	// private methods
	_onSelectOrder = (item) => {
		const { navigate } = this.props.navigation;
		navigate('OrderDetails', { order: item })
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.order_history.loading,
		orders_list: state.order_history.orders_list
	};
};

const mapDispatchToEvents = (dispatch) => {
  return {
    loadOrders: () => {
      dispatch(requestOrderHistory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToEvents)(CompletedOrdersScreen);