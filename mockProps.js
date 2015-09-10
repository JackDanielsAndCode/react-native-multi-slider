'use strict';

var mockProps = {
  values: [5],
  onValuesChange: function (values) {
    console.log("changing", values)
  },
  onValuesChanged: function (values) {
    console.log("changed", values)
  },
  step: 1,
  min:0,
  max:10,
  slipHeight: 50,
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
    backgroundColor:'#E8E8E8',
    left: -15,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  pressedMarkerStyle: {
    backgroundColor:'#D3D3D3',
  },
  sliderWidth: 280
};

module.exports = mockProps;
