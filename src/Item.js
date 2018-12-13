import React from 'react';
import './Item.css';
import {taskStates} from "./constants";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.item.status,
            duration: props.item.duration
        }
    }

    onStatusChange(event) {
      if (event.target) {
        this.setState({status: event.target.value})
      }
    }

    onDurationChange(event) {
      if (event.target) {
        this.setState({duration: event.target.value})
      }
    }

    render() {
      const { item, onDelete, onChangeStatus, onChangeDuration, onPersistStatus, onPersistDuration, index} = this.props;
      return (
          <div className="item">
            <div className="item-entry item-name">
              {item.name}
            </div>
            {item.loggingTime ? (
              <React.Fragment>
                <label htmlFor="duration">Duration</label>
                <input name="duration" value={this.state.duration} type="time"
                       onChange={event => this.onDurationChange(event)}/>
                <button onClick={() => onPersistDuration(index, this.state.duration)}>OK</button>
              </React.Fragment>
            ) : (<div className="item-entry item-duration">{item.duration}</div>)
            }

            {item.editingStatus ?
              (<React.Fragment>
                <label htmlFor="state">State</label>
                <select name = "state" onChange={event => this.onStatusChange(event)}>
                  {taskStates.map(taskState => <option key={taskState} defaultValue={this.state.status} value={taskState}>{taskState}</option>)}
                </select>
                <button onClick={() => onPersistStatus(index, this.state.status)}>OK</button>
              </React.Fragment>) :
              (<div className="item-entry item-status">
                {item.status}
              </div>)
            }

            <div className="item-entry">
              <span><button onClick={() => onDelete(index)}>Remove</button></span>
              <span><button onClick={() => onChangeStatus(index)}>Change Status</button></span>
              <span><button onClick={() => onChangeDuration(index)}>Log Time</button></span>
            </div>
          </div>
        )
    }
}

export default Item
