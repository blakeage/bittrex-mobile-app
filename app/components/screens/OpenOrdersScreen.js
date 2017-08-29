import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, TextInput } from 'react-native';
import OpenOrderListItem from '../OpenOrderListItem/OpenOrderListItem';
import styles from '../../config/styles';
import { connect } from 'react-redux';
import { requestOpenOrders } from '../../actions/open_orders';

class OpenOrdersScreen extends React.Component {
  static navigationOptions = { title: 'Open Orders' };

  constructor(props) {
    super(props);
    this.state = { searchStr: null };
  }

  componentDidMount() {
    this.props.loadOrders();
  }

  orders = () => {
    if(this.props.loading) return [];
    return this.props.orders_list.search(this.state.searchStr);
  }

  onRefresh = () => {
    this.props.loadOrders();
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
          extraData={this.state}
          data={this.orders()}
          renderItem={({item}) => { return ( <OpenOrderListItem item={item} itemSelected={this._onSelectOrder} /> ); }}
          keyExtractor={item => item.orderUuid}
          ListHeaderComponent={this.renderHeader}
          refreshing={this.props.loading}
          onRefresh={this.onRefresh}
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
    loading: state.open_orders.loading,
    orders_list: state.open_orders.orders_list
  };
};

const mapDispatchToEvents = (dispatch) => {
  return {
    loadOrders: () => {
      dispatch(requestOpenOrders());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToEvents)(OpenOrdersScreen);