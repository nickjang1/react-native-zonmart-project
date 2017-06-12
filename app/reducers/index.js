
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import productsReducer from './productsReducer';
import forgotReducer from './forgotReducer';
import settingReducer from './settingReducer';
import categoryReducer from './categoryReducer';
import deliveryReducer from './deliveryReducer';
import billingReducer from './billingReducer';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import reviewReducer from './reviewReducer';
import provinceReducer from './provinceReducer';
import orderReducer from './orderReducer';
import detailReducer from './detailReducer';

export default combineReducers({
  drawer,
  cardNavigation,
  loginReducer,
  signupReducer,
  forgotReducer,
  productsReducer,
  settingReducer,
  categoryReducer,
  deliveryReducer,
  billingReducer,
  cartReducer,
  checkoutReducer,
  reviewReducer,
  provinceReducer,
  orderReducer,
  detailReducer,
});
