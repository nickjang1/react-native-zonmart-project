import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import Store from 'react-native-simple-store';
import theme from '../../themes/base-theme';
import Global from '../../Global';
import { userAttempt } from '../../actions/Creators';

const launchScreen = require('../../images/launchscreen.png');


const {
  replaceAt,
} = actions;

class SplashPage extends Component {
  static propTypes = {
    replaceAt: React.PropTypes.func,
    userAttempt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  componentWillMount() {
    Store.get('token')
    .then((token) => {
      if (token) {
        Global.user_token = token;
        this.replaceRoute('home');
        this.props.userAttempt();
      } else {
        this.replaceRoute('login');
      }
    });
  }
  replaceRoute(route) {
    this.props.replaceAt('splashscreen', { key: route }, this.props.navigation.key);
  }
  render() {
    return (
      <Image
        source={launchScreen}
        style={{ height: theme.deviceHeight, width: theme.deviceWidth }}
        resizeMode={'stretch'}
      />
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    userAttempt: () => dispatch(userAttempt()),
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});
export default connect(mapStateToProps, bindActions)(SplashPage);
