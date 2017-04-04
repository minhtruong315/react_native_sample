import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform
}from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

import YouTube from 'react-native-youtube'
import BaseList from "../Base/BaseList"
import {ListItem,List} from "../../../theme"
import {Constants} from '../../common'
import EventEmitter from 'EventEmitter';

class Detail extends BaseList {

  constructor(props){
    super(props)
    this.enableLoadMore = false
  }

  renderContent(){
    return (
      <View style={{flex:1}}>
        <YouTube
          ref="youtubePlayer"
          videoId={this.props.selectedClip.videoId} // The YouTube video ID
          play={true}           // control playback of video with true/false
          hidden={false}        // control visiblity of the entire view
          playsInline={true}    // control whether the video should play inline
          loop={false}          // control whether the video should loop when ended

          onReady={(e)=>{this.setState({isReady: true})}}
          onChangeState={(e)=>{this.setState({status: e.state})}}
          onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
          onError={(e)=>{this.setState({error: e.error})}}
          onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

          style={{alignSelf: 'stretch', height: 300, backgroundColor: Constants.DARK_GRAY_COLOR}}
          apiKey="AIzaSyCW7r3iGSD_XQmhCnbyJL5d5WhOrGCp2VA"
          />

        <List
          enableLoadMore={this.enableLoadMore}
          data={this.props.dataList}
          style={{backgroundColor:Constants.LIGHT_GRAY_COLOR}}
          isRequesting={this.props.isShowProgress}
          beginLoadmore={this.beginLoadmore.bind(this)}
          renderRow={this.renderRow.bind(this)}
          />
      </View>
    )
  }

  componentDidMount(){
    this.props.getRelativeClips()
    this.props.passProps.events.addListener(Constants.EVENT_EMITTER_BACK, this.onBack,this)
  }

  onBack(args){
      Actions.pop()
  }

  onPress(clip){
    this.props.clickClip(clip)
    this.props.getRelativeClips()
  }

  renderRow(rowData, sectionID, rowID){
      return <ListItem data={rowData} onPress={this.onPress.bind(this)}/>;
  }

}

Detail.defaultProps = {
  dataList: []
};

function mapStateToProps(state) {
  return {
    dataList:state.clipsReducers.relativeClips,
    selectedClip:state.clipsReducers.selectedClip,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
