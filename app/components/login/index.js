
import React, { Component } from 'react';
import { Image, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

import styles from './styles';
import gstyle from '../../themes/gstyle';
import theme from '../../themes/base-theme';
import { attemptLogin } from '../../actions/Creators';
import utils from '../../utils';

const {
  replaceAt,
} = actions;
const logo = require('../../images/logo.png');

class Login extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    attemptLogin: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      scroll: false,
      focus: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.replaceRoute('home', { email: this.state.email, password: this.state.password });
    } else if (nextProps.error) {
      Toast.show('Please retype your information.', Toast.LONG);
    }
  }

  onSignup() {
    this.replaceRoute('signup');
  }
  onForgotPassword() {
    this.replaceRoute('forgotpassword');
  }
  faceBookLogin() {
    Alert.alert('Welcome faceBookLogin!');
  }
  googleLogin() {
    Alert.alert('Welcome googleLogin!');
  }
  attemptLogin() {
    const email = this.state.email;
    const password = this.state.password;

    if (password === '' && email === '') {
      Alert.alert('Please input user information!');
    } else if (utils.validateEmail(email)) {
      this.props.attemptLogin({ user: {
        email: this.state.email,
        password: this.state.password,
      } });
    } else {
      Alert.alert('Invalid email format!');
    }
  }
  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, 'global');
  }
  focusNextField = (nextField) => {
    this.refs[nextField]._textInput.focus();
  };
  render() {
    return (
      <Container>
        <Content
          theme={theme}
          style={{ backgroundColor: theme.brandPrimary }}
        >
          <Spinner visible={this.props.attempting} />
          <View style={styles.logoView}>
            <Image source={logo} style={styles.shadow} />
          </View>
          <View style={[{ height: 50 }, gstyle.center]}>
            <Text style={styles.welcomeText}>Welcome to Zonmart App</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Icon style={{ color: theme.nearBlack }} name="ios-person" />
                <Input
                  style={{ color: theme.nearBlack, padding: 0 }}
                  placeholder="Email"
                  keyboardType={'email-address'}
                  value={this.state.email}
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={email => this.setState({ email })}
                  returnKeyType="next"
                  ref="1"
                  onSubmitEditing={() => this.focusNextField('2')}
                />
              </InputGroup>
            </View>

            <View style={{ marginBottom: 20 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Icon style={{ color: theme.nearBlack }} name="ios-unlock-outline" />
                <Input
                  ref="2"
                  style={{ color: theme.nearBlack, padding: 0 }}
                  placeholder="Password"
                  value={this.state.password}
                  placeholderTextColor={theme.nearBlack}
                  secureTextEntry
                  returnKeyType="done"
                  onChangeText={password => this.setState({ password })}
                  onSubmitEditing={() => this.attemptLogin()}
                />
              </InputGroup>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                style={[styles.login, { backgroundColor: theme.yellow }]}
                textStyle={{ color: theme.nearBlack }}
                onPress={() => this.attemptLogin()}
              >
                    LOGIN
              </Button>
              <Button
                style={[styles.login, { backgroundColor: theme.white }]}
                textStyle={{ color: theme.nearBlack }}
                onPress={() => this.onSignup()}
              >
                    SIGNUP
              </Button>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              transparent
              style={styles.transparentButton}
              textStyle={{ lineHeight: (Platform.OS === 'ios') ? 15 : 18, textDecorationLine: 'underline' }}
              onPress={() => this.onForgotPassword()}
            >
              Forgot your password?
            </Button>
          </View>
          <View style={styles.marginView} />
          <View style={styles.socialView}>
            <Button
              style={[styles.socialLogin, { backgroundColor: '#495ff1' }]}
              textStyle={{ color: theme.nearBlack }}
              onPress={() => this.faceBookLogin()}
            >
              <Icon style={{ color: 'white' }} name="logo-facebook" />
            </Button>
            <Button
              style={[styles.socialLogin, { backgroundColor: '#A94741' }]}
              textStyle={{ color: theme.nearBlack }}
              onPress={() => this.googleLogin()}
            >
              <Icon style={{ color: 'white' }} name="logo-google" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    attemptLogin: user => dispatch(attemptLogin(user)),
  };
}
function mapStateToProps(state) {
  const { attempting, loggedIn, error } = state.loginReducer;
  return { attempting, loggedIn, error };
}

export default connect(mapStateToProps, bindActions)(Login);
