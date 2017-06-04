import React, { Component } from 'react';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import App from './native/containers/App';

export default class Scroller extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

