import React from 'react';
import {TouchableOpacity, StyleSheet, View,Image } from 'react-native';
import {Text,Avatar} from "../index"
var Constants = require("../../app/common/Constants")
import CacheableImage from 'react-native-cacheable-image'

const HomeCell = (props) => {
  const {data,watched} = props
  var avatarName = "AL"
  var avatarColor = "#0470b1"
  if (typeof global.categoryStyle !== "undefined" && global.categoryStyle.hasOwnProperty(data.categoryId)) {
    avatarName = global.categoryStyle[data.categoryId].avatarName
    avatarColor = global.categoryStyle[data.categoryId].avatarColor
  }
  return (
      <TouchableOpacity onPress={()=>{return props.onPress(data)}} style={styles.container} activeOpacity={0.8}>
          <View style={styles.imgContainer}>
            <CacheableImage defaultSource={require("../../app/images/ic_default.jpg")} style={[styles.image,watched && styles.imgWatched]} source={{uri:data.imageUrl}} borderTopLeftRadius={3} borderTopRightRadius={3}>
                <View style={styles.watchedContainer}>
                  {watched && <Text style={styles.watched}>WATCHED</Text>}
                </View>
                <View style={styles.durationContainer}>
                  <Text style={styles.duration}>{data.duration}</Text>
                </View>
            </CacheableImage>
          </View>
          <View style={styles.content}>
            <Avatar name={avatarName} style={styles.avatar} backgroundColor={avatarColor}/>
            <View style={styles.containerText}><Text style={styles.title} >{data.title}</Text></View>
          </View>
      </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginLeft:8,
    marginRight:5,
    marginTop:8,
    backgroundColor:Constants.DARK_GRAY_COLOR,
    borderRadius:3
  },
  watchedContainer:{
    flex:0.5,
    alignItems:"flex-end",
    justifyContent:"flex-start",
  },
  watched:{
    marginTop:5,
    marginRight:5,
    padding:3,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:"white",
    fontSize:13,
  },
  durationContainer:{
    flex:0.5,
    alignItems:"flex-end",
    justifyContent:"flex-end",
  },
  duration:{
    marginBottom:5,
    marginRight:5,
    padding:3,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:"white",
    fontSize:13,
  },
  imgContainer:{
    overflow: 'hidden',
    borderTopLeftRadius:3,
    borderTopRightRadius:3
  },
  image:{
    height:150,
  },
  imgWatched:{
    opacity:0.5
  },
  content:{
    flex:1,
    flexDirection:"row"
  },
  avatar:{
    margin:5
  },
  containerText:{
    flex:1,
    margin:5,
    justifyContent:"center",
  },
  title:{
    fontSize:16,
    backgroundColor: 'rgba(0,0,0,0)',
    color:"white",
    flexWrap: 'wrap'
  }
});

export default HomeCell;
