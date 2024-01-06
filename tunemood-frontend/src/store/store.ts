import { create } from "zustand";

interface Store {
  image_state: any;
  set_image_state: (image_state: any) => void;
  value_state: string;
  set_value_state: (value: string) => void;
}

export const useStore = create<Store>()((set) => ({
  image_state: null,
  set_image_state: (image_state) =>
    set((state) => ({ image_state: image_state })),
  value_state: "",
  set_value_state: (value_state) => set((state) => ({ value_state: value_state })),
}));
