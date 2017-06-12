import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  subView: {
    paddingHorizontal: 5,
    paddingVertical: 10,
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
  saftyIcon: {
    width: 20,
    height: 25,
    marginBottom: 3,
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 12,
    marginBottom: 5,
    color: theme.nearBlack,
  },
  newMark: {
    position: 'absolute',
    right: 18,
    top: 25,
  },
  productImage: {
    padding: 5,
    borderRadius: 5,
    borderColor: theme.darkGray,
    borderWidth: 0.5,
  },
  menuView: {
    backgroundColor: '#dddddd',
    paddingVertical: 5,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.deviceWidth / 3,
  },
  menuText1: {
    color: '#1c1c1c',
    textAlign: 'center',
  },
  menuText2: {
    color: '#1c1c1c',
    fontSize: 26,
  },
});
