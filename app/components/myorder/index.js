
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Header, View, Text } from 'native-base';

import { orderAttempt, setOrder } from '../../actions/Creators';
import HeaderContent from './../homeHeader';
import navigateTo from '../../actions/sideBarNav';
import styles from './styles';
import theme from '../../themes/base-theme';
import Orders from '../../themes/dummyOrders.json';

let _this = null;
class MyOrder extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    orderAttempt: React.PropTypes.func,
    setOrder: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    _this = this;
  }
  componentWillMount() {
    this.props.orderAttempt();
  }
  onUpdate() {
    this.replaceRoute('login');
  }
  onGotoOrderDetail(data) {
    this.props.setOrder(data);
    this.navigateTo('orderdetail');
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'myorder');
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
        <Content padder theme={theme} style={{}} >
          <View>
            {
              this.props.orders.map(function(data) {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
                    key={data.id}
                    onPress={() => _this.onGotoOrderDetail(data)}
                  >
                    <Text style={{ flex: 3 }}>#{data.id}</Text>
                    <Text style={{ flex: 3 }}>{data.delivery_time}</Text>
                    <Text style={{ flex: 3 }}>{data.total}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    orderAttempt: () => dispatch(orderAttempt()),
    setOrder: data => dispatch(setOrder(data)),
  };
}
function mapStateToProps(state) {
  const navigation = state.cardNavigation;
  const { orders } = state.orderReducer;
  return { navigation, orders };
}

export default connect(mapStateToProps, bindActions)(MyOrder);
