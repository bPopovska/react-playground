const initialNewItem = {
  name: '',
  duration: '00:00',
  status: 'pending',
  editingStatus: false,
  loggingTime: false
}

export default function newItemReducer(newItem = initialNewItem, action) {
  switch(action.type) {
    case 'NEW-DURATION':
      return {
          ...newItem,
          duration: action.duration
      }
    case 'NEW-NAME':
      return {
          ...newItem,
          name: action.name
      }
    case 'NEW-STATUS':
      return {
          ...newItem,
          status: action.status
      }
    case 'ADD-ITEM':
      return initialNewItem
    default:
      break
  }
  return newItem
}
