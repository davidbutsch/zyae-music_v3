import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { QueueSource } from "@/features/player";
import { Track } from "@/features/tracks";

const fisherYatesShuffle = (queue: Player["queue"], fixedIndex?: number) => {
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    if (i === fixedIndex || j === fixedIndex) continue;

    const temp = queue[i];
    queue[i] = queue[j];
    queue[j] = temp;
  }
  return queue;
};

type Player = {
  isPlaying: boolean;
  queue: Track[];
  oldQueue: Track[];
  activeQueueIndex: number;
  queueSource: QueueSource;
  loadingAudio: Boolean;
  options: {
    shuffle: Boolean;
    loop: Boolean;
  };
};

const initialState: Player = {
  isPlaying: false,
  queue: [],
  oldQueue: [],
  activeQueueIndex: 0,
  queueSource: { title: "Suggested tracks" },
  loadingAudio: false,
  options: {
    shuffle: false,
    loop: false,
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setQueue: (
      state,
      action: PayloadAction<Track[] | { fixedIndex?: number; tracks: Track[] }>
    ) => {
      if (Array.isArray(action.payload)) state.queue = action.payload;
      else {
        if (action.payload.fixedIndex)
          state.activeQueueIndex = action.payload.fixedIndex;

        if (state.options.shuffle) {
          state.oldQueue = [...action.payload.tracks];
          const queue = fisherYatesShuffle(
            [...action.payload.tracks],
            action.payload.fixedIndex
          );
          state.queue = queue;
        } else {
          state.queue = action.payload.tracks;
        }
      }
    },
    setOldQueue: (state, action: PayloadAction<Track[]>) => {
      state.oldQueue = action.payload;
    },
    setActiveQueueIndex: (state, action: PayloadAction<number>) => {
      state.activeQueueIndex = action.payload;
    },
    setQueueSource: (state, action: PayloadAction<QueueSource>) => {
      state.queueSource = action.payload;
    },
    addToQueue: (state, action: PayloadAction<Track[]>) => {
      const firstHalf = state.queue.slice(0, state.activeQueueIndex + 1);
      const secondHalf = state.queue.slice(state.activeQueueIndex + 1);
      state.queue = [...firstHalf, ...action.payload, ...secondHalf];
      // state.activeQueueIndex;
    },
    clearQueue: (state, _action: PayloadAction<void>) => {
      state.queue = [];
      state.activeQueueIndex = 0;
    },
    skipForward: (state, _action: PayloadAction<void>) => {
      if (state.queue.length > state.activeQueueIndex + 1)
        state.activeQueueIndex = state.activeQueueIndex + 1;
      else state.isPlaying = false;
    },
    skipBackward: (state, _action: PayloadAction<void>) => {
      const audio = document.querySelector<HTMLAudioElement>("#audio");
      if (!audio) return;

      if (state.activeQueueIndex !== 0) {
        if (audio.currentTime > 5) audio.currentTime = 0;
        else state.activeQueueIndex = state.activeQueueIndex - 1;
      } else audio.currentTime = 0;
    },
    setLoadingAudio: (state, action: PayloadAction<boolean>) => {
      state.loadingAudio = action.payload;
    },
    setShuffle: (state, action: PayloadAction<Boolean>) => {
      const enableShuffle = () => {
        state.options.shuffle = true;
        state.oldQueue = [...state.queue];
        const queue = fisherYatesShuffle(
          [...state.queue],
          state.activeQueueIndex
        );
        state.queue = queue;
      };

      const disableShuffle = () => {
        state.options.shuffle = false;
        const index = state.oldQueue.findIndex(
          (oldQueueTrack) =>
            oldQueueTrack.id === state.queue[state.activeQueueIndex].id
        );
        state.activeQueueIndex = index >= 0 ? index : 0;
        state.queue = [...state.oldQueue];
      };

      if (action.payload) enableShuffle();
      else disableShuffle();
    },
  },
});

export const {
  setPlayback,
  setQueue,
  setOldQueue,
  setActiveQueueIndex,
  setQueueSource,
  addToQueue,
  clearQueue,
  skipForward,
  skipBackward,
  setLoadingAudio,
  setShuffle,
} = playerSlice.actions;

export default playerSlice.reducer;
