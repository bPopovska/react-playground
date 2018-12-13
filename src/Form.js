import React from 'react';
import { taskStates} from "./constants";

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

  onFormSubmit() {
    this.resetState();
    this.props.onItemAdd(this.state);
  }

  render() {
    const { toggleAddForm } = this.props;

    return (
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
          <button onClick={() => this.onFormSubmit()}>Add</button>
          <button onClick={() => toggleAddForm()}>Cancel</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Form
