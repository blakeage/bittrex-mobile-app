import HomeScreen from './components/screens/HomeScreen';
import CompletedOrdersScreen from './components/screens/CompletedOrdersScreen';
import WalletScreen from './components/screens/WalletScreen';
import CoinDetailsScreen from './components/screens/CoinDetailsScreen';
import OrderDetailsScreen from './components/screens/OrderDetailsScreen';
import OpenOrdersScreen from './components/screens/OpenOrdersScreen';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducers } from './redux';

import styles from './config/styles';

const store = createStore(reducers, {}, applyMiddleware(apiMiddleware, thunk));

const navOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  headerTintColor: '#FFF' 
};

const Navigation = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
  CompletedOrders: {
    screen: CompletedOrdersScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
  Wallet: {
    screen: WalletScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
  CoinDetails: {
    screen: CoinDetailsScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
  OrderDetails: {
    screen: OrderDetailsScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
  OpenOrders: {
    screen: OpenOrdersScreen,
    navigationOptions: ({navigation}) => (navOptions),
  },
});

class BittrexMobile extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <Provider store={store}> 
        <Navigation />
      </Provider>
    )
  }
}

export default BittrexMobile;