import React from 'react';
import {ListView,ActivityIndicator,View,Dimensions } from 'react-native';

class List extends React.Component {

  constructor(props) {
    super(props);

    var { data,isRequesting } = props;
    this.state={
      waiting:isRequesting
    }
    this.setDataSource(data);
  }

  /*
   * We need to set a new datasource, everytime the theme changes because
   * otherwise the rows aren't updated since the data remains the same.
   * You can remove this method if you don't want to allow theme changes in your app.
   */
  componentWillReceiveProps(nextProps) {
    const { data,isRequesting } = nextProps;
    this.state={
      waiting:isRequesting
    }
    this.setDataSource(data);
  }

  setDataSource(data) {
    let newData = data;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    if (newData === undefined) {
      newData = [];
    }

    this.state = {
      dataSource: ds.cloneWithRows(newData),
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return <View>{this.props.renderRow(rowData, sectionID, rowID)}</View>
  }

  renderFooter() {
    if (this.props.enableLoadMore && this.state.waiting) {
          return <View>{this.props.renderLoadMoreView()}</View>;
    }else{
      return null
    }
  }

  defaultLoadMoreView(){
    return <View><ActivityIndicator /></View>;
  }

  onScroll(event){
    if (!this.props.enableLoadMore) {
      return
    }
    let currentYPosition = event.nativeEvent.contentOffset.y;
    if (this.lastPosition == currentYPosition) {
      return
    }
    this.lastPosition = currentYPosition;
    if (this.contentHeight - currentYPosition + 10 <= Dimensions.get('window').height) {
      if (!this.state.waiting) {
          console.log("beginLoadmore");
          this.setState({waiting: true});
          this.props.beginLoadmore()
      }
    }
  }

  onContentSizeChange(w, h)
  {
    this.contentHeight = h;
  }

  render() {
    return (
      <ListView
        {...this.props}
        ref="listView"
        style={[{flex:1},this.props.style]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}
        renderFooter={this.renderFooter.bind(this)}
        onContentSizeChange={this.onContentSizeChange.bind(this)}
        onScroll={this.onScroll.bind(this)}
      />
    );
  }
}

List.defaultProps = {
  enableLoadMore: false,
  renderLoadMoreView: List.prototype.defaultLoadMoreView
}

export default List;
