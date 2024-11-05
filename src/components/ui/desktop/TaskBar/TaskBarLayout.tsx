import TaskBarLayoutDefault from "./TaskBarLayoutDefault";
import TaskBarLayoutClassic from "./TaskBarLayoutClassic";
import TaskBarLayoutJoined from "./TaskBarLayoutJoined";
import TaskBarLayoutCompact from "./TaskBarLayoutCompact";

export const animationVariant = {
  default: {
    opacity: 1,
    y: 0,
  },
  compact: {
    opacity: 1,
    y: 0,
  },
  classic: {
    opacity: 1,
    y: 0,
  },
  joined: {
    opacity: 1,
    y: 0,
  },
};

export const initialAnimation = {
  opacity: 0,
  y: -100,
};

function TaskBarLayout({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  return (
    <div className="size-full flex justify-center p-2 relative">
      {taskbarStyle === "default" && (
        <TaskBarLayoutDefault taskbarStyle={taskbarStyle} />
      )}
      {taskbarStyle === "joined" && (
        <TaskBarLayoutJoined taskbarStyle={taskbarStyle} />
      )}
      {taskbarStyle === "classic" && (
        <TaskBarLayoutClassic taskbarStyle={taskbarStyle} />
      )}
      {taskbarStyle === "compact" && (
        <TaskBarLayoutCompact taskbarStyle={taskbarStyle} />
      )}
    </div>
  );
}

export default TaskBarLayout;
