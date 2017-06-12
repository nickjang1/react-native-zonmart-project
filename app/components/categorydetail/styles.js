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
  logoImage: {
    height: theme.deviceHeight / 17,
    width: theme.deviceWidth / 4.5,
    resizeMode: 'contain',
  },
  searchText: {
    marginHorizontal: 10,
    borderColor: 'transparent',
    backgroundColor: theme.white,
    borderRadius: 5,
  },
  language: {
    color: theme.white,
    fontSize: 16,
  },
  subView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  discountText: {
    fontSize: 12,
    marginLeft: 10,
    color: theme.darkGray,
    textDecorationLine: 'line-through',
  },
  priceView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  priceText: {
    fontSize: 14,
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 20,
    alignSelf: 'center',
    width: theme.deviceWidth / 3.2,
  },
  button1: {
    borderRadius: 20,
    alignSelf: 'center',
    width: theme.deviceWidth / 3.2,
    backgroundColor: theme.white,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: theme.darkGray,
  },
  backText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.white,
  },
});
