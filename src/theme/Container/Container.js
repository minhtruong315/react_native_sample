import React from 'react';
import { Platform, StyleSheet, ScrollView, View } from 'react-native';

const Container = (props) => {
  const customStyle = {};

  if (props.fullWidth) {
    customStyle.paddingHorizontal = 0;
  }

  switch (props.type) {
    case "nav":
      if (Platform.OS === 'ios') {
        customStyle.paddingTop = 64;
      } else {
        customStyle.paddingTop = 54;
      }
      break;
    case "nav,tab":
        if (Platform.OS === 'ios') {
          customStyle.paddingTop = 64;
          customStyle.paddingBottom = 49;
        } else {
          customStyle.paddingTop = 54;
        }
        break;
    case "noNav":
      customStyle.paddingTop = 32;
      break;
    case "noPaddingTop":
      customStyle.paddingTop = 0;
      break;
    default:
      customStyle.paddingTop = 0;
  }

  const element = props.scroll === true
    ?
    <ScrollView contentContainerStyle={[style.container, customStyle, props.style]}>{props.children}</ScrollView>
    :
    <View style={[style.container, customStyle, props.style]}>{props.children}</View>

  return element;
};

Container.propTypes = {
  style: React.PropTypes.any,
  children: React.PropTypes.any.isRequired,
  type: React.PropTypes.string,
  noPaddingTop: React.PropTypes.bool,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 19,
    alignItems: 'stretch',
  }
});

export default Container;
