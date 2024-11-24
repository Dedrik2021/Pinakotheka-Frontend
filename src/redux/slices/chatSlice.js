import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrlConversation = `${process.env.REACT_APP_API_URL}/conversation`;
const apiUrlMessage = `${process.env.REACT_APP_API_URL}/message-convo`;

const initialState = {
	status: '',
	error: '',
	conversations: [],
	messages: [],
	activeConversation: {
		users: [],
	},
	notifications: [],
	files: [],
};

export const getConversationMessages = createAsyncThunk(
	'conversations/messages',
	async (values, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrlMessage}/${values.convo_id}`, {
				headers: {
					Authorization: `Bearer ${values.token}`,
				},
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const sendMessageConvo = createAsyncThunk(
	'message/send',
	async (values, { rejectWithValue }) => {
		const { token, message, convo_id, receiver_id, files } = values;
		try {
			const { data } = await axios.post(
				`${apiUrlMessage}`,
				{
					message,
					convo_id,
					receiver_id,
					files,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const getConversations = createAsyncThunk(
	'conversations/all',
	async (token, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrlConversation}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const openCreateConversation = createAsyncThunk(
	'conversations/open_create',
	async (values, { rejectWithValue }) => {
		const { token, receiver_id, sender_name, receiver_name, receiver_picture } = values;
		try {
			const { data } = await axios.post(
				`${apiUrlConversation}`,
				{ receiver_id, sender_name, receiver_name, receiver_picture },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const updateAndRemoveMessageConvoById = createAsyncThunk(
	'message/updateandremovedeletedmessageconvo',
	async (values, { rejectWithValue }) => {
		const { token, messageId, files } = values;
		try {
			const { data } = await axios.post(
				`${apiUrlMessage}/update-and-remove-deleted-message-by-id/${messageId}`,
				{ files },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const removeMessagesAndConversation = createAsyncThunk(
	'message/removemessagesandconversation',
	async (values, { rejectWithValue }) => {
		const { token, messages, convo_id } = values;

		try {
			const { data } = await axios.delete(
				`${apiUrlMessage}/delete-conversation-and-messages/${convo_id}`,
				{
					data: { messages }, // Set messages payload within data field
					headers: {
						Authorization: `Bearer ${token}`, // Ensure token is correctly added here
					},
				},
			);
			return data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.error?.message || 'An error occurred');
		}
	},
);

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setActiveConversation: (state, action) => {
			state.activeConversation = action.payload;
		},
		setUpdateMessagesConvo: (state, action) => {
			const convo = state.activeConversation;
			if (!convo) return;
			if (convo._id === action.payload.conversation._id) {
				state.messages = [...state.messages, action.payload];
			}
		},
		addFiles: (state, action) => {
			state.files = [...state.files, action.payload];
		},

		clearFiles: (state) => {
			state.files = [];
		},

		removeFileFromFiles: (state, action) => {
			const index = action.payload;
			const files = [...state.files];
			const fileToRemove = [files[index]];
			state.files = files.filter((file) => !fileToRemove.includes(file));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getConversations.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getConversations.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.conversations = action.payload;
			})
			.addCase(getConversations.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(openCreateConversation.pending, (state) => {
				state.status = 'loading';
				state.error = '';
				state.files = [];
			})
			.addCase(openCreateConversation.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.activeConversation = action.payload;
			})
			.addCase(openCreateConversation.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(getConversationMessages.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getConversationMessages.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.messages = action.payload;
			})
			.addCase(getConversationMessages.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(sendMessageConvo.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(sendMessageConvo.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.messages = [...state.messages, action.payload];
			})
			.addCase(sendMessageConvo.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			
			.addCase(updateAndRemoveMessageConvoById.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(updateAndRemoveMessageConvoById.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
			})
			.addCase(updateAndRemoveMessageConvoById.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})



			.addCase(removeMessagesAndConversation.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(removeMessagesAndConversation.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
			})
			.addCase(removeMessagesAndConversation.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const {
	setActiveConversation,
	setUpdateMessagesConvo,
	addFiles,
	clearFiles,
	removeFileFromFiles,
} = chatSlice.actions;
export default chatSlice.reducer;
