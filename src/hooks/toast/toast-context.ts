
import * as React from "react";
import { Action, ToastState, initialState } from "./types";

// Create a React context for toast state
export const ToastContext = React.createContext<{
  state: ToastState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});
