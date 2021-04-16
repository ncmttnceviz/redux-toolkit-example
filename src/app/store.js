import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postsSlice'
import userReducer from '../features/users/usersSlice'
import notoficationReducer from '../features/notifications/notoficationsSlice'
export default  configureStore({
  reducer : {
    posts : postReducer,
    users : userReducer,
    notifications : notoficationReducer
  },
})



