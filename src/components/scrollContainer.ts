import { createContext, useContext } from "react";

const ScrollContainerContext =
  createContext<React.RefObject<HTMLElement> | null>(null);

export const useScrollContainer = () => useContext(ScrollContainerContext);

export const ScrollContainerProvider = ScrollContainerContext.Provider;
