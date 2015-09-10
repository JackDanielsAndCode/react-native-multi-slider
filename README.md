# react-native-multi-slider
Pure JS react native slider component with one or two markers.


## Examples

 Try these cases by yourself very easy, Just open `iOS/Slider.xcodeproj` with Xcode, then press `Cmd + R`; you may edit `index.ios.js` to try building your own custom sliders. Feel free to make a PR if you are particularly proud of your slider and want it to feature.

### [examples/basic.js](https://github.com/leecade/react-native-swiper/blob/master/index.ios.js)

![](link to gif file)


## Getting Started

- [Installation](#installation)
- [Properties](#properties)
  + [Basic Setup & Values](#basic-setup--values)
  + [Events](#events)
  + [Custom Style](#custom-style)
- [Question & Suggestions](#questions--suggestions)


### Installation

```bash
$ npm i react-native-multi-slider --save
```

### Properties

#### Basic Setup & Values

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| values | true | `array` | An array containing one or two values (determines number of markers) that are the initial marker values. Note these must be possible values from your set up.|
| optionsArray | true | `array` | Set to `true` enable auto play mode. |
| min | 2.5 | `number` | Delay between auto play transitions (in second). |
| max | true | `bool` | Cycle direction control. |
| step | true | `bool` | Cycle direction control. |

#### Events

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| onValuesChangeStart | true | `func` | Set to `true` to enable continuous loop mode. |
| onValuesChange | 0 | `func` | Index number of initial slide. |
| onValuesChangeFinish | false | `func` | Set to `true` make control buttons visible. |

#### Custom Style

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| width | - | `number` | If no specify default enable fullscreen mode by `flex: 1`. |
| height | - | `number` | If no specify default fullscreen mode by `flex: 1`. |
| style | {...} | `style` | See default style in source. |


## Questions & Suggestions

Feel free to  [create an issue](https://github.com/JackDanielsAndCode/react-native-multi-slider/issues/new) x
