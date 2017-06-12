
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView } from 'react-native';
import { View, Text, Icon, List, ListItem, Content } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import Store from 'react-native-simple-store';

import { closeDrawer } from '../../actions/Creators';
import navigateTo from '../../actions/sideBarNav';
import theme from '../../themes/base-theme';
import styles from './style';
import Global from '../../Global';

const cover = require('../../images/logo.png');

const {
  reset,
} = actions;

class SideBar extends Component {

  static propTypes = {
    closeDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    reset: React.PropTypes.func,
    language: React.PropTypes.number,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  onLogout() {
    Store.delete('token');
    this.props.closeDrawer();
    this.props.reset(this.props.navigation.key);
  }
  onUpdateProfile() {
    this.props.navigateTo('updateprofile', 'home');
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }
  render() {
    return (
      <View theme={theme} style={{ backgroundColor: '#fff' }} >
        <View style={styles.image}>
          <Image
            style={styles.thumbnail}
            source={cover}
            resizeMode="stretch"
          />
          <Text style={[styles.name, { top: 130 }]}>Customer phone number</Text>
          <Text style={[styles.name, { top: 150 }]}>9898 898 898</Text>
        </View>

        <Text style={{ color: '#000', fontSize: 16, margin: 20, fontWeight: '500', marginBottom: 10 }}>
          {Global.Languages.ShopByCategory[this.props.language]}
        </Text>
        <ScrollView style={{ height: theme.deviceHeight / 3 }}>
          <List foregroundColor={'#000'} style={styles.list}>
            <ListItem button onPress={() => this.navigateTo('cartshopping')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-cart" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.MyCart[this.props.language]}
                </Text>
              </View>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('myorder')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-basket-outline" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.MyOrders[this.props.language]}
                </Text>
              </View>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('help')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="md-book" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.Help[this.props.language]}
                </Text>
              </View>
            </ListItem>

            <ListItem button onPress={() => this.navigateTo('cartcategory')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-cart" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.FeaturedProducts[this.props.language]}
                </Text>
              </View>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('cartcategory')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-basket-outline" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.NewProducts[this.props.language]}
                </Text>
              </View>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('cartcategory')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-cart" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.HotDeals[this.props.language]}
                </Text>
              </View>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('cartcategory')} iconLeft style={styles.links} >
              <View style={styles.sidebarList}>
                <View style={[styles.sidebarIconView, { backgroundColor: '#00afc1', paddingLeft: 6 }]}>
                  <Icon name="ios-basket-outline" style={styles.sidebarIcon} />
                </View>
                <Text style={styles.linkText} >
                  {Global.Languages.SpecialOffers[this.props.language]}
                </Text>
              </View>
            </ListItem>
          </List>
        </ScrollView>
        <View style={styles.underView}>
          <Icon
            style={{ color: '#6e6e6e' }}
            name="ios-arrow-down"
          />
        </View>
        <List foregroundColor={'#000'} style={{ paddingTop: 10 }}>
          <ListItem button onPress={() => this.onUpdateProfile()} style={styles.links2} >
            <Text style={styles.linkText}>
              {Global.Languages.UpdateProfile[this.props.language]}
            </Text>
          </ListItem>
          <ListItem button style={styles.links2} >
            <Text style={styles.linkText}>
              {Global.Languages.Rate[this.props.language]}
            </Text>
          </ListItem>
          <ListItem button onPress={() => this.onLogout()} style={styles.links2} >
            <Text style={styles.linkText}>
              {Global.Languages.Logout[this.props.language]}
            </Text>
          </ListItem>
        </List>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

function mapStateToProps(state) {
  const navigation = state.cardNavigation;
  const { language } = state.settingReducer;
  return { language, navigation };
}

export default connect(mapStateToProps, bindAction)(SideBar);
