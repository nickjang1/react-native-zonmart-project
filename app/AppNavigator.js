
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/Creators';

import Login from './components/login/';
import Signup from './components/signup/';
import ForgotPassword from './components/forgotpassword/';
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import CartCategory from './components/cartcategory/';
import CategoryDetail from './components/categorydetail/';
import CartShopping from './components/cartshopping';
import Checkout1 from './components/checkout1';
import Checkout2 from './components/checkout2';
import Checkout3 from './components/checkout3';
import Thankyou from './components/thankyou';
import UpdateProfile from './components/updateprofile';
import MyOrder from './components/myorder';
import OrderDetail from './components/orderdetail';
import Help from './components/help';

import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'forgotpassword':
        return <ForgotPassword />;
      case 'home':
        return <Home />;
      case 'cartcategory':
        return <CartCategory />;
      case 'cartshopping':
        return <CartShopping />;
      case 'checkout1':
        return <Checkout1 />;
      case 'checkout2':
        return <Checkout2 />;
      case 'checkout3':
        return <Checkout3 />;
      case 'thankyou':
        return <Thankyou />;
      case 'categorydetail':
        return <CategoryDetail />;
      case 'updateprofile':
        return <UpdateProfile />;
      case 'myorder':
        return <MyOrder />;
      case 'orderdetail':
        return <OrderDetail />;
      case 'help':
        return <Help />;
      default :
        return <Login />;
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        negotiatePan
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(AppNavigator);
