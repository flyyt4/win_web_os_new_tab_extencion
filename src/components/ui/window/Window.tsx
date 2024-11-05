import { useDragControls, motion } from "framer-motion";
import { PointerEvent, ReactNode, createContext, useContext } from "react";
import { useDeskRef } from "../desktop/desk/Desk";

const windowDragContext = createContext<
  (e: PointerEvent<HTMLDivElement>) => void
>(() => {});

function Window({ children }: { children: ReactNode }) {
  const deskRef = useDeskRef();
  const controls = useDragControls();
  const handlerDrag = (e: PointerEvent<HTMLDivElement>) => {
    controls.start(e);
  };
  return (
    <motion.div
      drag
      dragConstraints={deskRef}
      dragMomentum={false}
      dragControls={controls}
      dragListener={false}
      className="size-fit"
    >
      <windowDragContext.Provider value={handlerDrag}>
        {children}
      </windowDragContext.Provider>
    </motion.div>
  );
}

const useWindowDrag = () => {
  const handler = useContext(windowDragContext);
  if (!handler) throw new Error("useWindowDrag must be used within a Window");
  return handler;
};

export default Window;
export { useWindowDrag };
