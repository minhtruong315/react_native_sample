import React from 'react';
import {TouchableOpacity, StyleSheet, View,Image } from 'react-native';
import {Text} from "../index"
var Constants = require("../../app/common/Constants")
import CacheableImage from 'react-native-cacheable-image'

const ListItem = (props) => {
  const {data} = props
  return (
    <TouchableOpacity onPress={()=>{return props.onPress(data)}} style={styles.container} activeOpacity={0.8}>
        <CacheableImage defaultSource={require("../../app/images/ic_default.jpg")} style={styles.image} source={{uri:data.imageUrl}}>
            <Text style={styles.duration}>{data.duration}</Text>
        </CacheableImage>
        <Text style={styles.title} >{data.title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    margin:5,
    backgroundColor:Constants.DARK_GRAY_COLOR,
    alignItems:"center",
  },
  duration:{
    marginBottom:2,
    marginRight:2,
    padding:3,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:"white",
    fontSize:13,
  },
  image:{
    width:90,
    height:70,
    alignItems:"flex-end",
    justifyContent:"flex-end",
    margin:5
  },
  title:{
    flex:1,
    fontSize:16,
    backgroundColor: 'rgba(0,0,0,0)',
    color:"white",
    marginRight:5,
    padding:5,
    flexWrap: 'wrap'
  }
});

export default ListItem;
