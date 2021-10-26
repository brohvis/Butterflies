import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import tradly from "tradly";

export const signIn = createAsyncThunk(
	"auth/signIn",

	async ({ prams, key }, thunkAPI) => {
		try {

			const response = await tradly.user.login(prams, key);
			const { data } = await response;
			if (!response.error) {
				return data;
			} else {
				const { error } = await response;
				return error;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);


export const signUp = createAsyncThunk(
	"auth/signUp",

	async ({ prams, key }, thunkAPI) => {
		try {
			const response = await tradly.user.register(prams, key);
			const { data } = await response;
			if (!response.error) {
				return data;
			} else {
				const { error } = await response;
				return error;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const verifyUser = createAsyncThunk(
	"auth/verifyUser",

	async ({ prams, key }, thunkAPI) => {
		try {
			const response = await tradly.user.verify(prams, key);
			const { data } = await response;
			if (!response.error) {
				return data;
			} else {
				const { error } = await response;
				return error;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		verifyId: "",
		login: false,
		user_email: "",
		first_name: "",
		last_name: "",
		auth_key: "",
		refresh_key: "",
		profile_pic: "",
		user_details: "",
	},
	reducers: {
		clearState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			return state;
		},
		logout: (state) => {
			state.login = false;
			localStorage.clear();
			window.location.reload();
			return state;
		},
	},
	extraReducers: {
		[signIn.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.login = true;
				state.errorMessage = "";
				state.user_email = payload?.user.email;
				state.first_name = payload?.user.first_name;
				state.last_name = payload?.user.last_name;
				state.auth_key = payload?.user?.key.auth_key;
				state.refresh_key = payload?.user?.key.refresh_key;
				state.user_details = payload?.user;
				localStorage.setItem(
					"auth_key",
					payload?.user?.key.auth_key
				);
				localStorage.setItem(
					"refresh_key",
					payload?.user?.key.refresh_key
				);
			}
		},
		[signIn.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[signIn.rejected]: (state, { payload }) => {
			console.log("====================================");
			console.log(payload);
			console.log("====================================");
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[signUp.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.errorMessage = "";
				state.verifyId = payload.verify_id;
			}
		},
		[signUp.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[signUp.rejected]: (state, { payload }) => {
			console.log("====================================");
			console.log(payload);
			console.log("====================================");
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[verifyUser.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.login = true;
				state.errorMessage = "";
				state.user_email = payload?.user.email;
				state.first_name = payload?.user.first_name;
				state.last_name = payload?.user.last_name;
				state.auth_key = payload?.user?.key.auth_key;
				state.refresh_key = payload?.user?.key.refresh_key;
				state.user_details = payload?.user;
				localStorage.setItem(
					"auth_key",
					payload?.user?.key.auth_key
				);
				localStorage.setItem(
					"refresh_key",
					payload?.user?.key.refresh_key
				);
			}
		},
		[verifyUser.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[verifyUser.rejected]: (state, { payload }) => {
			console.log("====================================");
			console.log(payload);
			console.log("====================================");
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

export const { clearState,logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
