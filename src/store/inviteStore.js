import create from "zustand";
import { persist } from "zustand/middleware";

const useInviteStore = create(
  persist(
    (set, get) => ({
      invite: "",
      addInvite: (referId) => {
        set({
          invite: referId,
        });
      },
      removeInvite: () => {
        set(() => {
          invite: "";
        });
      },
    }),

    {
      name: "invite",
    }
  )
);

export default useInviteStore;
