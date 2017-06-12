import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  links: {
    paddingTop: 7,
    paddingBottom: 7,
    borderBottomColor: 'transparent',
  },
  links2: {
    borderBottomColor: 'transparent',
    paddingLeft: 25,
  },
  image: {
    alignSelf: 'stretch',
        // resizeMode: 'cover',
    height: deviceHeight / 3,
    width: null,
    position: 'relative',
    backgroundColor: theme.brandPrimary,
  },
  thumbnail: {
    position: 'absolute',
    left: theme.deviceWidth / 20,
    top: theme.deviceWidth / 10,
    width: theme.deviceWidth / 4,
    height: theme.deviceHeight / 8.5,
  },
  sidebarIconView: {
    alignItems: 'flex-start',
    width: 30,
    height: 30,
    borderRadius: 15,
    paddingLeft: 6,
    paddingTop: (Platform.OS === 'android') ? 4 : 0,
    marginRight: 17,
  },
  sidebarList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sidebarIcon: {
    fontSize: 21,
    top: (Platform.OS === 'ios') ? 4 : 0,
    backgroundColor: 'transparent',
  },
  list: {
    paddingBottom: 10,
  },
  underView: {
    alignItems: 'center',
    borderBottomColor: '#a6a4a4',
    borderBottomWidth: 1,
  },
  linkText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
  },
  name: {
    color: '#fff',
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 20,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});
