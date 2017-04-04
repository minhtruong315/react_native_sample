import React from 'react';
import {StyleSheet, View } from 'react-native';
import {Text} from "../index"
var Constants = require("../../app/common/Constants")

const Avatar = (props) => {
  const {name} = props
  return (
        <View style={[styles.container,props.style,{backgroundColor:props.backgroundColor}]}>
            <Text style={styles.text}>{name}</Text>
        </View>
  );
};


const styles = StyleSheet.create({
  container:{
    backgroundColor:"blue",
    alignItems:"center",
    justifyContent:"center",
    width:50,
    height:50,
    borderRadius:25
  },
  text:{
    fontSize:14,
    fontWeight:"bold",
    backgroundColor: 'rgba(0,0,0,0)',
    color:"white",
    flexWrap: 'wrap'
  }
});

export default Avatar;
