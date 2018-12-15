import React from 'react'
import { connect } from 'react-redux'
import Form from './Form.js'
import Item from './Item.js'

import {
  changeDuration,
  changeStatus,
  deleteItem,
  persistDuration,
  persistStatus,
  toggleAddForm,
  newName,
  newDuration,
  newStatus,
  addItem
} from "./actions";

class Items extends React.Component {
  render() {
    const { items, addFormShown, newItem,
      onDelete,
      onChangeStatus,
      onPersistStatus,
      onChangeDuration,
      onPersistDuration,
      toggleAddForm } = this.props;

    return (
      <div className="App">
        <div className="itemList">
          {items.map((item, index) => <Item
            key={item.name}
            item={item}
            index={index}
            onDelete={index => onDelete(index)}
            onChangeStatus={index => onChangeStatus(index)}
            onPersistStatus={(index, newStatus) => onPersistStatus(index, newStatus)}
            onChangeDuration={index => onChangeDuration(index)}
            onPersistDuration={(index, newDuration) => onPersistDuration(index, newDuration)}
          />)}
        </div>
        {!addFormShown ?
          <button onClick={() => toggleAddForm()}>Add Item</button> :
          <Form />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    addFormShown: state.addFormShown,
    newItem: state.newItem
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: () => {
      dispatch(addItem())
    },
    onNewName: name => {
      dispatch(newName(name))
    },
    onNewDuration: duration => {
      dispatch(newDuration(duration))
    },
    onNewStatus: status => {
      dispatch(newStatus(status))
    },
    toggleAddForm: () => {
      dispatch(toggleAddForm())
    },
    onDelete: index => {
      dispatch(deleteItem(index))
    },
    onChangeStatus: index => {
      dispatch(changeStatus(index))
    },
    onPersistStatus: (index, newStatus) => {
      dispatch(persistStatus(index, newStatus))
    },
    onChangeDuration: index => {
      dispatch(changeDuration(index))
    },
    onPersistDuration: (index, newDuration) => {
      dispatch(persistDuration(index, newDuration))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
