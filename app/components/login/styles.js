
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
    padding: 20,
    paddingHorizontal: theme.deviceWidth / 6,
  },
  welcomeText: {
    flex: 1,
    fontSize: theme.fontSizeH3,
    textAlign: 'center',
  },
  login: {
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    width: theme.deviceWidth / 3.2,
  },
  socialLogin: {
    borderRadius: 5,
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
  socialView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.deviceWidth / 6,
  },
  marginView: {
    borderBottomWidth: 1,
    borderColor: 'white',
    marginHorizontal: theme.deviceWidth / 8,
    marginTop: 10,
    marginBottom: 20,
  },
});
