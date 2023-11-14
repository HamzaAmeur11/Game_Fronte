import { createAsyncThunk ,createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store/store';
import { log } from 'console'

export interface UserInfos {
  id: number;
  name: string;
  userName: string;
  rank: number;
  level: number;
  avatar: string;
}

export interface userState {
  user_Data:UserInfos;
  loading: boolean;
  error: string | null;
}

// export const initialState: userState = {
//   user_Data: {
//     id: 0,
//     name: '',
//     userName: '',http://localhost:3000/_next/image?url=%2Fgsus.jpeg&w=640&q=75
//     rank: 0,
//     level: 0,
//     avatar: '',
//   },
//   loading: false,
//   error: null,
// }
// const UserInfo:UserInfos = {
//   name: 'hassaaaaaaan',
//   userName: '',
//   rank: 0,
//   level: 0,
//   pathImg: '',
// }


// export interface tInitialState  {
//   userInfo: UserInfos;
//   status: string;
//   error: any;
// }

// export const initialState:tInitialState = {
//   userInfo: UserInfo,
//   status: 'none',
//   error: null
// }

const initialState = {
  entity: [],
} as any;

export const fetchInfos = createAsyncThunk("user/fetch", async (thunkApi) => {
  const response = await fetch("http://localhost:5000/Profile/98945", {
    method: "GET"
  });

  
  const data = await response.json();   
  // console.log(data);
  return (data);
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInfos.fulfilled, (state, action) => {
        state.user_Data = action.payload;
        state.loading = false;
      })
      .addCase(fetchInfos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong !';
      });
  },
});


// export const { addInfos } = userSlice.actions;
export default userSlice.reducer;
// export const selectUser = (state: RootState) => state.user.user_Data
// export const selectLoading = (state: RootState) => state.user.loading
// export const selectError = (state: RootState) => state.user.error

