'use strict';

var React = require('react');
import { StyleSheet, Text,View,Image,TouchableOpacity } from 'react-native';
var Constants = require("../../app/common/Constants")
import {Avatar} from '../index';

const SlideItem = (props) => {
    var {data} = props
    return (
      <TouchableOpacity onPress={()=>{return props.onPress(data)}} activeOpacity={0.8}>
        <View style={styles.container}>
          <Avatar name={props.avatarName} style={styles.icon} backgroundColor={props.avatarColor}/>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:12,
  },
  icon: {
    marginRight: 20,
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: "white",
  },
  selectedTitle: {
    color: "blue",
  },
});

export default SlideItem;
