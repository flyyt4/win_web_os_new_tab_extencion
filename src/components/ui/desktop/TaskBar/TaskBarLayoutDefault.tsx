import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";
import TaskBarWidgets from "./TaskBarWidgets";
import TaskBarTasks from "./TaskBarTasks";
import TaskBarInfo from "./TaskBarInfo";
import { animationVariant, initialAnimation } from "./TaskBarLayout";

function TaskBarLayoutDefault({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  return (
    <motion.div
      className="flex h-full gap-2 w-full justify-center sm:px-0 lg:px-36 md:px-20"
      initial={initialAnimation}
      variants={animationVariant}
      animate={taskbarStyle}
    >
      <Card
        style={{ height: "100%" }}
        className="w-32"
        radius="sm"
        shadow="none"
      >
        <TaskBarWidgets />
      </Card>
      <Card
        style={{ height: "100%" }}
        className="flex-[1]"
        radius="sm"
        shadow="none"
      >
        <TaskBarTasks taskbarStyle={taskbarStyle} />
      </Card>
      <Card
        style={{ height: "100%" }}
        className="w-32"
        radius="sm"
        shadow="none"
      >
        <TaskBarInfo taskbarStyle={taskbarStyle} />
      </Card>
    </motion.div>
  );
}

export default TaskBarLayoutDefault;
