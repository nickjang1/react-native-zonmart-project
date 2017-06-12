import Types from './ActionTypes';

export const attemptLogin = user =>
  ({ type: Types.LOGIN_ATTEMPT, user });

export const loginSuccess = user =>
  ({ type: Types.LOGIN_SUCCESS, user });

export const loginFailure = error =>
  ({ type: Types.LOGIN_FAILURE, error });

export const openDrawer = () =>
({ type: Types.OPEN_DRAWER });

export const closeDrawer = () =>
({ type: Types.CLOSE_DRAWER });

export const setLanguage = language =>
({ type: Types.SET_LANGUAGE, language });

export const setCategory = category =>
({ type: Types.SET_CATEGORY, category });

export const setDetail = data =>
({ type: Types.SET_DETAIL, data });

export const setOrder = data =>
({ type: Types.SET_ORDER, data });

export const homeAttempt = () =>
({ type: Types.HOME_ATTEMPT });

export const homeSuccess = products =>
({ type: Types.HOME_SUCCESS, products });

export const homeFailure = error =>
({ type: Types.HOME_FAILURE, error });

export const categoryAttempt = categoryID =>
({ type: Types.CATEGORY_ATTEMPT, categoryID });

export const categorySuccess = products =>
({ type: Types.CATEGORY_SUCCESS, products });

export const categoryFailure = error =>
({ type: Types.CATEGORY_FAILURE, error });

export const signupAttempt = user =>
  ({ type: Types.SIGNUP_ATTEMPT, user });

export const signupSuccess = user =>
  ({ type: Types.SIGNUP_SUCCESS, user });

export const signupFailure = error =>
  ({ type: Types.SIGNUP_FAILURE, error });

export const forgotAttempt = user =>
({ type: Types.FORGOT_ATTEMPT, user });

export const forgotSuccess = user =>
({ type: Types.FORGOT_SUCCESS, user });

export const forgotFailure = error =>
({ type: Types.FORGOT_FAILURE, error });

export const checkoutDelivery = user =>
({ type: Types.CHECKOUT_DELIVERY, user });

export const checkoutBilling = user =>
({ type: Types.CHECKOUT_BILLING, user });

export const checkoutAttempt = checkoutdata =>
({ type: Types.CHECKOUT_ATTEMPT, checkoutdata });

export const checkoutSuccess = checkoutdata =>
({ type: Types.CHECKOUT_SUCCESS, checkoutdata });

export const checkoutFailure = error =>
({ type: Types.CHECKOUT_FAILURE, error });

export const userAttempt = () =>
({ type: Types.USER_ATTEMPT });

export const userSuccess = user =>
({ type: Types.USER_SUCCESS, user });

export const userFailure = error =>
({ type: Types.USER_FAILURE, error });

export const cartAttempt = () =>
({ type: Types.CART_ATTEMPT });

export const cartSuccess = cart =>
({ type: Types.CART_SUCCESS, cart });

export const cartFailure = error =>
({ type: Types.CART_FAILURE, error });

export const addCartAttempt = id =>
({ type: Types.ADD_CART_ATTEMPT, id });

export const addCartSuccess = cart =>
({ type: Types.ADD_CART_SUCCESS, cart });

export const addCartFailure = error =>
({ type: Types.ADD_CART_FAILURE, error });

export const delCartAttempt = id =>
({ type: Types.DEL_CART_ATTEMPT, id });

export const delCartSuccess = cart =>
({ type: Types.DEL_CART_SUCCESS, cart });

export const delCartFailure = error =>
({ type: Types.DEL_CART_FAILURE, error });

export const searchAttempt = search =>
({ type: Types.SEARCH_ATTEMPT, search });

export const searchSuccess = products =>
({ type: Types.SEARCH_SUCCESS, products });

export const searchFailure = error =>
({ type: Types.SEARCH_FAILURE, error });

export const reviewAttempt = id =>
({ type: Types.REVIEW_ATTEMPT, id });

export const reviewSuccess = review =>
({ type: Types.REVIEW_SUCCESS, review });

export const reviewFailure = error =>
({ type: Types.REVIEW_FAILURE, error });

export const provinceAttempt = () =>
({ type: Types.PROVINCE_ATTEMPT });

export const provinceSuccess = province =>
({ type: Types.PROVINCE_SUCCESS, province });

export const provinceFailure = error =>
({ type: Types.PROVINCE_FAILURE, error });

export const orderAttempt = () =>
({ type: Types.ORDER_ATTEMPT });

export const orderSuccess = orders =>
({ type: Types.ORDER_SUCCESS, orders });

export const orderFailure = error =>
({ type: Types.ORDER_FAILURE, error });

export const detailAttempt = id =>
({ type: Types.DETAIL_ATTEMPT, id });

export const detailSuccess = detail =>
({ type: Types.DETAIL_SUCCESS, detail });

export const detailFailure = error =>
({ type: Types.DETAIL_FAILURE, error });
