'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  PanResponder,
  View,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  fullTrack: {
    flexDirection: 'row',
  },
  marker: {
  },
  track: {
    justifyContent: 'center'
  }
});

var stepLength;



var Slider = React.createClass({
  propTypes: {
    values: PropTypes.arrayOf(PropTypes.number),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    array: PropTypes.array,
    containerStyle: PropTypes.object,
    trackStyle: PropTypes.object,
    selectedStyle: PropTypes.object,
    unselectedStyle: PropTypes.object,
    markerStyle: PropTypes.object,
  },

  getDefaultProps: function() {

    return {
      values: [5],
      array: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      selectedStyle: {
        backgroundColor: 'blue'
      },
      unselectedStyle: {
        backgroundColor: 'grey'
      },
      containerStyle: {
        height:100,
      },
      fullTrackStyle: {
        height:10,
      },
      trackStyle: {
        borderRadius: 4,
      },
      markerStyle: {
        height:30,
        width: 30,
        borderRadius: 15,
        backgroundColor:"lightgrey",
        left: -15,
        borderWidth: 0.5,
        borderColor: 'grey',
      },
      sliderWidth: 280
    };
  },
  getInitialState: function() {
    var initialValues = this.props.values;
    return {
      pastOne: initialValues[0],
      pastTwo: initialValues[1],
      positionOne: initialValues[0],
      positionTwo: initialValues[1]
    };
  },
  componentWillMount: function () {

    this._panResponderOne = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => console.log("poop",gestureState),
      onPanResponderMove: (evt, gestureState) => this.moveOne(gestureState),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this.endOne(gestureState),
      onPanResponderTerminate: (evt, gestureState) => console.log('end'),
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });
    this._panResponderTwo = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => console.log(arguments, "argument", gestureState),
      onPanResponderMove: (evt, gestureState) => this.moveTwo(gestureState),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this.endTwo(gestureState),
      onPanResponderTerminate: (evt, gestureState) => console.log('end'),
      onShouldBlockNativeResponder: (evt, gestureState) => true
    });

  },

  moveOne(gestureState) {
    var unconfined  = gestureState.dx + this.state.pastOne;
    var bottom      = 0;
    var top         = this.state.positionTwo;
    var confined    = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined);
    this.setState({
      positionOne: confined
    });
  },

  endOne(gestureState) {
    this.setState({
      pastOne: this.state.positionOne,
    });
  },

  moveTwo(gestureState) {
    var unconfined  = gestureState.dx + this.state.pastTwo;
    var bottom      = this.state.positionOne;
    var top         = this.props.sliderWidth;
    var confined    = unconfined < bottom ? bottom : (unconfined > top ? top : unconfined);

    this.setState({
      positionTwo: confined
    });
  },

  endTwo(gestureState) {
    this.setState({
      pastTwo: this.state.positionTwo,
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
              style={[this.props.markerStyle]}
              {...this._panResponderOne.panHandlers}
            />
          </View>
          {twoMarkers && (
            <View style={[this.props.trackStyle, styles.track, trackThreeStyle, {width: trackThreeLength}]}>
              <View
                ref={component => this._markerTwo = component}
                style={[this.props.markerStyle]}
                {...this._panResponderTwo.panHandlers}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
});



module.exports = Slider;
