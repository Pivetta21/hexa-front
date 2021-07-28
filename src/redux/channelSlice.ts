import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChannelI } from '../models/Channel.model';
import { findChannelByUserId } from 'src/services/channel.service';

import { AuthenticatedUser } from 'src/models/AuthenticatedUser.model';

type StatusType = 'success' | 'loading' | 'failed' | 'unset';

const initialState = {
  isChannelMemoized: false,
  channel: {} as ChannelI,
  status: 'unset' as StatusType,
};

export const getChannel = createAsyncThunk(
  'channel/get',
  async (authenticatedUser: AuthenticatedUser) => {
    let channel = {} as ChannelI;

    if (authenticatedUser && authenticatedUser.token) {
      const serviceResponse = await findChannelByUserId(
        authenticatedUser.user.id,
      );

      if (!serviceResponse.errorResponse && serviceResponse.data) {
        channel = serviceResponse.data;
      }
    }

    return channel;
  },
);

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannel: (state, action: PayloadAction<ChannelI>) => {
      state.channel = { ...state.channel, ...action.payload };
    },
    resetChannel: (state) => {
      state.isChannelMemoized = false;
      state.channel = {} as ChannelI;
      state.status = 'unset';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannel.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(getChannel.fulfilled, (state, { payload }) => {
      state.isChannelMemoized = true;
      state.channel = payload;
      state.status = 'success';
    });

    builder.addCase(getChannel.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setChannel, resetChannel } = channelSlice.actions;

export default channelSlice.reducer;
