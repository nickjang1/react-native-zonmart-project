import apisauce from 'apisauce';
import Global from '../Global.js';

const create = (baseURL = 'http://zonmart.websitedemo.today/api/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  function json(data) {
    return JSON.stringify(data);
  }

  function formData(data) {
    const str = [];
    for (const p in data) {
      const key = encodeURIComponent(p);
      const value = encodeURIComponent(data[p]);
      str.push(`${key}=${value}`);
    }
    return str.join('&');
  }

  const login = (authData) => {
    const { email, password } = authData.user;
    return api.post('/login', json({
      email,
      password,
    }));
  };

  const signup = (authData) => {
    const { email, password, firstname, lastname, addressline1,
      addressline2, postalcode, city, province, phone } = authData.user;
    return api.post('/signup', json({
      email,
      password,
      firstname,
      lastname,
      addressline1,
      addressline2,
      postalcode,
      city,
      province,
      phone,
    }));
  };

  const forgot = (authData) => {
    const { email } = authData.user;
    return api.post('/reset', json({
      email,
    }));
  };

  const home = token => api.get(`/products/g/mobile-home?token=${token}`);

  const products = () => api.get(`/products?token=${Global.user_token}`);

  const category = categoryID => api.get(`/products/t/${categoryID}?token=${Global.user_token}`);

  const cart = () => api.get(`/cart?token=${Global.user_token}`);

  const addcart = (id) => {
    const product = id;
    const token = Global.user_token;
    const qty = 1;
    return api.post('/cart/add', json({
      product,
      token,
      qty,
    }));
  };

  const delcart = (id) => {
    const token = Global.user_token;
    return api.post('/cart/remove', json({
      id,
      token,
    }));
  };

  const user = () => {
    const token = Global.user_token;
    return api.post('/user', json({
      token,
    }));
  };

  const searchapi = search => api.get(`/products/s/${search}?token=${Global.user_token}`);

  const checkout = (data) => {
    const token = Global.user_token;
    const pid = Global.productId;
    const delivery_time = '23';
    const { firstname, lastname, address1, address2, postalcode, city,
      province, phone, email, bfirstname, blastname, baddress1, baddress2,
      bpostalcode, bcity, bprovince, bphone, bemail } = data.checkoutdata;
    return api.post('/checkout', json({
      token,
      pid,
      firstname,
      lastname,
      address1,
      address2,
      postalcode,
      city,
      province,
      phone,
      email,
      bfirstname,
      blastname,
      baddress1,
      baddress2,
      bpostalcode,
      bcity,
      bprovince,
      bphone,
      bemail,
      delivery_time,
    }));
  };
  const reviews = id => api.get(`/reviews/${id}?token=${Global.user_token}`);
  const provinceapi = () => api.get(`/provinces?token=${Global.user_token}`);
  const orderapi = () => api.get(`/orders?token=${Global.user_token}`);
  const detailapi = id => api.get(`/product/${id}?token=${Global.user_token}`);
  return {
    login,
    signup,
    forgot,
    home,
    products,
    category,
    cart,
    addcart,
    delcart,
    checkout,
    searchapi,
    user,
    reviews,
    provinceapi,
    orderapi,
    detailapi,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
