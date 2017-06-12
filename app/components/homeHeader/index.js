import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, Alert } from 'react-native';
import { Icon, View, Button } from 'native-base';

import { openDrawer, setLanguage } from '../../actions/Creators';
import navigateTo from '../../actions/sideBarNav';
import styles from './styles';
import Global from '../../Global';

const logo = require('../../images/logo.png');

class Header extends Component {

  static propTypes = {
    setLanguage: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    language: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  onSetLanguage(language) {
    if (language === -1) {
      return;
    }
    this.props.setLanguage(language);
  }
  onGotoCart() {
    this.navigateTo('cartshopping');
  }
  onMenu() {
    dismissKeyboard();
    this.props.openDrawer();
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }
  render() {
    return (
      <View style={styles.header} >
        <View style={styles.headerView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button transparent onPress={() => this.onMenu()}>
              <Icon style={{ fontSize: 28 }} name="ios-menu" />
            </Button>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button
              transparent
              style={{ paddingHorizontal: 10 }}
              onPress={() => Alert.alert(
                Global.Languages.SetLanguage[this.props.language],
                'please select suitable language for you',
                [
                  { text: Global.LanguageType[2], onPress: () => this.onSetLanguage(-1) },
                  { text: Global.LanguageType[1], onPress: () => this.onSetLanguage(0) },
                  { text: Global.LanguageType[0], onPress: () => this.onSetLanguage(1) },
                ],
              )}
            >
              <Text style={styles.language}>
                {Global.LanguageType[this.props.language]}
              </Text>
            </Button>
            <Button
              transparent
              style={{ paddingHorizontal: 10 }}
              onPress={() => this.onGotoCart()}
            >
              <Icon name="ios-cart" />
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    setLanguage: language => dispatch(setLanguage(language)),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  return { language };
}

export default connect(mapStateToProps, bindAction)(Header);
