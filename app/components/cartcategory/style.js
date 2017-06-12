import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  searchText: {
    borderColor: 'transparent',
    backgroundColor: theme.white,
    borderRadius: 5,
    width: theme.deviceWidth * 0.8,
    marginRight: 5,
  },
  menuView: {
    height: theme.deviceHeight / 15,
    backgroundColor: '#dddddd',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subView: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  productImage: {
    padding: 5,
    borderRadius: 5,
    borderColor: theme.darkGray,
    borderWidth: 0.5,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.inverseTextColor,
  },
  titleText: {
    fontSize: 12,
    marginBottom: 8,
    color: theme.nearBlack,
  },
  newMark: {
    position: 'absolute',
    right: 18,
    top: 25,
  },
  backIcon: {
    color: theme.inverseTextColor,
    fontSize: 22,
    paddingRight: 10,
  },
});
