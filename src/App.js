import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Form from './Form';

import reduce from './reducer'

import { createStore } from 'redux'
import {changeDuration, changeStatus, deleteItem, persistDuraion, persistStatus} from "./actions";


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
}

class App extends Component {

  store = createStore(reduce, initialState)

  render() {
    const { items, addFormShown, itemToAdd } = this.state;
    return (
      <div className="App">
        <div className="itemList">
          {items.map((item, index) => <Item
            key={item.name}
            item={item}
            index={index}
            onDelete={() => this.store.dispatch(deleteItem())}
            onChangeStatus={(index) => this.store.dispatch(changeStatus(index))}
            onPersistStatus={(index, newStatus) => this.store.dispatch(persistStatus(index, newStatus))}
            onChangeDuration={index => this.store.dispatch(changeDuration(index))}
            onPersistDuration={(index, newDuration) => this.store.dispatch(persistDuraion(index, newDuration))}
          />)}
        </div>
        {!addFormShown ?
          <button onClick={() => this.toggleAddForm()}>Add Item</button> :
          <Form itemToAdd={itemToAdd} toggleAddForm={this.toggleAddForm.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>}
      </div>
    );
  }
}

export default App;
