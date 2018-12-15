import React from 'react';
import { taskStates} from "./constants";

import './Form.css'

class Form extends React.Component {

  onNameChange(event) {
    if (event.target) {
      this.props.onNewName(event.target.value)
    }
  }

  onDurationChange(event) {
    if (event.target) {
      this.props.onNewDuration(event.target.value)
    }
  }

  onStatusChange(event) {
    if (event.target) {
      this.props.onNewStatus(event.target.value)
    }
  }

  onFormSubmit() {
    this.props.onAddItem();
  }

  render() {
    const { newItem } = this.props;

    return (
      <React.Fragment>
        <div className="new-item">
          <div className="item-input item-input-name">
            <label for="name">Name</label>
            <input name="name" value={newItem.name} type="text" onChange={event => this.onNameChange(event)}/>
          </div>
          <div className="item-input item-input-duration">
            <label for="duration">Duration</label>
            <input name="duration" value={newItem.duration} type="time" onChange={event => this.onDurationChange(event)}/>
          </div>
          <div className="item-input item--input-status">
            <label for="state">State</label>
            <select name="state" onChange={event => this.onStatusChange(event)}>
              {taskStates.map(taskState => <option selected={taskState === newItem.status} value={taskState}>{taskState}</option>)}
            </select>
          </div>
        </div>
        <div>
          <button onClick={() => this.onFormSubmit()}>Add</button>
          <button onClick={() => this.props.toggleAddForm()}>Cancel</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Form
