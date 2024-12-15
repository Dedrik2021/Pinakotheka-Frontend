import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const apiUrl = `http://localhost:8080/api/v1/auth`;
const apiUrl = `${process.env.REACT_APP_API_URL}/auth`;

const initialState = {
	status: '',
	error: '',
	users: [],
	author: {},
	onlineUsers: [],
	user: {
		id: '',
		name: '',
		email: '',
		picture: '',
		token: '',
		about: '',
		author: false,
		customer: false,
		facebook: '',
		twitter: '',
		instagram: '',
		politics: false,
		unreadMessages: {},
		isEmailVerified: JSON.parse(localStorage.getItem('isEmailVerified')) || false,
	},
};

export const refreshUser = createAsyncThunk(
	'user/refreshuser',
	async (userId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrl}/refresh-user-by-id/${userId}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
); 

//derzit polzovatelja gde libo bez useefecta
export const registerUser = createAsyncThunk(
	'auth/register',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${apiUrl}/register`, values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
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

export const forgotPassword = createAsyncThunk(
	'auth/forgotpassword',
	async (email, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${apiUrl}/forgot-password`, email);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const getAuthorById = createAsyncThunk(
	'user/getbyidauthor',
	async (authorId, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrl}/get-author-by-id/${authorId}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const resetPassword = createAsyncThunk(
	'auth/resetpassword',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${apiUrl}/reset-password`, values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const updateUnreadMessage = createAsyncThunk(
	'auth/updateunreadmessage',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.put(`${apiUrl}/update-unread-messages/${values.userId}/${values.senderId}`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const verifyEmail = createAsyncThunk(
	'auth/verifyemail',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrl}/verify-email`, {
				params: { token: values.token, id: values.id },
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const getUsers = createAsyncThunk('user/getusers', async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${apiUrl}/get-users`);
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
				about: '',
				politics: false,
				facebook: '',
				twitter: '',
				instagram: '',
				token: '',
				unreadMessages: {},
				isEmailVerified: JSON.parse(localStorage.getItem('isEmailVerified')) || false,
			};
		},
		setError: (state, action) => {
			state.error = action.payload;
		},

		setStatus: (state, action) => {
			state.status = action.payload;
		},

		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
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
				state.user.isEmailVerified = false;
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


			.addCase(refreshUser.pending, (state) => {
				// state.status = 'loading';
				state.error = '';
			})
			.addCase(refreshUser.fulfilled, (state, action) => {
				// state.status = 'succeeded';
				state.error = '';
				state.user = action.payload.user;
			})
			.addCase(refreshUser.rejected, (state, action) => {
				// state.status = 'failed';
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
				state.user.isEmailVerified = true;
				localStorage.setItem('isEmailVerified', true);
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(getUsers.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.users = action.payload;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(getAuthorById.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getAuthorById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.author = action.payload;
			})
			.addCase(getAuthorById.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})


			.addCase(updateUnreadMessage.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(updateUnreadMessage.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
			})
			.addCase(updateUnreadMessage.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { login, logout, setError, setStatus, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer;
