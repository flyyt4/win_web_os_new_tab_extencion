import { ReactNode } from "react";
import { useWindowDrag } from "./Window";

function WindowDrag({ children }: { children: ReactNode }) {
  const handlerDrag = useWindowDrag();
  return (
    <div onPointerDown={handlerDrag} style={{ touchAction: "none" }}>
      {children}
    </div>
  );
}

export default WindowDrag;
