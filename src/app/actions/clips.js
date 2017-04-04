import * as ActionTypes from './ActionTypes'
import { Actions } from 'react-native-router-flux';
import * as BaseActions from './base'
import {AsyncStorage,Platform}from 'react-native'
import {NetworkHelper,Constants,Api,Utils} from '../common'

export function getAllClips() {
  return (dispatch, getState) => {
    var allClips = require('../data/data.json');
    allClips = Utils.shuffle(allClips)

    global.watchedClips = []
    AsyncStorage.getItem(Constants.WATCHED_KEY).then((value) => {
      if (value) {
        global.watchedClips = JSON.parse(value)
      }

      dispatch({
        type:ActionTypes.SET_ALL_CLIPS,
        clips:allClips
      })
    }).done();
   }
}

export function getClipsByCategory(categoryId) {
  return (dispatch, getState) => {
      var allClips = require('../data/data.json');
      var clips = allClips.filter(function(item) {
        return item.categoryId == categoryId;
      });
      dispatch({
        type:ActionTypes.SET_ALL_CLIPS,
        clips:clips
      })
   }
}

export function getRelativeClips() {
  return (dispatch, getState) => {
    var allClips = getState().clipsReducers.clips
    var relativeClips = allClips.slice(0,9)
    dispatch({
        type:ActionTypes.SET_RELATIVE_CLIPS,
        relativeClips:Utils.shuffle(relativeClips)
    })
  }
}

export function clickClip(clip) {
    global.watchedClips.push(clip.videoId)
    AsyncStorage.setItem(Constants.WATCHED_KEY,JSON.stringify(global.watchedClips));

    return (dispatch, getState) => {
      dispatch({
        type:ActionTypes.CLICK_CLIP,
        clip
      })
    }
}
