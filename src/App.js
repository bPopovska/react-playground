import React, { Component } from 'react';
import './App.css';
import Items from './Items'

import reduce from './reducer'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

// the global application state
const initialState = {
  title: "TODO App",
  items: [
    {
      name: "Item 1",
      duration: "10:00",
      status: 'pending',
      editingStatus: false,
      loggingTime: false
    },
    {
      name: "Item 2",
      duration: "20:00",
      status: 'pending',
      editingStatus: false,
      loggingTime: false
    },
    {
      name: "Item 3",
      duration: "34:10",
      status: 'pending',
      editingStatus: false,
      loggingTime: false
    }
  ],
  addFormShown: false,
  newItem: {
    name: '',
    duration: '00:00',
    status: 'pending',
    editingStatus: false,
    loggingTime: false
  }
}

class App extends Component {

  store = createStore(reduce, initialState)

  render() {
    return (
      <Provider store={this.store}>
        <Items />
      </Provider>
    );
  }
}

export default App;
