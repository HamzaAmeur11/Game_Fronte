import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Slices/userSlice'
import chatReducer from '../Slices/chatSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,

    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;