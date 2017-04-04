import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions,ActionConst } from 'react-native-router-flux';
var Constants = require("../../app/common/Constants")
import SideMenu from './SideMenu';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<SideMenu onPress={this.onPressItem.bind(this)}/>}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }

  onPressItem(data){
    if (typeof this.props.passProps !== "undefined" && typeof this.props.passProps.events !== "undefined") {
      this.props.passProps.events.emit(Constants.EVENT_EMITTER_RELOAD, data);
    }
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
}
NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
