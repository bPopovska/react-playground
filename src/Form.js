import React from 'react';
import { taskStates} from "./constants";

import { Mutation } from 'react-apollo';
import { getItemsQuery, addItemMutation} from "./graphql";

import './Form.css'

class Form extends React.Component {

  state = {
    name: '',
    duration: 0,
    status: 'pending',
    editingStatus: false,
    loggingTime: false
  };

  onNameChange(event) {
    if (event.target) {
      this.setState({name: event.target.value})
    }
  }

  onDurationChange(event) {
    if (event.target) {
      this.setState({duration: event.target.value})
    }
  }

  onStatusChange(event) {
    if (event.target) {
      this.setState({status: event.target.value})
    }
  }

  resetState() {
    this.setState({name: '', duration: 0, status: 'pending'})
  }

  onFormSubmit(addItem) {
    this.resetState();
    // this.props.onItemAdd(this.state);
    addItem(this.state.name, this.state.duration, this.state.status);
  }

  render() {
    const { toggleAddForm } = this.props;

    return (
      <Mutation
        mutation={addItemMutation}
        refetchQueries={[
          {
            query: getItemsQuery,
            variables: {
              status: 'inprogress',
            }
          },
          {
            query: getItemsQuery,
            variables: {
              status: 'done',
            }
          },
          {
            query: getItemsQuery,
            variables: {
              status: 'pending',
            }
          },
        ]}
        awaitRefetchQueries={true}
      >
        {
          (addItem, {error, loading}) => (
            <React.Fragment>
              <div className="new-item">
                <div className="item-input item-input-name">
                  <label for="name">Name</label>
                  <input name="name" value={this.state.name} type="text" onChange={event => this.onNameChange(event)}/>
                </div>
                <div className="item-input item-input-duration">
                  <label for="duration">Duration</label>
                  <input name="duration" value={this.state.duration} type="time" onChange={event => this.onDurationChange(event)}/>
                </div>
                <div className="item-input item--input-status">
                  <label for="state">State</label>
                  <select name="state" onChange={event => this.onStatusChange(event)}>
                    {taskStates.map(taskState => <option selected={taskState === this.state.status} value={taskState}>{taskState}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <button onClick={() => addItem({
                  variables: {
                    name: this.state.name,
                    duration: this.state.duration,
                    status: this.state.status
                  }
                })}>Add</button>
                <button onClick={() => toggleAddForm()}>Cancel</button>
              </div>
              {loading ? <div>Loading...</div> : null}
              {error ? <div>Something went wrong...</div> : null}
            </React.Fragment>
          )
        }
     </Mutation>
    )
  }
}

export default Form
