import React from 'react';

class Form extends React.Component {

  state = {
    name: '',
    duration: 0,
    status: 'pending'
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
        <div className="newItem">
          <input value={this.state.name} onChange={event => this.onNameChange(event)}/>
          <input value={this.state.duration} onChange={event => this.onDurationChange(event)}/>
          <input value={this.state.status} onChange={event => this.onStatusChange(event)}/>
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
