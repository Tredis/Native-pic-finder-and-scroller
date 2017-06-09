import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import photos from '../reducers/photos'
import layout from '../reducers/layout'

const rootReducer = combineReducers({ photos, layout })

export default createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);
