'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  SliderIOS,
} = React;

var MultiSlider = require('./Slider.js');

var Slider = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sliders!</Text>
        <View style={styles.sliders}>
          <Text style={styles.text}>One Marker</Text>
          <MultiSlider sliderWidth={300} />
          <Text style={styles.text}>Two Markers</Text>
          <MultiSlider values={[3,7]} sliderWidth={300} />
          <Text style={styles.text}>Native RCT Slider</Text>
          <SliderIOS />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  sliders: {
    margin: 20,
    width: 300
  },
  text: {
    alignSelf: "center"
  },
  title: {
    fontSize:30
  }


});

AppRegistry.registerComponent('SliderExample', () => Slider);
