import { useRef, useState } from "react";
import { useEventListener, useHover } from "usehooks-ts";

function TaskBarWidgets() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  const [step, setStep] = useState(0);
  const handleWheel = (e: WheelEvent) => {
    if (isHover) {
      if (e.deltaY < 0) {
        setStep(step + 1);
      } else {
        setStep(step - 1);
      }
    }
  };

  useEventListener("wheel", handleWheel, hoverRef);

  return (
    <div className="size-full select-none" ref={hoverRef}>
      {step}
    </div>
  );
}

export default TaskBarWidgets;
