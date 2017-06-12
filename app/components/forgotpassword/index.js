import React, { Component } from 'react';
import { Image, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, InputGroup, Input, Button, View } from 'native-base';
import Toast from 'react-native-simple-toast';

import styles from './styles';
import gstyle from '../../themes/gstyle';
import theme from '../../themes/base-theme';
import { forgotAttempt } from '../../actions/Creators';
import utils from '../../utils';


const {
  replaceAt,
} = actions;

const logo = require('../../images/logo.png');

class ForgotPassword extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    forgotAttempt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      scroll: false,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.onBack();
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      Toast.show('Please check your email!', Toast.LONG);
      this.replaceRoute('login');
    } else if (nextProps.error) {
      Toast.show('This email address is wrong or unregister !', Toast.LONG);
    }
  }

  onResetPassword() {
    const email = this.state.email;
    if (email === '') {
      alert('Please input your email!');
    } else if (utils.validateEmail(email)) {
      this.props.forgotAttempt({ user: {
        email: this.state.email,
      } });
    } else {
      alert('Invalid email format!');
    }
  }

  onBack() {
    this.replaceRoute('login');
  }

  replaceRoute(route) {
    this.props.replaceAt('forgotpassword', { key: route }, 'global');
  }
  render() {
    return (
      <Container>
        <Content theme={theme} style={{ backgroundColor: theme.brandPrimary }} >
          <View style={styles.logoView}>
            <Image source={logo} style={styles.shadow} />
          </View>
          <View style={[{ padding: 15, paddingTop: 0 }, gstyle.center]}>
            <Text style={styles.welcomeText}>Reset Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack, padding: 0 }}
                  placeholder="Email Address"
                  value={this.state.email}
                  keyboardType={'email-address'}
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={email => this.setState({ email })}
                />
              </InputGroup>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={[styles.login, { backgroundColor: theme.yellow }]}
                textStyle={{ color: theme.nearBlack }}
                onPress={() => this.onResetPassword()}
              >
                    Reset
              </Button>
              <Button
                style={[styles.login,
                  { backgroundColor: theme.white, marginLeft: theme.deviceWidth / 25 }]}
                textStyle={{ color: theme.nearBlack }}
                onPress={() => this.onBack()}
              >
                    Back
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    forgotAttempt: user => dispatch(forgotAttempt(user)),
  };
}
function mapStateToProps(state) {
  const { attempting, success, error } = state.forgotReducer;
  return { attempting, success, error };
}

export default connect(mapStateToProps, bindActions)(ForgotPassword);
