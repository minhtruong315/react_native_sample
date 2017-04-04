import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
import codePush from "react-native-code-push";
import App from './App';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

class Root extends React.Component{
    render(){
      return(
        <Provider store={store}>
          <App />
        </Provider>
      )
    }
};

module.exports = codePush(codePushOptions)(Root);
