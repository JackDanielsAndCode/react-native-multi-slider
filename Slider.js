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

var defaultProps = {
  values: [50],
  step: 1,
  min:0,
  max:100,
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
    borderRadius: 5,
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


var Slider = React.createClass({
  propTypes: sliderProps,

  getDefaultProps: function() {
    return defaultProps;
  },

  getInitialState: function() {
    this.optionsArray = this.props.optionsArray || converter.createArray(this.props.min,this.props.max,this.props.step);
    var initialValues = this.props.values.map(value => converter.valueToPosition(value,this.optionsArray,this.props.sliderWidth));
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
    var bottom      = 1;
    var top         = this.state.positionTwo || this.props.sliderWidth;;
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

    var convertedValues = [positionOne,positionTwo].map(position => converter.positionToValue(position,this.optionsArray,sliderWidth))

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Text>{convertedValues}</Text>
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
            <View testID={'slide'} style={[this.props.trackStyle, styles.track, trackThreeStyle, {width: trackThreeLength}]}>
              {(positionOne !== this.props.sliderWidth) && (
                <View
                  ref={component => this._markerTwo = component}
                  style={[this.props.markerStyle]}
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

var converter = {
  valueToPosition: function (value, valuesArray, sliderLength) {
    var arrLength;
    var index = valuesArray.indexOf(value);

    if (index === -1) {
      console.log('Invalid value, array does not contain: ', value)
      return null;
    } else {
      arrLength = valuesArray.length - 1;
      return sliderLength * index / arrLength;
    }
  },
  positionToValue: function (position, valuesArray, sliderLength) {
    var arrLength;
    var index;

    if ( position < 0 || sliderLength < position ) {
      console.log('invalid position: ', position);
      return null;
    } else {
      arrLength = valuesArray.length - 1;
      index = arrLength * position / sliderLength;
      return valuesArray[Math.round(index)];
    }
  },
  createArray: function (start, end, step) {
    var i;
    var length;
    var direction = start - end > 0 ? -1 : 1;
    var result = [];
    if (!step) {
        console.log('invalid step: ', step);
        return result;
    } else {
        length = Math.abs((start - end)/step) + 1;
        for (i=0 ; i<length ; i++){
          result.push(start + i * Math.abs(step)*direction);
        }
        return result;
    }
  }
}


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

var sliderProps = {
  values: PropTypes.arrayOf(PropTypes.number),

  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,

  optionsArray: PropTypes.array,

  containerStyle: PropTypes.object,
  trackStyle: PropTypes.object,
  selectedStyle: PropTypes.object,
  unselectedStyle: PropTypes.object,
  markerStyle: PropTypes.object,
};
