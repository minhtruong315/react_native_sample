import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
}from 'react-native'
import {Text,List,Container} from "../../../theme"
import {Constants} from '../../common'

class BaseList extends React.Component {
  render(){
    return (
      <Container type="nav" fullWidth>
        {this.props.isShowProgress && this.renderIndicator()}
        {this.renderErrorMessage(this.props.message)}
        {this.renderList()}
      </Container>
    )
  }

  renderIndicator(){
    return (<View style={style.centerView}>
        <ActivityIndicator
          animating={true}
          size="large"
        />
    </View>)
  }

  renderErrorMessage(){
    if (typeof this.props.message != 'undefined' && this.props.message.length > 0) {
      return (<View style={style.centerView}>
        <Text>{this.props.message}</Text>
      </View>)
    }
  }

  renderList(){
    if (!this.props.isShowProgress && typeof this.props.message == 'undefined') {
      return this.renderContent()
    }
  }

  renderContent(){
    return (
      <View style={{flex:1}}>
        <List
          ref="baseListView"
          enableLoadMore={this.enableLoadMore}
          data={this.props.dataList}
          style={{backgroundColor:Constants.LIGHT_GRAY_COLOR}}
          isRequesting={this.props.isShowProgress}
          beginLoadmore={this.beginLoadmore.bind(this)}
          renderRow={this.renderRow.bind(this)}
          onContentSizeChange={this.onContentSizeChange.bind(this)}
          />
      </View>
    )
  }

  //override
  renderRow(){}
  beginLoadmore(){}
  onContentSizeChange(){}
}

const style = StyleSheet.create({
  container: {
    flex:1
  },
  centerView:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  }
});

export default BaseList;
