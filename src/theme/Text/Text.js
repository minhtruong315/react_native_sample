import React from 'react';
import { StyleSheet, Text } from 'react-native';

const MyText = (props) => {
    return <StandardText {...props}/>
};

const StandardText = (props) => (
    <Text {...props} style={[props.style,style.text]}>{props.children}</Text>
);

const style = StyleSheet.create({
  text: {
    fontFamily: 'Helvetica',
  }
});

export default MyText;
