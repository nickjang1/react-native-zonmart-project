import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  headerView: {
    flexDirection: 'row',
    width: theme.deviceWidth,
    paddingHorizontal: 10,
  },
  backText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.white,
  },
  language: {
    color: theme.white,
    fontSize: 16,
  },
  mainView: {
    flex: 1,
    backgroundColor: theme.white,
    padding: 10,
  },
  detailView: {
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  countText: {
    width: theme.deviceWidth / 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.darkGray,
    color: theme.nearBlack,
    textAlign: 'center',
  },
  couponView: {
    flex: 1,
    height: theme.deviceHeight / 13,
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  couponInput: {
    borderRadius: 5,
    backgroundColor: theme.white,
  },
  bottomView: {
    flex: 2,
    height: theme.deviceHeight / 6,
  },
  checkoutBtn: {
    backgroundColor: theme.yellow,
    borderRadius: 15,
    width: 120,
    height: 35,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  provinceView: {
    flex: 1,
    marginVertical: 3,
    borderRadius: 6,
    borderColor: '#DDD',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
