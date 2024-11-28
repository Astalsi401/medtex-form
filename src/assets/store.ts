import { useDispatch, useSelector } from "react-redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { TeamInfo, Discussion, DiscussionOther } from "@types";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    loading: true,
    saving: false,
    teamId: "",
    error: null,
    completed: false,
    data: {} as TeamInfo,
    discussionOther: {
      type: "",
    },
  } as {
    loading: boolean;
    saving: boolean;
    teamId: string;
    error: string | null;
    completed: boolean;
    data: TeamInfo;
    discussionOther: DiscussionOther;
  },
  reducers: {
    setState: (state: any, { payload }: PayloadAction<{ [key: string]: boolean | string | null | TeamInfo | Discussion }>) => Object.keys(payload).forEach((key) => (state[key] = payload[key])),
    setDiscussionOther: (state: any, { payload }: PayloadAction<{ [key: string]: string }>) => Object.keys(payload).forEach((key) => (state.discussionOther[key] = payload[key])),
  },
});

export const others = "Others";

export const store = configureStore({
  reducer: stateSlice.reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const { setState, setDiscussionOther } = stateSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
