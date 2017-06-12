
import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  shadow: {
    width: theme.deviceWidth / 2.2,
    height: theme.deviceHeight / 5,
    backgroundColor: 'transparent',
  },
  logoView: {
    height: theme.deviceHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: theme.deviceWidth / 10,
  },
  welcomeText: {
    flex: 1,
    fontSize: theme.fontSizeH3,
  },
  login: {
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    width: theme.deviceWidth / 3.2,
  },
  logoButton: {
    paddingHorizontal: 50,
    borderRadius: 4,
    height: 40,
    padding: 4,
  },
  transparentButton: {
    padding: 0,
    alignItems: 'flex-start',
  },
});
