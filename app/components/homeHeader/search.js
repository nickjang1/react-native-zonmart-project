import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { Icon, View, InputGroup, Input } from 'native-base';

import { setLanguage, searchAttempt, homeAttempt } from '../../actions/Creators';
import theme from '../../themes/base-theme';
import styles from './styles';
import Global from '../../Global';

class SearchBar extends Component {

  static propTypes = {
    setLanguage: React.PropTypes.func,
    searchAttempt: React.PropTypes.func,
    homeAttempt: React.PropTypes.func,
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
  onSearch() {
    const { searchText } = this.state;
    if (searchText === '') {
      this.props.homeAttempt();
    } else {
      this.props.searchAttempt(searchText);
    }
  }
  render() {
    return (
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
    );
  }
}

function bindAction(dispatch) {
  return {
    setLanguage: language => dispatch(setLanguage(language)),
    searchAttempt: search => dispatch(searchAttempt(search)),
    homeAttempt: () => dispatch(homeAttempt()),
  };
}

function mapStateToProps(state) {
  const { language } = state.settingReducer;
  return { language };
}

export default connect(mapStateToProps, bindAction)(SearchBar);
