const initialItems = [
  {
    name: "Item 1",
    duration: "10:00",
    status: 'pending',
    editingStatus: false,
    loggingTime: false
  },
  {
    name: "Item 2",
    duration: "20:00",
    status: 'pending',
    editingStatus: false,
    loggingTime: false
  },
  {
    name: "Item 3",
    duration: "34:10",
    status: 'pending',
    editingStatus: false,
    loggingTime: false
  }
]

export default function itemListReducer(items = initialItems, action) {
  switch(action.type) {
    case 'DELETE-ITEM':
      return [...items.slice(0, action.index), ...items.slice(action.index + 1)]
    case 'CHANGE-STATUS':
      return [
            ...items.slice(0, action.index),
            {
              ...items[action.index],
              editingStatus: true
            },
            ...items.slice(action.index + 1)
          ]
    case 'CHANGE-DURATION':
      return [
            ...items.slice(0, action.index),
            {
              ...items[action.index],
              loggingTime: true
            },
            ...items.slice(action.index + 1)
          ]

    case 'PERSIST-STATUS':
      return [
            ...items.slice(0, action.index),
            {
              ...items[action.index],
              status: action.newStatus,
              editingStatus: false,
            },
            ...items.slice(action.index + 1)
          ]

    case 'PERSIST-DURATION':
      return [
            ...items.slice(0, action.index),
            {
              ...items[action.index],
              duration: action.newDuration,
              loggingTime: false
            },
            ...items.slice(action.index + 1)
          ]
    case 'ADD-ITEM':
      return [
        ...items,
        // TODO: this does not work at the moment
        action.newItem
      ]
    default:
      break
  }
  return items
}
