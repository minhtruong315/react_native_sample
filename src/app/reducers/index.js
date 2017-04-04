import { combineReducers } from 'redux'
import baseReducers from './base'
import clipsReducers from './clips'

const reducers = combineReducers({
  baseReducers,
  clipsReducers
});

export default reducers
