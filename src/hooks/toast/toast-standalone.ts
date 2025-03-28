
import { reducer } from "./toast-reducer";
import { Action, ToastState, ToasterToast, genId, initialState } from "./types";

// Export a standalone toast function for use without hooks
const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = initialState;

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();
  
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });
  
  return {
    id,
    dismiss,
    update,
  };
}
