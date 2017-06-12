
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Platform, Text } from 'react-native';
import { Container, Content, Header, View } from 'native-base';
import HeaderContent from './../homeHeader';
import styles from './styles';
import theme from '../../themes/base-theme';

const {
  replaceAt,
} = actions;

class Help extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
  }

  onUpdate() {
    this.replaceRoute('login');
  }
  replaceRoute(route) {
    this.props.replaceAt('updateprofile', { key: route }, 'global');
  }
  render() {
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
        <Content padder theme={theme} style={{ backgroundColor: theme.white }} >
          <Text>
            Welcome to zonmart.
            Help....
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    // attemptLogin: (user) => dispatch(attemptLogin(user)),
  };
}
function mapStateToProps(state) {
  const { attempting, loggedIn, error } = state.loginReducer;
  const navigation = state.cardNavigation;
  return { attempting, loggedIn, error, navigation };
}

export default connect(mapStateToProps, bindActions)(Help);
