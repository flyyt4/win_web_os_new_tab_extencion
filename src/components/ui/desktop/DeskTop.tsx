import Background from "./Background";
import Desk from "./desk/Desk";
import { TaskBar } from "./TaskBar";

function DeskTop() {
  return (
    <div className="grid grid-rows-[1fr_3.625rem] size-full">
      <Desk />
      <TaskBar />
      <Background />
    </div>
  );
}

export default DeskTop;
