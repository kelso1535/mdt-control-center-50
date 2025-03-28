
import * as React from "react";
import { ToastContext } from "./toast-context";
import { ToasterToast, genId } from "./types";

// Hook to access toast functionality
export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  const { state, dispatch } = context;
  
  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
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
    },
    [dispatch]
  );
  
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}
