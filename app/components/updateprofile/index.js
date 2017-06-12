import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Header, InputGroup, Input, Button, View, Icon, Text } from 'native-base';
import styles from './styles';
import theme from '../../themes/base-theme';
import Global from '../../Global';

const {
  replaceAt,
  popRoute,
} = actions;

class UpdateProfile extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    cardNavigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    language: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    const password = '';
    const { firstname, lastname, address1, address2,
      postalcode, city, province, phone, email,
    } = props.deliveryReducer;
    this.state = {
      firstname,
      lastname,
      address1,
      address2,
      postalcode,
      city,
      province,
      phone,
      email,
      password,
      scroll: false,
    };
  }
  onUpdate() {
    this.replaceRoute('login');
  }
  onGoHome() {
    this.popRoute();
  }
  replaceRoute(route) {
    this.props.replaceAt('updateprofile', { key: route }, this.props.cardNavigation.key);
  }
  popRoute() {
    this.props.popRoute(this.props.cardNavigation.key);
  }
  render() {
    return (
      <Container theme={theme}>
        <Header>
          <View style={styles.headerView}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => this.onGoHome()}
            >
              <Icon name="md-arrow-back" style={{ fontSize: 22 }} />
              <Text style={styles.backText}>
                {Global.Languages.UpdateProfile[this.props.language]}
              </Text>
            </TouchableOpacity>
          </View>
        </Header>
        <Content padder theme={theme} style={{ backgroundColor: theme.white }} >
          <View style={styles.inputContainer}>
            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack }}
                  placeholder="Email Address"
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </InputGroup>
            </View>
            <View style={{ marginBottom: 20 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack }}
                  placeholder="Password"
                  placeholderTextColor={theme.nearBlack}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </InputGroup>
            </View>

            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack }}
                  placeholder="Firstname"
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={firstname => this.setState({ firstname })}
                  value={this.state.firstname}
                />
              </InputGroup>
            </View>

            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack }}
                  placeholder="Lastname"
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={lastname => this.setState({ lastname })}
                  value={this.state.lastname}
                />
              </InputGroup>
            </View>
            <View style={{ marginBottom: 10 }}>
              <InputGroup borderType="regular" style={{ borderRadius: 5, backgroundColor: theme.white }}>
                <Input
                  style={{ color: theme.nearBlack }}
                  placeholder="Phone"
                  placeholderTextColor={theme.nearBlack}
                  onChangeText={phone => this.setState({ phone })}
                  value={this.state.phone}
                />
              </InputGroup>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                style={[styles.login, { backgroundColor: theme.yellow }]}
                textStyle={{ color: theme.nearBlack }}
                onPress={() => this.onUpdate()}
              >
                {Global.Languages.Update[this.props.language]}
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
    popRoute: key => dispatch(popRoute(key)),
  };
}
function mapStateToProps(state) {
  const { cardNavigation } = state;
  const { language } = state.settingReducer;
  const { deliveryReducer } = state;
  return { language, cardNavigation, deliveryReducer };
}

export default connect(mapStateToProps, bindActions)(UpdateProfile);
