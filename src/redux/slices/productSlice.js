import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}/cart`;

const initialState = {
	status: '',
	error: '',
	product: {},
	products: [],
};

export const addProduct = createAsyncThunk(
	'product/addproduct',
	async (values, { rejectWithValue }) => {
		const { token, newProduct } = values;
		try {
			const { data } = await axios.post(`${apiUrl}/add-product`, newProduct, {
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

export const getProducts = createAsyncThunk(
	'products/getproducts',
	async (token, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(`${apiUrl}/`, {
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

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		addProductToCart: (state, action) => {
			state.products?.push(action?.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(addProduct.pending, (state) => {
				state.status = 'loading';
				state.error = '';
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.error = '';
				// state.products.push(action.payload);
				state.product = action.payload.product;
			})
			.addCase(addProduct.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { addProductToCart } = productSlice.actions;
export default productSlice.reducer;
