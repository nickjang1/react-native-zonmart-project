import theme from './base-theme';

const React = require('react-native');

const { StyleSheet, Platform } = React;
module.exports = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    width: null,
    height: null,
  },
});
