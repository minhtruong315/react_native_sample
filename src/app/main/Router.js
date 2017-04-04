import React from 'react';
import {
  StyleSheet,
  Image,
  Platform
}from 'react-native'
import { Router, Reducer, Scene,Actions,ActionConst } from 'react-native-router-flux';
var Constants = require("../common/Constants")
import Pages from '../pages';
import {Drawer} from "../../theme"
var EventEmitter = require('EventEmitter');

const createReducer = params => {
  const defaultReducer = new Reducer(params);

  return (state, action) => {
    return defaultReducer(state, action);
  }
};

class AppRouter extends React.Component {
  componentWillMount() {
        this.eventEmitter = new EventEmitter();
    }

  render() {
    return (
      <Router createReducer={createReducer} navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle} backButtonImage={require("../images/ic_arrow_back_white_36dp.png")}>
            {this.getInitialDrawer()}
            <Scene key="detail" title="Watch" component={Pages.Detail} onBack={this.detailBack.bind(this)} passProps={{events: this.eventEmitter}}/>
      </Router>
    );
  }

  getInitialDrawer(){
    return (
      <Scene key="drawer" component={Drawer} passProps={{events: this.eventEmitter}}>
          <Scene key="main" tabs>
                <Scene key="home" title="Top Trailers" component={Pages.Home} drawerImage={require("../images/ic_left_drawer.png")} passProps={{events: this.eventEmitter}}/>
          </Scene>
      </Scene>
    )
  }

  detailBack(){
    this.eventEmitter.emit(Constants.EVENT_EMITTER_BACK);
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor:Constants.APP_COLOR
  },
  titleStyle:{
    color:"white",
    fontFamily: 'Helvetica',
    fontWeight:"bold",
    fontSize:16
  }
});
module.exports = AppRouter;
