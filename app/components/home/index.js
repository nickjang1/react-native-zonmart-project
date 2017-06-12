import SudokuGrid from 'react-native-smart-sudoku-grid';
import StarRating from 'react-native-star-rating';

import React, { Component } from 'react';
import { Platform, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Spinner, Icon } from 'native-base';
import { setCategory, setDetail, homeAttempt, provinceAttempt } from '../../actions/Creators';

import HeaderContent from './../homeHeader';
import SearchContent from './../homeHeader/search';
import navigateTo from '../../actions/sideBarNav';
import theme from '../../themes/base-theme';
import gstyles from '../../themes/gstyle';
import styles from './styles';
import Global from '../../Global';

const columnCount = 2;
// const newMarKIcon = require('../../images/new-mark.png');
const safetyIcon = require('../../images/shield-icon.png');

class Home extends Component {
  static propTypes = {
    navigateTo: React.PropTypes.func,
    setCategory: React.PropTypes.func,
    homeAttempt: React.PropTypes.func,
    provinceAttempt: React.PropTypes.func,
    language: React.PropTypes.number,
    setDetail: React.PropTypes.func,
    attempting: React.PropTypes.bool,
  }

  componentWillMount() {
    this.props.homeAttempt();
    this.props.provinceAttempt();
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  gotoProducts(category) {
    this.props.setCategory(category);
    this.navigateTo('cartcategory');
  }
  gotoDetail(data) {
    this.props.setDetail(data.id);
    this.navigateTo('categorydetail');
  }
  _renderGridCell = data => (
    <View style={styles.subView}>
      <TouchableOpacity
        onPress={() => this.gotoDetail(data)}
        style={styles.productImage}
      >
        <Image
          source={{ uri: data.pictures.length === 0 ?
            'http://zonmart.websitedemo.today/uploads/products/45hVVg3wAunc5JM4Anp4UsYkxtc6qy.jpeg'
            : `http://zonmart.websitedemo.today/uploads/products/${data.pictures[0].name}` }}
          style={{ height: theme.deviceHeight / 3 }}
        />
      </TouchableOpacity>
      {/* <Thumbnail
        size={40}
        source={newMarKIcon}
        style={styles.newMark}
      />*/}
      <View style={[gstyles.center, { alignItems: 'flex-start', marginLeft: 5 }]}>
        <Text style={styles.titleText}>
          {this.props.language ? data.name_hi : data.name}
        </Text>
        <StarRating
          disabled
          maxStars={5}
          starSize={14}
          rating={+data.rating}
          selectedStar={rating => this.onRating(rating)}
          starColor={theme.yellow}
        />
        <View style={styles.priceView}>
          <Text style={styles.priceText}>
            QR{data.price}
          </Text>
          <Text style={styles.discountText}>
            QR{data.price_real}
          </Text>
        </View>
      </View>
    </View>
  )
  render() {
    const { products } = this.props;
    const mainView = !this.props.attempting ?
      (<SudokuGrid
        columnCount={columnCount}
        dataSource={products}
        renderCell={this._renderGridCell}
      />) :
      <Spinner color="blue" style={{ alignSelf: 'center' }} animating={this.props.attempting} />;
    return (
      <Container theme={theme}>
        <Header
          style={{ flexDirection: 'column',
            elevation: 0,
            paddingTop: (Platform.OS === 'ios') ? 20 : 0,
            justifyContent: 'space-between',
          }}
        >
          <HeaderContent />
        </Header>
        <View
          backgroundColor={theme.brandPrimary}
          style={{ paddingVertical: 5 }}
        >
          <SearchContent />
        </View>
        <View>
          <ScrollView style={styles.menuView} horizontal >
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(0)}>
              <Icon name="ios-tablet-portrait" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.Electronics[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(1)}>
              <Image source={safetyIcon} style={styles.saftyIcon} />
              <Text style={styles.menuText1}>
                {Global.Languages.SafetyEquipments[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(2)}>
              <Icon name="ios-move" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.All[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(3)}>
              <Icon name="logo-buffer" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.FeaturedProducts[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(4)}>
              <Icon name="ios-card" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.NewProducts[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(5)}>
              <Icon name="ios-color-filter" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.HotDeals[this.props.language]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.gotoProducts(6)}>
              <Icon name="ios-cog" style={styles.menuText2} />
              <Text style={styles.menuText1}>
                {Global.Languages.SpecialOffers[this.props.language]}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1, backgroundColor: theme.white }}>
          { mainView }
        </ScrollView>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    setCategory: category => dispatch(setCategory(category)),
    homeAttempt: () => dispatch(homeAttempt()),
    setDetail: data => dispatch(setDetail(data)),
    provinceAttempt: () => dispatch(provinceAttempt()),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  const { products, attempting } = state.productsReducer;
  return { language, products, attempting };
}

export default connect(mapStateToProps, bindAction)(Home);
