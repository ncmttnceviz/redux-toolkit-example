import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'


const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
} )

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers :{
    [fetchUsers.fulfilled] : userAdapter.setAll
  }
})


export const  {
  selectAll : selectAllUsers,
  selectById : selectUserById
} = userAdapter.getSelectors(state => state.users);


export default usersSlice.reducer;
