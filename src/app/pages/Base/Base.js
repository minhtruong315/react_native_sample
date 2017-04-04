import React from 'react';
import {
  StyleSheet,
  View,
}from 'react-native'
import {ProgressView} from "../../../theme"

class Base extends React.Component {
  render(){
    return (
      <View style={{flex:1}}>
        {this.renderContent()}

        {this.props.isShowProgress && <ProgressView />}
      </View>
    )
  }

  renderContent(){

  }
}

export default Base;
