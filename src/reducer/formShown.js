export default function reduce(addFormShown = false, action) {
  switch (action.type) {
    case 'TOGGLE-ADD-FORM':
      return !addFormShown
    default:
      return addFormShown
  }
}
