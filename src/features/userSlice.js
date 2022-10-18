import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../app/config/firebase';

const initialState = {
	user: null,
	dataStatus: 'loading',
};

export const login = createAsyncThunk('counter/login', async (user) => {
	const doc = await db.collection('users').doc(user.uid).get();
	const data = doc.data();
	return { user, data };
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addAuthData: (state, action) => {
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.user = null;
			state.userData = null;
			state.dataStatus = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.dataStatus = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.dataStatus = 'idle';
				state.user = action.payload.user;
				state.userData = action.payload.data;
			})
			.addCase(login.rejected, (state) => {
				state.dataStatus = 'idle';
				state.user = null;
				state.userData = null;
			});
	},
});

export const { addAuthData, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
