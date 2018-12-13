import React from 'react';
import './Item.css';
import {taskStates} from "./constants";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.item.status
        }
    }

    onStatusChange(event) {
      if (event.target) {
        this.setState({status: event.target.value})
      }
    }

    render() {
      const { item, onDelete, onChangeStatus, onLogTime, onPersistStatus, index} = this.props;
      console.log(item)
      return (
          <div className="item">
            <div className="item-entry item-name">
              {item.name}
            </div>
            <div className="item-entry item-duration">
              {item.duration}
            </div>
            {item.editMode ?
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
              <span><button onClick={() => onLogTime(index)}>Log Time</button></span>
            </div>
          </div>
        )
    }
}

export default Item
