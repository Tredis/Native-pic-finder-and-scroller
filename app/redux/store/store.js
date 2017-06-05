import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import photos from '../reducers/photos'

const rootReducer = combineReducers({ photos })

export default createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);
