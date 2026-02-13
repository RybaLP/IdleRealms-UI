import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HeroProfile } from '../types/hero/hero';
import { heroService } from '../services/heroService';


export const fetchHeroData = createAsyncThunk(
  'hero/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await heroService.getMyHero()
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface HeroState {
  data: HeroProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: HeroState = {
  data: null,
  loading: false,
  error: null,
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    logoutHero: (state) => {
      state.data = null;
    },

    updateHeroAfterPurchase: (state, action) => {
      if (state.data) {
        state.data.gold = action.payload.currentGold;
        state.data.inventory = action.payload.updatedInventory;
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeroData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeroData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutHero , updateHeroAfterPurchase} = heroSlice.actions;
export default heroSlice.reducer;