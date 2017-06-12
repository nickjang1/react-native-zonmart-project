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
    fontSize: 16,
    color: theme.white,
    alignSelf: 'center',
  },
  language: {
    color: theme.white,
    fontSize: 16,
  },
  subView: {
    flex: 2.3,
    height: theme.deviceHeight / 5.5,
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.darkGray,
  },
  priceText: {
    fontSize: 14,
    marginVertical: 5,
  },
  titleText: {
    flex: 1,
    fontSize: 14,
    marginBottom: 5,
    width: theme.deviceWidth / 2,
  },
  mainView: {
    flex: 1,
    backgroundColor: theme.white,
    padding: 10,
  },
  avatar: {
    width: theme.deviceWidth / 5,
    height: theme.deviceHeight / 8,
  },
  detailView: {
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  countText: {
    width: theme.deviceWidth / 4,
    height: theme.deviceWidth / 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.darkGray,
    color: theme.nearBlack,
    paddingHorizontal: 10,
  },
  couponView: {
    flex: 1,
    height: theme.deviceHeight / 12,
    justifyContent: 'center',
    marginTop: 10,
    padding: 5,
    backgroundColor: theme.darkGray,
  },
  couponInput: {
    borderRadius: 5,
    backgroundColor: theme.white,
  },
  bottomView: {
    flex: 2,
    height: theme.deviceHeight / 6,
    alignItems: 'flex-end',
    paddingVertical: 20,
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
  recycleView: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  recycleBtn: {
    color: theme.nearBlack,
  },
});
