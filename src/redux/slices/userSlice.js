import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = `http://localhost:8080/api/v1/auth`;
// const apiUrl = `${process.env.REACT_APP_API_URL}/auth`;

const initialState = {
	status: '',
	error: '',
	user: {
		id: '',
		name: '',
		email: '',
		picture: '',
		token: '',
        author: false,
        customer: false,
        politics: false,
		isEmailVerified: JSON.parse(localStorage.getItem('isEmailVerified')) || false,
	},
};

//derzit polzovatelja gde libo bez useefecta
export const registerUser = createAsyncThunk(
	'auth/register',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${apiUrl}/register`, values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message)
		}
	},
);

export const loginUser = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${apiUrl}/login`, values);
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error.message);
	}
});

export const forgotPassword = createAsyncThunk('auth/forgotpassword', async (email, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${apiUrl}/forgot-password`, email);
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error.message);
	}
});

export const resetPassword = createAsyncThunk('auth/resetpassword', async (values, { rejectWithValue }) => {
	try {
		const { data } = await axios.post(`${apiUrl}/reset-password`, values);
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error.message);
	}
});

export const verifyEmail = createAsyncThunk('auth/verifyemail', async (values, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${apiUrl}/verify-email`, {params: {token: values.token, id: values.id}});
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error.message);
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = action.payload.status;
			state.error = action.payload.error;
			state.user = action.payload.user;
		},
		logout: (state) => {
			state.status = '';
			state.error = '';
			state.user = {
				id: '',
				name: '',
				email: '',
				picture: '',
                author: false,
                customer: false,
                politics: false,
				token: '',
				isEmailVerified: JSON.parse(localStorage.getItem('isEmailVerified')) || false,
			};
		},
        setError: (state, action) => {
            state.error = action.payload
        },

        setStatus: (state, action) => {
            state.status = action.payload
        }
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.user = action.payload.user;
				state.user.isEmailVerified = false
				localStorage.setItem('isEmailVerified', false);
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})


			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})


			.addCase(forgotPassword.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.user = action.payload.user;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
				state.user = action.payload.user;
			})


			.addCase(resetPassword.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.user = action.payload.user;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})


			.addCase(verifyEmail.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(verifyEmail.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.user.isEmailVerified = true
				localStorage.setItem('isEmailVerified', true);
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { login, logout, setError, setStatus } = userSlice.actions;
export default userSlice.reducer;
