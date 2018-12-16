import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Form from './Form';

import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, ApolloConsumer } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

class App extends Component {

  // the global application state
  state = {
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
    this.setState(state => (
      {
        items:
          [
            ...state.items.slice(0, index),
            {
              ...state.items[index],
              editingStatus: true
            },
            ...state.items.slice(index + 1)
          ]
      }
    ))
  }

  onChangeDuration(index) {
    this.setState(state => (
      {
        items:
          [
            ...state.items.slice(0, index),
            {
              ...state.items[index],
              loggingTime: true
            },
            ...state.items.slice(index + 1)
          ]
      }
    ))
  }


  onPersistStatus(index, newStatus) {
    this.setState(state => (
      {
        items:
          [
            ...state.items.slice(0, index),
            {
              ...state.items[index],
              status: newStatus,
              editingStatus: false,
            },
            ...state.items.slice(index + 1)
          ]
      }
    ))
  }

  onPersistDuration(index, newDuration) {
    this.setState(state => (
      {
        items:
          [
            ...state.items.slice(0, index),
            {
              ...state.items[index],
              duration: newDuration,
              loggingTime: false
            },
            ...state.items.slice(index + 1)
          ]
      }
    ))
  }


  render() {
    const { items, addFormShown, itemToAdd } = this.state;
    return (
      <ApolloProvider client={client}>
        <ApolloConsumer>
          {
            client => {
              client.query({
                query: gql`
                  {
                    items {
                      duration
                      name
                      status
                    }
                  }
                  `
              }).then(result => console.log(result))
              return null
            }
          }
        </ApolloConsumer>
        <div className="App">
          <div className="itemList">
            {items.map((item, index) => <Item
              key={item.name}
              item={item}
              index={index}
              onDelete={this.onDelete.bind(this)}
              onChangeStatus={this.onChangeStatus.bind(this)}
              onPersistStatus={this.onPersistStatus.bind(this)}
              onChangeDuration={this.onChangeDuration.bind(this)}
              onPersistDuration={this.onPersistDuration.bind(this)}
            />)}
          </div>
          {!addFormShown ?
            <button onClick={() => this.toggleAddForm()}>Add Item</button> :
            <Form itemToAdd={itemToAdd} toggleAddForm={this.toggleAddForm.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
