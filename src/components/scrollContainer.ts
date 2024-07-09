import { createContext, useContext } from "react";

const ScrollContainerContext = createContext<{
  isReady: boolean;
  ref: React.MutableRefObject<HTMLDivElement | null>;
  updateReady: () => void;
}>({
  isReady: false,
  ref: { current: null },
  updateReady: () => {},
});

export const useScrollContainer = () => useContext(ScrollContainerContext);

export const ScrollContainerProvider = ScrollContainerContext.Provider;
