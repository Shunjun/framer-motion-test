import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router-dom";

export function AnimatedOutlet(): React.JSX.Element {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="sync" initial={true}>
      {element && cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
