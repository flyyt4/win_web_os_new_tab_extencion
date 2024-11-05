import { useRef, createContext, useContext, RefObject } from "react";
import { Terminal } from "../../programs/Terminal";

const deskRefContext = createContext<RefObject<HTMLDivElement> | null>(null);

function Desk() {
  const deskRef = useRef<HTMLDivElement>(null);

  return (
    <deskRefContext.Provider value={deskRef}>
      <div className="z-10" ref={deskRef}>
        <Terminal />
      </div>
    </deskRefContext.Provider>
  );
}

const useDeskRef = () => {
  const deskRef = useContext(deskRefContext);
  if (!deskRef) throw new Error("useDeskRef must be used within a Desk");
  return deskRef;
};

export default Desk;

export { useDeskRef };
