import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Icon, InputGroup, Input, Content, CheckBox, Picker, Title, Button } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';
import { checkoutDelivery, checkoutBilling, setLanguage } from '../../actions/Creators';

const {
  replaceAt,
} = actions;
const Item = Picker.Item;

class Checkout1 extends Component {  // eslint-disable-line
  static propTypes = {
    replaceAt: React.PropTypes.func,
    checkoutDelivery: React.PropTypes.func,
    checkoutBilling: React.PropTypes.func,
    setLanguage: React.PropTypes.func,
    language: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    const { firstname, lastname, address1, address2,
      postalcode, city, phone, email,
    } = props.deliveryReducer;
    this.state = {
      firstname,
      lastname,
      address1,
      address2,
      postalcode,
      city,
      province: '2',
      phone,
      email,
      checked: false,
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

  onValueChange(value) {
    this.setState({
      province: value,
    });
  }
  onCheckOut() {
    if (this.state.firstname === null || this.state.lastname === null ||
        this.state.address1 === null || this.state.postalcode === null
        || this.state.city === null ||
        this.state.province === null || this.state.phone === null) {
      Alert.alert('Please input all need datas');
    } else {
      let _province = '';
      const provinces = this.props.provinceReducer.province;
      for (let i = 0; i < provinces.length; i += 1) {
        if (provinces[i].id === this.state.province) {
          _province = provinces[i].name;
        }
      }
      this.props.checkoutDelivery({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        address1: this.state.address1,
        address2: this.state.address2,
        postalcode: this.state.postalcode,
        city: this.state.city,
        province: _province,
        phone: this.state.phone,
        email: this.state.email,
      });
      if (this.state.checked) {
        this.props.checkoutBilling({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          address1: this.state.address1,
          address2: this.state.address2,
          postalcode: this.state.postalcode,
          city: this.state.city,
          province: this.state.province,
          phone: this.state.phone,
          email: this.state.email,
        });
      }
      this.replaceAt('checkout2');
    }
  }
  onForward() {
    this.replaceAt('cartshopping');
  }
  replaceAt(route) {
    this.props.replaceAt('checkout1', { key: route }, 'global');
  }
  render() {
    const header = (
      <Header>
        <Title>Select Province</Title>
      </Header>
    );
    const provices = this.props.provinceReducer.province.map(function (item) {
      return (
        <Item
          label={item.name} textStyle={{ color: theme.darkGray }}
          value={item.id} key={item.id}
        />
      );
    });
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
                {Global.Languages.Checkout[this.props.language]}
                ({Global.Languages.DeliveryAddr[this.props.language]})
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
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.FirstName[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.firstname}
                onChangeText={firstname => this.setState({ firstname })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.LastName[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.lastname}
                onChangeText={lastname => this.setState({ lastname })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.Address1[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.address1}
                onChangeText={address1 => this.setState({ address1 })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.Address2[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.address2}
                onChangeText={address2 => this.setState({ address2 })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.PostalCode[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.postalcode}
                onChangeText={postalcode => this.setState({ postalcode })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.City[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.city}
                onChangeText={city => this.setState({ city })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <View
              style={styles.provinceView}
            >
              <Picker
                headerComponent={header}
                mode="dropdown"
                textStyle={{ color: theme.nearBlack }}
                selectedValue={this.state.province}
                onValueChange={value => this.onValueChange(value)}
              >
                { provices }
              </Picker>
            </View>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.Phone[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.phone}
                keyboardType={'numeric'}
                onChangeText={phone => this.setState({ phone })}
              />
            </InputGroup>
          </View>
          <View style={styles.couponView}>
            <InputGroup
              borderType="regular"
              style={styles.couponInput}
            >
              <Input
                placeholder={Global.Languages.Email[this.props.language]}
                placeholderTextColor={theme.darkGray}
                style={{ color: theme.nearBlack, padding: 0 }}
                value={this.state.email}
                keyboardType={'email-address'}
                onChangeText={email => this.setState({ email })}
              />
            </InputGroup>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            <CheckBox
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            <Text style={{ marginLeft: 5 }}>
              {Global.Languages.SameBilling[this.props.language]}
            </Text>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => this.onCheckOut()}
            >
              <Text style={{ fontSize: 16 }}>
                {Global.Languages.NextStep[this.props.language]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3 }} />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    checkoutDelivery: user => dispatch(checkoutDelivery(user)),
    checkoutBilling: user => dispatch(checkoutBilling(user)),
    setLanguage: language => dispatch(setLanguage(language)),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  const { provinceReducer } = state;
  const { deliveryReducer } = state;
  return { language, deliveryReducer, provinceReducer };
}

export default connect(mapStateToProps, bindAction)(Checkout1);
