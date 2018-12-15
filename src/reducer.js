export default function reduce(state, action) {
  switch(action.type) {
    case 'TOGGLE-ADD-FORM':
      return {
        addFormShown: !state.addFormShown
      };
    case 'DELETE-ITEM':
      return {
        items: [...state.items.slice(0, action.index), ...state.items.slice(action.index + 1)]
      };
    case 'ADD-ITEM':
      return {
        items: [...state.items, action.newItem]
      }
    case 'CHANGE-STATUS':
      return {
        items:
          [
            ...state.items.slice(0, action.index),
            {
              ...state.items[action.index],
              editingStatus: true
            },
            ...state.items.slice(action.index + 1)
          ]
      }

    case 'CHANGE-DURATION':
      return {
        items:
          [
            ...state.items.slice(0, action.index),
            {
              ...state.items[action.index],
              loggingTime: true
            },
            ...state.items.slice(action.index + 1)
          ]
      };
    case 'PERSIST-STATUS':
      return {
        items:
          [
            ...state.items.slice(0, action.index),
            {
              ...state.items[action.index],
              status: action.newStatus,
              editingStatus: false,
            },
            ...state.items.slice(action.index + 1)
        ]
      }
    case 'PERSIST-DURATION':
      return {
        items:
          [
            ...state.items.slice(0, action.index),
            {
              ...state.items[action.index],
              duration: action.newDuration,
              loggingTime: false
            },
            ...state.items.slice(action.index + 1)
          ]
      }
    default:
      break
  }
  return state
}
