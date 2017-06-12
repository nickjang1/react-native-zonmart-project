
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, InputGroup, Input, Button, View } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

import styles from './styles';
import gstyle from '../../themes/gstyle';
import theme from '../../themes/base-theme';
import { signupAttempt } from '../../actions/Creators';
import utils from '../../utils';

const {
  replaceAt,
} = actions;

const logo = require('../../images/logo.png');

class Signup extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    signupAttempt: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      scroll: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn) {
      this.replaceRoute('login');
      Toast.show('Successfully Registered!', Toast.LONG);
    }
  }
  onBack() {
    this.replaceRoute('login');
  }
  replaceRoute(route) {
    this.props.replaceAt('signup', { key: route }, 'global');
  }
  signupAttempt() {
    const email = this.state.email;
    const password = this.state.password;
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const phone = this.state.phone;

    if (password === '' || email === '' || firstname === '' || lastname === '' || phone === '') {
      alert('Please input user information!');
    } else if (utils.validateEmail(email)) {
      this.props.signupAttempt({ user: {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: this.state.phone,
      } });
    } else {
      alert('Invalid email format!');
    }
  }
  focusNextField = (nextField) => {
    this.refs[nextField]._textInput.focus();
  };
  render() {
    return (
      <Container>
        <Content theme={theme} style={{ backgroundColor: theme.brandPrimary }} >
          <View>
            <View style={styles.logoView}>
              <Image source={logo} style={styles.shadow} />
            </View>
            <View style={[{ height: 50 }, gstyle.center]}>
              <Text style={styles.welcomeText}>Signup</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={{ marginBottom: 20 }}>
                <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                  <Input
                    style={{ color: theme.nearBlack, padding: 0 }}
                    placeholder="Email Address"
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
                  <Input
                    style={{ color: theme.nearBlack, padding: 0 }}
                    placeholder="Password"
                    value={this.state.password}
                    placeholderTextColor={theme.nearBlack}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    returnKeyType="next"
                    ref="2"
                    onSubmitEditing={() => this.focusNextField('3')}
                  />
                </InputGroup>
              </View>

              <View style={{ marginBottom: 20 }}>
                <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                  <Input
                    style={{ color: theme.nearBlack, padding: 0 }}
                    placeholder="Firstname"
                    value={this.state.firstname}
                    placeholderTextColor={theme.nearBlack}
                    onChangeText={firstname => this.setState({ firstname })}
                    returnKeyType="next"
                    ref="3"
                    onSubmitEditing={() => this.focusNextField('4')}
                  />
                </InputGroup>
              </View>

              <View style={{ marginBottom: 20 }}>
                <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                  <Input
                    style={{ color: theme.nearBlack, padding: 0 }}
                    placeholder="Lastname"
                    value={this.state.lastname}
                    placeholderTextColor={theme.nearBlack}
                    onChangeText={lastname => this.setState({ lastname })}
                    returnKeyType="next"
                    ref="4"
                    onSubmitEditing={() => this.focusNextField('5')}
                  />
                </InputGroup>
              </View>
              <View style={{ marginBottom: 20 }}>
                <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                  <Input
                    style={{ color: theme.nearBlack }}
                    placeholder="Phone"
                    keyboardType={'numeric'}
                    value={this.state.phone}
                    placeholderTextColor={theme.nearBlack}
                    onChangeText={phone => this.setState({ phone })}
                    returnKeyType="next"
                    ref="5"
                    onSubmitEditing={() => this.signupAttempt()}
                  />
                </InputGroup>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  style={[styles.login, { backgroundColor: theme.yellow }]}
                  textStyle={{ color: theme.nearBlack }}
                  onPress={() => this.signupAttempt()}
                >
                      Signup
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
            <Spinner visible={this.props.attempting} />
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    signupAttempt: user => dispatch(signupAttempt(user)),
  };
}
function mapStateToProps(state) {
  const { attempting, signedIn, error } = state.signupReducer;
  return { attempting, signedIn, error };
}

export default connect(mapStateToProps, bindActions)(Signup);
