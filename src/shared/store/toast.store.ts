import { create } from "zustand";

type ToastType = "error" | "success" | "info";

type ToastState = {
  visible: boolean;
  message: string;
  type: "error" | "success" | "info";
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  show: (
    message: string,
    type?: "error" | "success" | "info",
    options?: {
      actionLabel?: string;
      onAction?: () => void;
      duration?: number;
    }
  ) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: "",
  type: "info",
  actionLabel: undefined,
  onAction: undefined,

  show: (message, type = "info", options) =>
  set({
    visible: true,
    message,
    type,
    actionLabel: options?.actionLabel,
    onAction: options?.onAction,
    duration: options?.duration ?? 5000,
  }),


  hide: () =>
    set({
      visible: false,
      message: "",
      actionLabel: undefined,
      onAction: undefined,
    }),
}));
