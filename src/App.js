import React, { Component } from 'react';
import './App.css';
import Item from './Item';

class App extends Component {

  state = {
    items: ["Item 1", "Item 2", "Item 3"],
    addFormShown: false,
    itemToAdd: "",
  }

  toggleAddForm() {
    this.setState(state => ({addFormShown: !state.addFormShown}))
  }

  onDelete(index) {
    debugger
    this.setState(state => ({items: [...state.items.slice(0, index), ...state.items.slice(index + 1)]}))
  }

  onItemAdd() {
    this.setState(state => ({items: [...state.items, state.itemToAdd], itemToAdd: ""}))
  }

  onInputTextChange(event) {
    if (event.target) {
      this.setState({itemToAdd: "" + event.target.value})
    }
  }

  render() {
    const { items, addFormShown, itemToAdd } = this.state;
    return (
      <div className="App">
        <div className="itemList">
          {items.map((item, index) => <Item key={item} name={item} index={index} onDelete={this.onDelete.bind(this)} />)}
        </div>
        <div className="newItem">
          {addFormShown ? <input value={itemToAdd} onChange={event => this.onInputTextChange(event)}/> : null}
        </div>
        {!addFormShown ? <button onClick={() => this.toggleAddForm()}>Add Item</button> : null}
        {addFormShown ? <div>
          <button onClick={() => this.onItemAdd()}>Add</button>
          <button onClick={() => this.toggleAddForm()}>Cancel</button>
        </div> : null}
      </div>
    );
  }
}

export default App;
