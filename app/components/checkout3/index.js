import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Icon, Content, CheckBox, Button } from 'native-base';
import DatePicker from 'react-native-datepicker';
import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';
import { setLanguage } from '../../actions/Creators';

const {
  replaceAt,
} = actions;

class Checkout3 extends Component {
  static propTypes = {
    replaceAt: React.PropTypes.func,
    language: React.PropTypes.number,
    setLanguage: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  onGotoCart() {
    this.replaceAt('cartshopping');
  }
  onSetLanguage(language) {
    if (language === -1) {
      return;
    }
    this.props.setLanguage(language);
  }
  onConfirm() {
    this.replaceAt('thankyou');
  }
  onForward() {
    this.replaceAt('checkout2');
  }
  replaceAt(route) {
    this.props.replaceAt('checkout3', { key: route }, 'global');
  }
  render() { // eslint-disable-line class-methods-use-this
    return (
      <Container theme={theme}>
        <Header
          style={{ flexDirection: 'column',
            elevation: 0,
            paddingTop: (Platform.OS === 'ios') ? 20 : 10,
            justifyContent: 'space-between',
          }}
        >
          <View style={[styles.headerView, { justifyContent: 'space-between' }]}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => this.onForward()}
            >
              <Icon name="md-arrow-back" style={{ fontSize: 22 }} />
              <Text style={styles.backText}>
                {Global.Languages.Checkout[this.props.language]}(
                  {Global.Languages.FinaliseOrder[this.props.language]})
              </Text>
            </TouchableOpacity>
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
        </Header>
        <Content style={styles.mainView}>
          <View style={{ marginTop: theme.deviceHeight / 4 }}>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD HH-mm"
              minDate="2016-01-01"
              maxDate="2018-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: 36,
                },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
              }}
              onDateChange={(date) => { this.setState({ date }); }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 20 }}>
            <CheckBox
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            <Text style={{ marginLeft: 5 }}>
              {Global.Languages.Cash[this.props.language]}(COD)
            </Text>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => this.onConfirm()}
            >
              <Text style={{ fontSize: 16 }}>
                {Global.Languages.Confirm[this.props.language]}
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setLanguage: language => dispatch(setLanguage(language)),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  return { language };
}

export default connect(mapStateToProps, bindAction)(Checkout3);
