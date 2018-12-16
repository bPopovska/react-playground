import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Form from './Form';

import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

const query = gql`
                  query getItems($status: String!) {
                    items(status: $status) {
                      duration
                      name
                      status
                    }
                  }
          `;

class App extends Component {

  constructor(props) {
    super(props)
    this.onFilter = this.onFilter.bind(this)
  }

  // the global application state
  state = {
    title: "TODO App",
    addFormShown: false,
    status: 'inprogress'
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

  onFilter(status) {
    this.setState({status})
  }

  render() {
    const { addFormShown, itemToAdd, status } = this.state;
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <Query query={query} variables={{status}}>
          {
            ({data, loading, error}) => {
              if (loading) return (<div>Loading...</div>)
              if (error) return (<div>Something went wrong...</div>)
              return (
                <React.Fragment>
                  <div className="itemList">
                    {
                      data.items.map((item, index) =>
                        <Item
                          key={item.name}
                          item={item}
                          index={index}
                          onDelete={this.onDelete.bind(this)}
                          onChangeStatus={this.onChangeStatus.bind(this)}
                          onPersistStatus={this.onPersistStatus.bind(this)}
                          onChangeDuration={this.onChangeDuration.bind(this)}
                          onPersistDuration={this.onPersistDuration.bind(this)} />
                      )
                    }
                  </div>
                  {!addFormShown ?
                  <button onClick={() => this.toggleAddForm()}>Add Item</button> :
                  <Form itemToAdd={itemToAdd} toggleAddForm={this.toggleAddForm.bind(this)} onItemAdd={this.onItemAdd.bind(this)}/>}
                  <div>
                    <button onClick={() => this.onFilter('pending')}>Pending</button>
                    <button onClick={() => this.onFilter('inprogress')}>In progress</button>
                    <button onClick={() => this.onFilter('done')}> Done</button>
                  </div>
                </React.Fragment>
              )
            }
          }
        </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
