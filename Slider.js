'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  PanResponder,
  View,
  Text,
  TouchableHighlight
} = React;

var converter = require('./converter.js');
var mockProps = require('./mockProps');

var sliderProps = {
  values: PropTypes.arrayOf(PropTypes.number),

  onValuesChangeStart: PropTypes.func,
  onValuesChange: PropTypes.func,
  onValuesChangeFinish: PropTypes.func,

  slipHeight: PropTypes.number,

  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,

  optionsArray: PropTypes.array,

  containerStyle: PropTypes.object,
  trackStyle: PropTypes.object,
  selectedStyle: PropTypes.object,
  unselectedStyle: PropTypes.object,
  markerStyle: PropTypes.object,
  pressedMarkerStyle: PropTypes.object
};

var Slider = React.createClass({

  propTypes: sliderProps,

  getDefaultProps: function() {
    return mockProps;
  },

  getInitialState: function() {
    this.optionsArray = this.props.optionsArray || converter.createArray(this.props.min,this.props.max,this.props.step);
    this.stepLength = this.props.sliderWidth/this.optionsArray.length;

    var initialValues = this.props.values.map(value => converter.valueToPosition(value,this.optionsArray,this.props.sliderWidth));

    return {
      pressedOne: true,
      valueOne: this.props.values[0],
      valueTwo: this.props.values[1],
      pastOne: initialValues[0],
      pastTwo: initialValues[1],
      positionOne: initialValues[0],
      positionTwo: initialValues[1]
    };
  },

  componentWillMount: function () {
    var customPanResponder = function (start,move,end) {
      return PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => start(),
        onPanResponderMove: (evt, gestureState) => move(gestureState),
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => end(gestureState),
        onPanResponderTerminate: (evt, gestureState) => end(gestureState),
        onShouldBlockNativeResponder: (evt, gestureState) => true
      })
    };

    this._panResponderOne = customPanResponder(this.startOne, this.moveOne, this.endOne);
    this._panResponderTwo = customPanResponder(this.startTwo, this.moveTwo, this.endTwo);

  },

  startOne () {
    this.setState({
      onePressed: !this.state.onePressed
    });
  },

  startTwo () {
    this.setState({
      twoPressed: !this.state.twoPressed
    });
  },

  moveOne(gestureState) {
    var unconfined = gestureState.dx + this.state.pastOne;
    var bottom     = 0;
    var top        = (this.state.positionTwo - this.stepLength) || this.props.sliderWidth;
    var confined   = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined);
    var value      = converter.positionToValue(this.state.positionOne, this.optionsArray, this.props.sliderWidth);
    if (Math.abs(gestureState.dy) < this.props.slipHeight) {
      this.setState({
        positionOne: confined
      });
    }
    if ( value !== this.state.valueOne ) {
      this.setState({
        valueOne: value
      }, function () {
        var change = [this.state.valueOne];
        if (this.state.valueTwo) {
          change.push(this.state.valueTwo);
        }
        this.props.onValuesChange(change);
      });
    }
  },

  moveTwo(gestureState) {
    var unconfined  = gestureState.dx + this.state.pastTwo;
    var bottom      = this.state.positionOne + this.stepLength;
    var top         = this.props.sliderWidth;
    var confined    = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined);
    var value       = converter.positionToValue(this.state.positionTwo, this.optionsArray, this.props.sliderWidth);

    if (Math.abs(gestureState.dy) < 50) {
      this.setState({
        positionTwo: confined
      });
    }
    if ( value !== this.state.valueTwo ) {
      this.setState({
        valueTwo: value
      }, function () {
        this.props.onValuesChange([this.state.valueOne,this.state.valueTwo]);
      });
    }
  },

  endOne(gestureState) {
    this.setState({
      pastOne: this.state.positionOne,
      onePressed: !this.state.onePressed
    }, function () {
      var change = [this.state.valueOne];
      if (this.state.valueTwo) {
        change.push(this.state.valueTwo);
      }
      this.props.onValuesChanged(change);
    });
  },

  endTwo(gestureState) {
    this.setState({
      twoPressed: !this.state.twoPressed,
      pastTwo: this.state.positionTwo,
    }, function () {
      this.props.onValuesChanged([this.state.valueOne,this.state.valueTwo]);
    });
  },

  render: function() {

    var {positionOne, positionTwo} = this.state;
    var {selectedStyle, unselectedStyle, sliderWidth} = this.props;
    var twoMarkers = positionTwo;

    var trackOneLength = positionOne;
    var trackOneStyle = twoMarkers ? unselectedStyle : selectedStyle;
    var trackThreeLength = twoMarkers ? sliderWidth - (positionTwo) : 0;
    var trackThreeStyle = unselectedStyle;
    var trackTwoLength = sliderWidth - trackOneLength - trackThreeLength;
    var trackTwoStyle = twoMarkers ? selectedStyle : unselectedStyle;

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.fullTrack, this.props.fullTrackStyle, {width:sliderWidth}]}>
          <View style={[this.props.trackStyle, trackOneStyle, {width: trackOneLength}]} />
          <View style={[this.props.trackStyle, styles.track, trackTwoStyle, {width: trackTwoLength}]}>
            <View
              ref={component => this._markerOne = component}
              style={[this.props.markerStyle, this.state.onePressed && this.props.pressedMarkerStyle]}
              {...this._panResponderOne.panHandlers}
            />
          </View>
          {twoMarkers && (
            <View testID={'slide'} style={[this.props.trackStyle, styles.track, trackThreeStyle, {width: trackThreeLength}]}>
              {(positionOne !== this.props.sliderWidth) && (
                <View
                  ref={component => this._markerTwo = component}
                  style={[this.props.markerStyle, this.state.twoPressed && this.props.pressedMarkerStyle]}
                  {...this._panResponderTwo.panHandlers}
                />
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
});

module.exports = Slider;


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  fullTrack: {
    flexDirection: 'row',
  },
  track: {
    justifyContent: 'center'
  }
});
