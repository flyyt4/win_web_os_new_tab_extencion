import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import TaskBarWidgets from "./TaskBarWidgets";
import TaskBarTasks from "./TaskBarTasks";
import TaskBarInfo from "./TaskBarInfo";
import { animationVariant, initialAnimation } from "./TaskBarLayout";

function TaskBarLayoutJoined({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  return (
    <motion.div
      initial={initialAnimation}
      variants={animationVariant}
      animate={taskbarStyle}
      className="w-full justify-center sm:px-0 lg:px-36 md:px-20"
    >
      <Card
        className="flex gap-2 flex-row"
        style={{ height: "100%" }}
        radius="sm"
        shadow="none"
      >
        <div className="w-32 h-full">
          <TaskBarWidgets />
        </div>
        <div className="flex-[1] h-full">
          <TaskBarTasks taskbarStyle={taskbarStyle} />
        </div>
        <div className="w-32 h-full">
          <TaskBarInfo taskbarStyle={taskbarStyle} />
        </div>
      </Card>
    </motion.div>
  );
}

export default TaskBarLayoutJoined;
