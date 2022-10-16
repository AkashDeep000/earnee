import create from "zustand";
import {
  persist
} from "zustand/middleware";

const useSubmitStore = create(
  persist(
    (set, get) => ({
      isSubmit: false,
      setIsSubmit: (state) => {
        set({
          isSubmit: state,
        });
      },

    }),

    {
      name: "isSubmit",
    }
  )
);

export default useSubmitStore;