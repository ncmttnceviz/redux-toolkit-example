import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import { client } from '../../api/client'


const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState()

export const fetchAllNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_,{getState} ) => {
  const fullNotifications = selectAllNotifications(getState());
  const [latestNotifications ] = fullNotifications;
  const latestTimesTamp = latestNotifications ? latestNotifications.date : '';
  const response = await client.get(`/fakeApi/notifications?since=${latestTimesTamp}`);
  return response.notifications
})

const notificationsSlice = createSlice({
  name:'notifications',
  initialState,
  reducers:{
    readAllNotifications : (state, action) => {
       Object.values(state.entities).forEach(notification => {
         notification.read = true
       })
    }
  },
  extraReducers:{
    [fetchAllNotifications.fulfilled] : (state,action) => {
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })
      notificationsAdapter.upsertMany(state, action.payload)
    }
  }
})

export const {
  selectAll : selectAllNotifications
} = notificationsAdapter.getSelectors((state)=>state.notifications)

export const {readAllNotifications} = notificationsSlice.actions;
export default  notificationsSlice.reducer;