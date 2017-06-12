import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Icon, Content, Button } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';
import { checkoutAttempt, setLanguage } from '../../actions/Creators';

const {
  popRoute,
  replaceAt,
} = actions;
let totalPrice = 0;

class Thankyou extends Component {  // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    checkoutAttempt: React.PropTypes.func,
    setLanguage: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    language: React.PropTypes.number,
  }
  componentWillMount() {
    this.props.checkoutAttempt({ checkoutdata: {
      firstname: this.props.deliveryReducer.firstname,
      lastname: this.props.deliveryReducer.lastname,
      address1: this.props.deliveryReducer.address1,
      address2: this.props.deliveryReducer.address2,
      postalcode: this.props.deliveryReducer.postalcode,
      city: this.props.deliveryReducer.city,
      province: this.props.deliveryReducer.province,
      phone: this.props.deliveryReducer.phone,
      email: this.props.deliveryReducer.email,
      bfirstname: this.props.billingReducer.firstname,
      blastname: this.props.billingReducer.lastname,
      baddress1: this.props.billingReducer.address1,
      baddress2: this.props.billingReducer.address2,
      bpostalcode: this.props.billingReducer.postalcode,
      bcity: this.props.billingReducer.city,
      bprovince: this.props.billingReducer.province,
      bphone: this.props.billingReducer.phone,
      bemail: this.props.billingReducer.email,
    } });
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
  onGoHome() {
    this.popRoute();
  }
  onGotoOrderHistory() {
    this.replaceAt('myorder');
  }
  replaceAt(route) {
    this.props.replaceAt('thankyou', { key: route }, 'global');
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  render() {
    totalPrice = 0;
    const products = this.props.checkoutReducer.checkoutdata.map((item) => {
      totalPrice += +item.price;
      return (
        <View key={item.id} style={[styles.subView, { alignItems: 'center' }]}>
          <Image
            style={{ width: theme.deviceWidth / 10, height: theme.deviceHeight / 10, margin: 10 }}
            source={{ uri: 'https://s30.postimg.org/fcpo0mcjh/image.png' }}
          />
          <StarRating
            disabled
            maxStars={5}
            starSize={14}
            rating={+item.rating}
            selectedStar={rating => this.onrate(rating)}
            starColor={theme.yellow}
          />
          <Text style={styles.textStyle}>{item.name}</Text>
          <Text style={[styles.textStyle, { color: 'red', marginVertical: 10 }]}>QR{item.price}</Text>
          <Text style={styles.textStyle}>{item.quantity}</Text>
        </View>
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
              onPress={() => this.onGoHome()}
            >
              <Icon name="md-arrow-back" style={{ fontSize: 22 }} />
              <Text style={styles.backText}>
                {Global.Languages.ShopMore[this.props.language]}
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
          <View style={{ alignItems: 'center', justifyContent: 'center', height: theme.deviceHeight / 10 }}>
            <Text style={{ fontSize: 24, color: theme.nearBlack }}>
              {Global.Languages.ThankyouPurchase[this.props.language]}
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 5 }} >
            <Text style={styles.textStyle}>
              {Global.Languages.Invoice[this.props.language]}
            </Text>
          </View>
          <View style={styles.subView}>
            <Text style={[styles.textStyle, { marginBottom: 10 }]}>
              Deliver to : {this.props.deliveryReducer.firstname}
            </Text>
            <Text style={styles.textStyle}>
              Receiver Name : {this.props.deliveryReducer.firstname}
            </Text>
            <Text style={styles.textStyle}>
              Ad : {this.props.deliveryReducer.address1}, {this.props.deliveryReducer.address2}
            </Text>
            <Text style={styles.textStyle}>
              Cityname : {this.props.deliveryReducer.city}
            </Text>
            <Text style={styles.textStyle}>Province {this.props.deliveryReducer.province}</Text>
            <Text style={[styles.textStyle, { marginTop: 10 }]}>3156461316516</Text>
          </View>
          <View style={styles.subView}>
            <Text style={[styles.textStyle, { marginBottom: 10 }]}>
              Billing to : {this.props.billingReducer.firstname}
            </Text>
            <Text style={styles.textStyle}>
              Billing Name : {this.props.billingReducer.firstname}
            </Text>
            <Text style={styles.textStyle}>
              Ad: {this.props.billingReducer.address1}, {this.props.billingReducer.address2}
            </Text>
            <Text style={styles.textStyle}>
              Cityname : {this.props.billingReducer.city}
            </Text>
            <Text style={styles.textStyle}>
              Province : {this.props.billingReducer.province}
            </Text>
            <Text style={[styles.textStyle, { marginTop: 10 }]}>
              3156461316516
            </Text>
          </View>
          { products }
          <View style={[styles.subView, { borderBottomWidth: 1, alignItems: 'flex-end' }]}>
            <Text style={styles.textStyle}>
              Subtotal : QR{totalPrice}
            </Text>
            <Text style={styles.textStyle}>
              Shipping : 0
            </Text>
            <Text style={styles.textStyle}>
              Coupon discount : 0
            </Text>
            <Text style={styles.textStyle}>
              Tax : 0
            </Text>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>
              Total Amount: QR{totalPrice}
            </Text>
          </View>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => this.onGotoOrderHistory()}
            >
              <Text style={{ fontSize: 16 }}>
                {Global.Languages.OrderHistory[this.props.language]}
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
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    checkoutAttempt: checkoutdata => dispatch(checkoutAttempt(checkoutdata)),
    setLanguage: language => dispatch(setLanguage(language)),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  const navigation = state.cardNavigation;
  const { deliveryReducer } = state;
  const { billingReducer } = state;
  const { checkoutReducer } = state;

  return { language, navigation, deliveryReducer, billingReducer, checkoutReducer };
}

export default connect(mapStateToProps, bindAction)(Thankyou);
