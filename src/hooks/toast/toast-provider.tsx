
import * as React from "react";
import { Action, ToastState, initialState } from "./types";
import { ToastContext } from "./toast-context";
import { addToRemoveQueue, reducer } from "./toast-reducer";
import { TOAST_REMOVE_DELAY } from "./types";

// Provider component to wrap the app with
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Set up a custom dispatch function that handles toast removal queueing
  const enhancedDispatch = React.useCallback((action: Action) => {
    if (action.type === "DISMISS_TOAST") {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId, TOAST_REMOVE_DELAY, dispatch);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id, TOAST_REMOVE_DELAY, dispatch);
        });
      }
    }
    dispatch(action);
  }, [state.toasts]);

  const contextValue = React.useMemo(() => ({
    state,
    dispatch: enhancedDispatch,
  }), [state, enhancedDispatch]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
