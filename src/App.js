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
        duration: 200,
        status: 'pending'
      },
      {
        name: "Item 2",
        duration: 500,
        status: 'pending'
      },
      {
        name: "Item 3",
        duration: 200,
        status: 'pending'
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


  render() {
    const { items, addFormShown, itemToAdd } = this.state;
    return (
      <div className="App">
        <div className="itemList">
          {items.map((item, index) => <Item key={item} item={item} index={index} onDelete={this.onDelete.bind(this)} />)}
        </div>
        {!addFormShown ?
          <button onClick={() => this.toggleAddForm()}>Add Item</button> :
          <Form itemToAdd={itemToAdd} toggleAddForm={this.toggleAddForm.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>}
      </div>
    );
  }
}

export default App;
