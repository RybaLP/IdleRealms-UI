import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeroClass } from '../types/game.types';

interface Credentials {
    email: string;
    nickname: string;
    password: string;
    heroNickname: string;
}

export interface RegisterState {
    character : {
        heroClass : HeroClass;
    };

    visualConfig : {
        configString : string;
    },
    
    credentials : Credentials
}

const initialState : RegisterState = {
    character: {
        heroClass: "WARRIOR",
    }, 
    visualConfig: {
        configString: '0;0;0;0;0;'
    },
    credentials: {
        email: '',
        nickname: '',
        password: '',
        heroNickname: ''
    }
};

export const registerSlice = createSlice({
    name: 'register-form',
    initialState,
    reducers: {
        setClass : (state,action : PayloadAction<HeroClass>) => {
            state.character.heroClass = action.payload;
        },

        setVisualConfig : (state, action : PayloadAction<string>) => {
            state.visualConfig.configString = action.payload;
        },

        setCredentials: (state, action: PayloadAction<{ field: keyof Credentials; value: string }>) => {
            const { field, value } = action.payload;
            state.credentials[field] = value;
        },

        resetForm : () => initialState
    }
});

export const { setClass, setVisualConfig, setCredentials, resetForm } = registerSlice.actions;
export default registerSlice.reducer;