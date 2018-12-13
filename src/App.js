import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Form from './Form';

class App extends Component {

  state = {
    title: "TODO App",
    items: [
      {
        name: "Item 1",
        duration: "10:00",
        status: 'pending',
        editMode: false
      },
      {
        name: "Item 2",
        duration: "20:00",
        status: 'pending',
        editMode: false
      },
      {
        name: "Item 3",
        duration: "34:10",
        status: 'pending',
        editMode: false
      }
    ],
    addFormShown: false,
  }

  toggleAddForm() {
    this.setState(state => ({addFormShown: !state.addFormShown}))
  }

  onDelete(index) {
    this.setState(state => ({items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]}))
  }

  onItemAdd(newItem) {
    this.setState(state => ({items: [...state.items, newItem]}))
  }

  onChangeStatus(index) {
    this.setState(state => ({items: [...state.items.slice(0, index), {...state.items[index], editMode: true}, ...state.items.slice(index + 1)]}))
  }

  onPersistStatus(index, newStatus) {
    this.setState(state => ({items: [...state.items.slice(0, index), {...state.items[index], status: newStatus, editMode: false}, ...state.items.slice(index + 1)]}))
  }


  render() {
    const { items, addFormShown, itemToAdd } = this.state;
    return (
      <div className="App">
        <div className="itemList">
          {items.map((item, index) => <Item
            key={item.name}
            item={item}
            index={index}
            onDelete={this.onDelete.bind(this)}
            onChangeStatus={this.onChangeStatus.bind(this)}
            onPersistStatus={this.onPersistStatus.bind(this)}
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
