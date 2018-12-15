import { combineReducers } from 'redux'

import itemListReducer from "./itemList"
import newItemReducer from "./newItem"
import formShownReducer from './formShown'

export default combineReducers({
  items: itemListReducer,
  newItem: newItemReducer,
  addFormShown: formShownReducer
})
