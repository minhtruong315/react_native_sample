'use strict';

var React = require('react');
var {View} = require('react-native');

import {Actions,ActionConst} from 'react-native-router-flux';
import SideItem from "./SideItem"
import SideFirstItem from "./SideFirstItem"
var Constants = require("../../app/common/Constants")
var Utils = require("../../app/common/Utils")

const SlideMenu = (props, context) => {
  const drawer = context.drawer;

    var categories = require('../../app/data/categories.json');
    var items = []
    items.push(<SideItem
      key={0}
      title="All"
      avatarName="AL"
      avatarColor="#3b5998"
      onPress={(data)=>{ drawer.close(); props.onPress(data);}}
      />)

    if (typeof global.categoryStyle === "undefined") {
      global.categoryStyle = {}
    }

    var colors = []
    for (var i = 0; i < categories.length; i++) {
      var avatarName = categories[i].title.substring(0, 2).toUpperCase();
      var avatarColor = Utils.randomColorWithoutColors(colors)
      colors.push(avatarColor)
      global.categoryStyle[categories[i].categoryId] = {avatarName:avatarName,avatarColor:avatarColor}

      console.log("reload");
      items.push(<SideItem
        key={categories[i].categoryId}
        title={categories[i].title}
        avatarName={avatarName}
        avatarColor={avatarColor}
        data={categories[i]}
        onPress={(data)=>{ drawer.close(); props.onPress(data);}}
        />)
    }

    return (
      <View style={{flex: 1, backgroundColor: Constants.DARK_GRAY_COLOR}}>
        <SideFirstItem />
        {items}
      </View>
    )
};

SlideMenu.contextTypes = {
  drawer: React.PropTypes.object,
};

export default SlideMenu;
