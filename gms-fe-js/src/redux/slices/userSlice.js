import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",

    initialState: {
        currentUser: null,
        token: null,
        isFetching: false,
        error: false,
        features: [],
        isSuperAdmin: false,
    },

    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            const payload = action.payload;
            state.isFetching = false;
            state.currentUser = payload.user || payload;
            state.token = payload.token;
            state.error = false;
            state.features = payload.user?.features || [];
            state.isSuperAdmin = payload.user?.isSuperAdmin || false;
        },

        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload || true;
            state.currentUser = null;
            state.token = null;
        },

        signOut: (state) => {
            state.currentUser = null;
            state.token = null;
            state.isFetching = false;
            state.error = false;
            state.features = [];
            state.isSuperAdmin = false;
        },

        // Action to update token without full login
        setToken: (state, action) => {
            state.token = action.payload;
        },

        // Action to clear token
        clearToken: (state) => {
            state.token = null;
        },
    },
});

export const {
    loginFailure,
    loginStart,
    loginSuccess,
    signOut,
    setToken,
    clearToken
} = userSlice.actions;

export default userSlice.reducer;