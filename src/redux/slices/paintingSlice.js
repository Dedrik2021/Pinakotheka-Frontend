import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}/painting`;

const initialState = {
	status: '',
	error: '',
    paintings: []
};

export const getAllPaintings = createAsyncThunk(
	'painting/getpaintings',
	async (_, {rejectWithValue} ) => {
		try {
			const { data } = await axios.get(`${apiUrl}/get-all-paintings`);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

export const createPainting = createAsyncThunk(
	'painting/createpainting',
	async (values, {rejectWithValue} ) => {
		try {
			const { data } = await axios.post(`${apiUrl}/add-painting`, values);
			return data;
		} catch (error) {
			return rejectWithValue(error.response.data.error.message);
		}
	},
);

// useEffect(() => {
//     socket.on('get-painting', (newPainting) => {
//         dispatch(addPainting(newPainting))
//     })

//     return () => {
//         socket.off('get-paintings');
//     };
// }, [dispatch, socket])

// console.log(paintings);

// const handleSendPainting = async (e) => {
//     e.preventDefault();

//     const newPainting = {
//         authorId: "6693f94b6253f6c58c0e150a",
//         title: "The Big one progress painting mother fucker",
//         author: user.name,
//         description: "This is a Three painting of mine",
//         price: 1000,
//         image: "https://m.media-amazon.com/images/I/81DO2H9zhwL._AC_UF1000,1000_QL80_.jpg",
//         material: "Vinyl, Acryl",
//         size: "250x800"
//     }

//     const result = await dispatch(createPainting(newPainting))
//     if (createPainting.fulfilled.match(result)) {
//         const createdPainting = result.payload;
//         socket.emit('newPainting', createdPainting);
//         console.log('Painting sent to server:', createdPainting);
//     } else {
//         console.error('Failed to create painting:', result.error.message);
//     }
// }

export const paintingSlice = createSlice({
	name: 'painting',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = action.payload;
		},

		setStatus: (state, action) => {
			state.status = action.payload;
		},

        addPainting: (state, action) => {
            state.paintings.push(action.payload);
        }
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPaintings.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getAllPaintings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.paintings = action.payload;
			})
			.addCase(getAllPaintings.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})


			.addCase(createPainting.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(createPainting.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.paintings.push(action.payload.painting);
			})
			.addCase(createPainting.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const {setError, setStatus, addPainting } = paintingSlice.actions;
export default paintingSlice.reducer;
