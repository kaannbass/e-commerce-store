import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    language: 'en' | 'tr';
}

const initialState: LanguageState = {
    language: (localStorage.getItem('language') as 'en' | 'tr') || 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage(state, action: PayloadAction<'en' | 'tr'>) {
            state.language = action.payload;
            localStorage.setItem('language', action.payload);
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
