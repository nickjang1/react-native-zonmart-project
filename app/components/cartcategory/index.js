import SudokuGrid from 'react-native-smart-sudoku-grid';
import StarRating from 'react-native-star-rating';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Platform, TouchableOpacity, Image, Text } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Input, Icon, InputGroup, Thumbnail, Spinner } from 'native-base';

import { categoryAttempt, setDetail, searchAttempt, homeAttempt } from '../../actions/Creators';
import navigateTo from '../../actions/sideBarNav';
import theme from '../../themes/base-theme';
import gstyles from '../../themes/gstyle';
import styles from './style';
import Global from '../../Global';

const {
  popRoute,
} = actions;
const columnCount = 2;
const newMarKIcon = require('../../images/new-mark.png');

class CartCategory extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    categoryAttempt: React.PropTypes.func,
    searchAttempt: React.PropTypes.func,
    homeAttempt: React.PropTypes.func,
    setDetail: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    language: React.PropTypes.number,
    category: React.PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  componentWillMount() {
    if (this.props.category === 0) {
      this.props.categoryAttempt('electronics');
    }
    if (this.props.category === 1) {
      this.props.categoryAttempt('safety-equipments');
    }
    if (this.props.category === 2) {
      this.props.categoryAttempt('all');
    }
  }
  popRoute() {
    this.props.homeAttempt();
    this.props.popRoute(this.props.navigation.key);
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'cartcategory');
  }

  gotoDetail(data) {
    this.props.setDetail(data.id);
    this.navigateTo('categorydetail');
  }
  onSearch() {
    const { searchText } = this.state;
    if (searchText === '') {
      if (this.props.category === 0) {
        this.props.categoryAttempt('electronics');
      }
      if (this.props.category === 1) {
        this.props.categoryAttempt('safety-equipments');
      }
      if (this.props.category === 2) {
        this.props.categoryAttempt('all');
      }
    } else {
      this.props.searchAttempt(searchText);
    }
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
    let categoryName = Global.Languages.Electronics[this.props.language];
    if (this.props.category === 1) {
      categoryName = Global.Languages.SafetyEquipments[this.props.language];
    }
    if (this.props.category === 2) {
      categoryName = Global.Languages.All[this.props.language];
    }
    const { products } = this.props;
    const mainView = !this.props.attempting ?
      (<SudokuGrid
        columnCount={columnCount}
        dataSource={products}
        renderCell={this._renderGridCell}
      />) :
      <Spinner color="blue" style={{ alignSelf: 'center' }} animating={this.props.attempting} />;
    return (
      <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
        <Header
          style={{ flexDirection: 'column',
            height: (Platform.OS === 'ios') ? theme.deviceHeight * 0.12 : theme.deviceHeight * 0.09,
            elevation: 0,
            paddingTop: (Platform.OS === 'ios') ? 20 : 5,
            justifyContent: 'center',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <InputGroup borderType="regular" style={styles.searchText} >
              <Input
                style={{ padding: 0 }}
                placeholder={Global.Languages.SearchForProducts[this.props.language]}
                placeholderTextColor={theme.nearBlack}
                onChangeText={searchText => this.setState({ searchText })}
              />
            </InputGroup>
            <TouchableOpacity onPress={() => this.onSearch()}>
              <Icon name="md-search" style={{ color: theme.white, marginTop: 5 }} />
            </TouchableOpacity>
          </View>
        </Header>
        <View style={styles.menuView}>
          <TouchableOpacity
            transparent onPress={() => this.popRoute()}
            style={[gstyles.center, { flexDirection: 'row' }]}
          >
            <Icon
              name="md-arrow-back"
              style={styles.backIcon}
            />
            <Text style={{ color: theme.inverseTextColor, lineHeight: 16 }}>
              {categoryName}
            </Text>
          </TouchableOpacity>
        </View>
        <Content style={{ backgroundColor: theme.white }}>
          { mainView }
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    categoryAttempt: categoryID => dispatch(categoryAttempt(categoryID)),
    setDetail: data => dispatch(setDetail(data)),
    searchAttempt: search => dispatch(searchAttempt(search)),
    homeAttempt: () => dispatch(homeAttempt()),
  };
}

function mapStateToProps(state) {
  const navigation = state.cardNavigation;
  const { products, attempting } = state.categoryReducer;
  const { language, category } = state.settingReducer;
  return { language, navigation, category, products, attempting };
}

export default connect(mapStateToProps, bindAction)(CartCategory);
