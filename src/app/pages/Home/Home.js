import React from 'react';
import {
  View,
  Alert,
  AsyncStorage,
  Platform,
  NetInfo
}from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

import BaseList from "../Base/BaseList"
import {HomeCell} from "../../../theme"
import {Constants} from '../../common'
import codePush from "react-native-code-push";

class Home extends BaseList {
  constructor(props){
    super(props)
    this.enableLoadMore = false
  }


  componentDidMount(){
    codePush.sync();

    this.props.getAllClips()
    this.props.passProps.events.addListener(Constants.EVENT_EMITTER_RELOAD, this.onReload,this)

    NetInfo.isConnected.addEventListener('change', (hasInternetConnection) => {
      global.isConnected = hasInternetConnection
    });
  }

  onReload(category){
    var self = this
    setTimeout(function () {
      if (category == null || typeof category === "undefined") {
        Actions.refresh({title:"Top Trailers"})
        self.props.getAllClips()
      }else{
        Actions.refresh({title:category.title})
        self.props.getClipsByCategory(category.categoryId)
      }
    }, 500)
  }

  onPress(clip){
    if (global.isConnected) {
      this.props.clickClip(clip)
      Actions.detail()
    }else{
      Alert.alert("Error","No Internet Connection")
    }
  }

  renderRow(rowData, sectionID, rowID){
      var watched = global.watchedClips.indexOf(rowData.videoId)==-1?false:true
      return <HomeCell data={rowData} onPress={this.onPress.bind(this)} watched={watched}/>;
  }

}

Home.defaultProps = {
  dataList: []
};

function mapStateToProps(state) {
  return {
    dataList:state.clipsReducers.clips,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
