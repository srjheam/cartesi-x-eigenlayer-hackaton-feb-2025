import { User } from "@/types/user";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface UserStore {
  user?: User;
  setUser: (user: User) => void;
  resetUser: () => void;
}

type UserPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

const useUserStore = create<UserStore>()(
  (persist as UserPersist)(
    (set) => {
      const initialStore: UserStore = {
        user: undefined,
        setUser: (user) => set({ user }),
        resetUser: () => set({ user: undefined }),
      };

      return initialStore;
    },
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
