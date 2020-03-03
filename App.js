/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import Router from './app/config/routes';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  render() {
    if (!this.state.isReady) {
    }

    return (
      <Router />
    );
  }
}
