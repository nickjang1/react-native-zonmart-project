import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Icon, Content, Button, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';
import { cartAttempt, delCartAttempt, setDetail, setLanguage } from '../../actions/Creators';

const {
  popRoute,
  replaceAt,
} = actions;

let _this = null;
let totalPrice = 0;

class CartShopping extends Component {  // eslint-disable-line
  static propTypes = {
    setLanguage: React.PropTypes.func,
    language: React.PropTypes.number,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    cartAttempt: React.PropTypes.func,
    setDetail: React.PropTypes.func,
    delCartAttempt: React.PropTypes.func,
    cardNavigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    _this = this;
  }

  componentWillMount() {
    this.props.cartAttempt();
  }
  onSetLanguage(language) {
    if (language === -1) {
      return;
    }
    this.props.setLanguage(language);
  }
  onGotoDetail(item) {
    this.props.setDetail(item.id);
    this.replaceRoute('categorydetail');
  }
  onCheckOut() {
    if (this.props.cart.length === 0) {
      Alert.alert('There is no products for checkout');
      return;
    }
    this.replaceRoute('checkout1');
  }
  onUpdateCart() {
    alert('update cart....');
  }
  onDelete(id) {
    this.props.delCartAttempt(id);
  }
  replaceRoute(route) {
    this.props.replaceAt('cartshopping', { key: route }, 'global');
  }
  popRoute() {
    this.props.popRoute(this.props.cardNavigation.key);
  }
  render() { // eslint-disable-line class-methods-use-this
    const datas = [];
    totalPrice = 0;
    const keys = Object.keys(this.props.cart);
    for (let i = 0; i < keys.length; i += 1) {
      datas.push(this.props.cart[keys[i]]);
      totalPrice += this.props.cart[keys[i]].subtotal;
    }
    const carts = datas.map(function (item) {
      return (
        <View style={styles.subView} key={item.id}>
          <TouchableOpacity onPress={() => _this.onGotoDetail(item)}>
            <Image
              source={{ uri: `http://zonmart.websitedemo.today/uploads/products/${item.options.picture}` }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.detailView}>
            <View style={{ height: theme.deviceHeight / 15 }}>
              <Text style={styles.titleText} numberOfLines={2}>
                {item.name}
              </Text>
            </View>
            <View>
              <StarRating
                disabled
                maxStars={5}
                starSize={14}
                rating={item.rating}
                selectedStar={rating => this.onrate(rating)}
                starColor={theme.yellow}
              />
            </View>
            <View>
              <Text style={styles.priceText} >
                QR {item.subtotal}
              </Text>
            </View>
            <Text style={styles.countText}>
              {item.qty}
            </Text>
          </View>
          <TouchableOpacity style={styles.recycleView} onPress={() => _this.onDelete(item.rowId)}>
            <Icon name="ios-trash-outline" style={styles.recycleBtn} />
          </TouchableOpacity>
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
              onPress={() => this.popRoute()}
            >
              <Icon name="md-arrow-back" style={{ fontSize: 22 }} />
            </TouchableOpacity>
            <Text style={styles.backText}>
              {Global.Languages.ShoppingCart[this.props.language]}
            </Text>
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
            </View>
          </View>
        </Header>
        <Content style={styles.mainView}>
          <Spinner visible={this.props.attempting} />
          {carts}
          <View style={styles.bottomView}>
            <Text style={{ fontSize: 18 }}>
              {Global.Languages.CartTotal[this.props.language]} : QR {totalPrice}
            </Text>
            {/* <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => this.onUpdateCart()}
            >
              <Text style={{ fontSize: 16 }}>
                {Global.Languages.UpdateCart[this.props.language]}
              </Text>
            </TouchableOpacity>*/}
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => this.onCheckOut()}
            >
              <Text style={{ fontSize: 16 }}>
                {Global.Languages.Checkout[this.props.language]}
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
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    cartAttempt: () => dispatch(cartAttempt()),
    delCartAttempt: id => dispatch(delCartAttempt(id)),
    setLanguage: language => dispatch(setLanguage(language)),
    setDetail: data => dispatch(setDetail(data)),
  };
}

function mapStateToProps(state) {
  const { cardNavigation } = state;
  const { language } = state.settingReducer;
  const { cart, attempting } = state.cartReducer;
  return { language, cardNavigation, cart, attempting };
}

export default connect(mapStateToProps, bindAction)(CartShopping);
