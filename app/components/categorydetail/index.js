import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Icon, Button, Card, CardItem } from 'native-base';

import theme from '../../themes/base-theme';
import gstyles from '../../themes/gstyle';
import styles from './styles';
import Global from '../../Global';
import { addCartAttempt, setLanguage, reviewAttempt, detailAttempt } from '../../actions/Creators';

const {
  popRoute,
  replaceAt,
} = actions;

class CategoryDetail extends Component {  // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    addCartAttempt: React.PropTypes.func,
    setLanguage: React.PropTypes.func,
    reviewAttempt: React.PropTypes.func,
    detailAttempt: React.PropTypes.func,
    cardNavigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    language: React.PropTypes.number,
    detail: React.PropTypes.object,
  }

  componentWillMount() {
    this.props.detailAttempt(this.props.id);
    this.props.reviewAttempt(this.props.id);
  }
  onGotoCart() {
    this.replaceRoute('cartshopping');
  }
  onSetLanguage(language) {
    if (language === -1) {
      return;
    }
    this.props.setLanguage(language);
  }
  popRoute() {
    this.props.popRoute(this.props.cardNavigation.key);
  }
  replaceRoute(route) {
    this.props.replaceAt('categorydetail', { key: route }, 'global');
  }
  addCart(id) {
    Global.productId = '';
    this.props.addCartAttempt(id);
    this.replaceRoute('cartshopping');
  }
  buyNow(id) {
    Global.productId = id;
    this.replaceRoute('checkout1');
  }
  render() { // eslint-disable-line class-methods-use-this
    const { detaildata } = this.props;
    const { review } = this.props;
    console.log(review);
    const reviews = review.map(function (item) {
      return (
        <CardItem style={{ alignItems: 'flex-start' }} key={item.id}>
          <Text style={{ marginBottom: 5 }}>
            {item.name}
          </Text>
          <StarRating
            disabled
            maxStars={5}
            starSize={14}
            rating={+item.rating}
            selectedStar={rating => this.onrate(rating)}
            starColor={theme.yellow}
          />
          <Text style={{ marginTop: 5 }}>
            {item.text}
          </Text>
        </CardItem>
      );
    });
    const mainview = detaildata === null ? null : (
      <View style={styles.subView}>
        <View>
          <Image
            source={{ uri: detaildata.pictures.length === 0 ?
                  'http://zonmart.websitedemo.today/uploads/products/45hVVg3wAunc5JM4Anp4UsYkxtc6qy.jpeg'
                  : `http://zonmart.websitedemo.today/uploads/products/${detaildata.pictures[0].name}` }}
            style={{ height: theme.deviceHeight / 1.8 }}
          />
        </View>
        <View style={[gstyles.center, { alignItems: 'flex-start', marginLeft: 5 }]}>
          <Text style={styles.titleText}>
            {this.props.language ? detaildata.name_hi : detaildata.name}
          </Text>
          <StarRating
            disabled
            maxStars={5}
            starSize={14}
            rating={+detaildata.rating}
            selectedStar={rating => this.onrate(rating)}
            starColor={theme.yellow}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
            <Button
              style={[styles.button, { backgroundColor: theme.yellow }]}
              textStyle={{ color: theme.nearBlack }}
              onPress={() => this.addCart(detaildata.id)}
            >
              {Global.Languages.AddToCart[this.props.language]}
            </Button>
            <Button
              style={styles.button1}
              textStyle={{ color: theme.nearBlack }}
              onPress={() => this.buyNow(detaildata.id)}
            >
              {Global.Languages.BuyNow[this.props.language]}
            </Button>
          </View>
          <Text style={styles.priceText} numberOfLines={3} >
            {detaildata.description}
          </Text>
        </View>
      </View>
    );
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
              <Text style={styles.backText}>
                {Global.Languages.Detail[this.props.language]}
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
        <Content style={{ flex: 1, backgroundColor: theme.white }}>
          { mainview }
          <View>
            <Card style={{ paddingHorizontal: 10 }}>
              {reviews}
            </Card>
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
    addCartAttempt: id => dispatch(addCartAttempt(id)),
    setLanguage: language => dispatch(setLanguage(language)),
    reviewAttempt: id => dispatch(reviewAttempt(id)),
    detailAttempt: id => dispatch(detailAttempt(id)),
  };
}

function mapStateToProps(state) {
  const { cardNavigation } = state;
  const { language, id } = state.settingReducer;
  const { detaildata } = state.detailReducer;
  const { review } = state.reviewReducer;
  return { language, cardNavigation, id, detaildata, review };
}

export default connect(mapStateToProps, bindAction)(CategoryDetail);
