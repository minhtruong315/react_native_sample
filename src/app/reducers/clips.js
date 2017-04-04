import * as ActionTypes from '../actions/ActionTypes'

export default function base(state = {}, action){
  switch(action.type) {
    case ActionTypes.SET_ALL_CLIPS:
      {
        return Object.assign({}, state, {
          clips: action.clips
        })
      }
      case ActionTypes.SET_RELATIVE_CLIPS:
        {
          return Object.assign({}, state, {
            relativeClips: action.relativeClips
          })
        }
      case ActionTypes.CLICK_CLIP:
        {
          return Object.assign({}, state, {
            selectedClip: action.clip
          })
        }
    default:
      return state;
  }
}
