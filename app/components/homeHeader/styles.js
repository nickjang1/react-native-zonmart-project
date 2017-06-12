import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

module.exports = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    marginLeft: (Platform.OS === 'ios') ? undefined : -15,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginLeft: 2,
    marginRight: 2,
    paddingVertical: 10,
  },
  logoImage: {
    height: theme.deviceHeight / 18,
    width: theme.deviceWidth / 8,
    resizeMode: 'contain',
  },
  searchText: {
    marginHorizontal: 10,
    width: theme.deviceWidth * 0.85,
    borderColor: 'transparent',
    backgroundColor: theme.white,
    borderRadius: 5,
  },
  language: {
    color: theme.white,
    fontSize: 16,
  },
});
