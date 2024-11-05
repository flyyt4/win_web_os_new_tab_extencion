import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import TaskBarWidgets from "./TaskBarWidgets";
import TaskBarTasks from "./TaskBarTasks";
import TaskBarInfo from "./TaskBarInfo";
import { animationVariant, initialAnimation } from "./TaskBarLayout";

function TaskBarLayoutClassic({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  return (
    <motion.div
      initial={initialAnimation}
      variants={animationVariant}
      animate={taskbarStyle}
      className="w-full justify-center"
    >
      <Card
        className="flex gap-2 flex-row"
        style={{ height: "100%" }}
        radius="sm"
        shadow="none"
      >
        <div className="flex-[1] h-full">
          <TaskBarTasks taskbarStyle={taskbarStyle} />
        </div>
        <div className="h-full w-24">
          <TaskBarWidgets />
        </div>
        <div className="h-full w-24">
          <TaskBarInfo taskbarStyle={taskbarStyle} />
        </div>
      </Card>
    </motion.div>
  );
}

export default TaskBarLayoutClassic;
