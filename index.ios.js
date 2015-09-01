'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text
} = React;

var MultiSlider = require('./Slider.js');

var Slider = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>One Marker</Text>
        <MultiSlider values={[100]}/>
        <Text>Two Marker</Text>
        <MultiSlider values={[100,200]} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('Slider', () => Slider);
