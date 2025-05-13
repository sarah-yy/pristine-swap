import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingTaskPayload, LoadingTaskRegistry, LoadingTasksList } from "../../../constants";

interface LoadingTaskState {
  registry: LoadingTaskRegistry;
  tasksList: LoadingTasksList;
}

const initialState: LoadingTaskState = {
  registry: {},
  tasksList: {},
};

const loadingTaskSlice = createSlice({
  name: "loadingTask",
  initialState,
  reducers: {
    addBackgroundLoading: (state, action: PayloadAction<LoadingTaskPayload>) => {
      const { name, uuid } = action.payload;
      const currentTime = new Date().toISOString();
      state.registry = {
        ...state.registry,
        [uuid]: name,
      };
      state.tasksList = {
        ...state.tasksList,
        [name]: currentTime,
      };
    },
    removeBackgroundLoading: (state, action: PayloadAction<string>) => {
      const taskName = state.registry[action.payload]
      if (taskName) {
        delete state.registry[action.payload];
        delete state.tasksList[taskName];
      }
    },
  },
});

export const {
  actions: loadingTaskActions,
  reducer: loadingTaskReducer,
} = loadingTaskSlice;