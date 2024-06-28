import { configureStore, combineReducers } from '@reduxjs/toolkit'
import reducers from './reducer'
import { postService } from '../services/postService/postService'
import { userService } from '../services/userService/userService'


const rootReducer = combineReducers(reducers)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    postService.middleware,
    userService.middleware,
  )
})
