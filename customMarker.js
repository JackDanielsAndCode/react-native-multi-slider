'use strict';

var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var {
  StyleSheet,
  Image
} = ReactNative;

var CustomMarker = createReactClass({

  propTypes: {
    pressed: PropTypes.bool,
  },

  render: function () {
    return (
      <Image
        style={styles.image}
        source={this.props.pressed ? require('./ruby.png') : require('./diamond.png')}
        resizeMode='contain'
      />
    );
  }
});

var styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40
  }
});

module.exports = CustomMarker;
