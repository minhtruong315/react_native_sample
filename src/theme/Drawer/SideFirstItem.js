'use strict';

var React = require('react');
import { StyleSheet,View,Image,TouchableOpacity,Platform } from 'react-native';
import {Text} from '../index';
var Constants = require("../../app/common/Constants")

const SlideFirstItem = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.container,props.style]}>
          <Text style={styles.title}>GENRE</Text>
        </View>
      </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: (Platform.OS === 'ios') ? 64 : 54,
    backgroundColor:Constants.APP_COLOR
  },
  title: {
    flex:1,
    fontSize: 15,
    color: "white",
    fontWeight:"bold",
    textAlign:"center",
    marginTop:(Platform.OS === 'ios') ? 35 : 15,
  },
});

export default SlideFirstItem;
