import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Icon, Content } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';

const {
  popRoute,
} = actions;

class OrderDetail extends Component {  // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    language: React.PropTypes.number,
  }
  onGoHome() {
    this.popRoute();
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  render() { // eslint-disable-line class-methods-use-this
    console.log(this.props.order);
    return (
      <Container theme={theme}>
        <Header
          style={{ flexDirection: 'column',
            elevation: 0,
            paddingTop: (Platform.OS === 'ios') ? 20 : 10,
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.headerView}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => this.onGoHome()}
            >
              <Icon name="md-arrow-back" style={{ fontSize: 22 }} />
              <Text style={styles.backText}>
                {Global.Languages.OrderDetail[this.props.language]}
              </Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Content style={styles.mainView}>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: theme.deviceHeight / 10 }}>
            <Text style={{ fontSize: 20, color: theme.nearBlack }}>
              {Global.Languages.Order[this.props.language]} ***
            </Text>
          </View>
          <View style={styles.subView}>
            <Text style={[styles.textStyle, { marginBottom: 10 }]}>Deliver to ***</Text>
            <Text style={styles.textStyle}>Receiver Name ***</Text>
            <Text style={styles.textStyle}>Ad: address 1, address 2</Text>
            <Text style={styles.textStyle}>Cityname ***</Text>
            <Text style={styles.textStyle}>Province ***</Text>
            <Text style={[styles.textStyle, { marginTop: 10 }]}>3156461316516</Text>
          </View>
          <View style={styles.subView}>
            <Text style={[styles.textStyle, { marginBottom: 10 }]}>Billing to ***</Text>
            <Text style={styles.textStyle}>Billing Name ***</Text>
            <Text style={styles.textStyle}>Ad: address 1, address 2</Text>
            <Text style={styles.textStyle}>Cityname ***</Text>
            <Text style={styles.textStyle}>Province ***</Text>
            <Text style={[styles.textStyle, { marginTop: 10 }]}>3156461316516</Text>
          </View>
          <View style={[styles.subView, { alignItems: 'center' }]}>
            <Image
              style={{ width: theme.deviceWidth / 10, height: theme.deviceHeight / 10, margin: 10 }}
              source={{ uri: 'https://s30.postimg.org/fcpo0mcjh/image.png' }}
            />
            <StarRating
              disabled
              maxStars={5}
              starSize={14}
              rating={4}
              selectedStar={rating => this.onrate(rating)}
              starColor={theme.yellow}
            />
            <Text style={styles.textStyle}>Apple iphone 6 (Space Gray 16GB)</Text>
            <Text style={[styles.textStyle, { color: 'red', marginVertical: 10 }]}>QR 1900</Text>
            <Text style={styles.textStyle}>Qty: 1</Text>
          </View>
          <View style={[styles.subView, { borderBottomWidth: 1, alignItems: 'flex-end' }]}>
            <Text style={styles.textStyle}>Subtotal: ***</Text>
            <Text style={styles.textStyle}>Shipping: ***</Text>
            <Text style={styles.textStyle}>Coupon discount: ***</Text>
            <Text style={styles.textStyle}>Tax: ***</Text>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Total Amount: ***</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

function mapStateToProps(state) {
  const { language, order } = state.settingReducer;
  const navigation = state.cardNavigation;
  return { language, navigation, order };
}

export default connect(mapStateToProps, bindAction)(OrderDetail);
