
import theme from '../../themes/base-theme';

const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.darkGray,
    padding: 15,
    margin: 5,
  },
});
