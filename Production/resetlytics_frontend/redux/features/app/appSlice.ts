import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    sentiment: any;
    words: any;
    service: any;
}

const initialState = {
    sentiment: null,
    words: null,
    service: null,
} as AppState;

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSentiment: (state, action) => {
            state.sentiment = action.payload;
        },
        setWords: (state, action) => {
            state.words = action.payload;
        },
		setService: (state, action) => {
            state.service = action.payload;
        },
    }
})

export const { setSentiment, setWords, setService } = appSlice.actions;
export default appSlice.reducer;
