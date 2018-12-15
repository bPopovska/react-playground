export default function reduce(state, action) {
  switch(action.type) {
    case 'TOGGLE-ADD-FORM':
      return {
        ...state,
        addFormShown: !state.addFormShown
      };
    case 'DELETE-ITEM':
      return {
        ...state,
        items: [...state.items.slice(0, action.index), ...state.items.slice(action.index + 1)]
      };
    case 'ADD-ITEM':
      return {
        ...state,
        items: [...state.items, state.newItem],
        newItem: {
          name: '',
          duration: '00:00',
          status: 'pending',
          editStatus: false,
          loggingTime: false
        }
      }
    case 'CHANGE-STATUS':
      return {
        ...state,
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
        ...state,
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
        ...state,
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
        ...state,
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
    case 'NEW-DURATION':
      return {
        ...state,
        newItem: {
          ...state.newItem,
          duration: action.duration
        }
      }
    case 'NEW-NAME':
      return {
        ...state,
        newItem: {
          ...state.newItem,
          name: action.name
        }
      }
    case 'NEW-STATUS':
      return {
        ...state,
        newItem: {
          ...state.newItem,
          status: action.status
        }
      }
    default:
      break
  }
  return state
}
