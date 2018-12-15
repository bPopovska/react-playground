import React, { Component } from 'react'
import './App.css'

import Items from './Items'

import reduce from './reducer/index'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

class App extends Component {

  store = createStore(reduce)

  render() {
    return (
      <Provider store={this.store}>
        <Items />
      </Provider>
    );
  }
}

export default App;
