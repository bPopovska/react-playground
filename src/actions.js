function toggleAddForm() {
  return {
    type: 'TOGGLE-ADD-FORM'
  }
}

function deleteItem(index) {
  return {
    type: 'DELETE-ITEM',
    index
  }
}

function addItem(newItem) {
  return {
    type: 'ADD-ITEM',
    newItem
  }
}

function changeStatus(index) {
  return {
    type: 'CHANGE-STATUS',
    index
  }
}

function changeDuration(index) {
  return {
    type: 'CHANGE-DURATION',
    index
  }
}

function persistStatus(index, newStatus) {
  return {
    type: 'PERSIST-STATUS',
    index,
    newStatus
  }
}

function persistDuraion(index, newDuration) {
  return {
    type: 'PERSIST-DURATION',
    index,
    newDuration
  }
}

export {
  toggleAddForm,
  deleteItem,
  addItem,
  changeStatus,
  changeDuration,
  persistStatus,
  persistDuraion
}
