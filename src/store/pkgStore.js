import create from "zustand";
import {
  persist
} from "zustand/middleware";

const usePkgStore = create(
  persist(
    (set, get) => ({
      pkg: "",
      addPkg: (pkgId) => {
        set({
          pkg: pkgId,
        });
      },
      removePkg: () => {
        set(() => {
          pkg: "";
        });
      },
    }),

    {
      name: "pkg",
    }
  )
);

export default usePkgStore;