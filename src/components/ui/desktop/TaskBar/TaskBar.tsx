import { useOsUiConfigStore } from "../../../../stores/osUiConfig";
import TaskBarLayout from "./TaskBarLayout";

function TaskBar() {
  const taskbarStyle = useOsUiConfigStore((state) => state.taskbarStyle);

  return (
    <nav className="z-10 overflow-hidden">
      <TaskBarLayout taskbarStyle={taskbarStyle} />
    </nav>
  );
}

export default TaskBar;
