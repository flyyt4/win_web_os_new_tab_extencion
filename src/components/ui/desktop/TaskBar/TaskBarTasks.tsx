import { useRef, useState } from "react";
import { Reorder, motion } from "framer-motion";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Link from "../../../os/Link";
import { useOnClickOutside } from "usehooks-ts";
import { StartMenu } from "../StartMenu";
import clsx from "clsx";

interface Task {
  name: string;
  action: "link" | "startMenu";
  icon: string;
  link?: string;
}

function TaskBarTasks({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  const [tasks, setTasks] = useState<Task[]>([
    { name: "start-menu", action: "startMenu", icon: "/icons/start-menu.png" },
  ]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const starMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(starMenuRef, onClose);
  return (
    <Reorder.Group
      values={tasks}
      onReorder={setTasks}
      className={clsx(
        "p-1 h-full flex items-center data-[style=default]:justify-center data-[style=compact]:justify-center",
        ""
      )}
      data-style={taskbarStyle}
      axis="x"
    >
      {tasks.map((task) => (
        <Reorder.Item value={task} key={task.name} className="size-8">
          {task.action === "startMenu" && (
            <>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  className="p-1 size-full rounded-sm"
                  variant="light"
                  style={{ minWidth: "unset", height: "100%" }}
                  onPress={onOpen}
                >
                  <img src={task.icon} className="size-6" />
                </Button>
              </motion.div>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top"
                scrollBehavior="inside"
                backdrop="transparent"
                ref={starMenuRef}
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    },
                    exit: {
                      y: 20,
                      opacity: 0,
                      transition: {
                        duration: 0.2,
                        ease: "easeIn",
                      },
                    },
                  },
                }}
                size="2xl"
                className="[&>button[aria-label=Close]]:hidden h-[90.91vh] overflow-hidden"
              >
                <ModalContent>
                  {(onClose) => <StartMenu close={onClose} />}
                </ModalContent>
              </Modal>
            </>
          )}
          {task.action === "startMenu" && (
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link href={task.link}>
                <Button
                  className="p-1 size-full rounded-sm"
                  variant="light"
                  style={{ minWidth: "unset", height: "100%" }}
                >
                  <img src={task.icon} className="size-6" />
                </Button>
              </Link>
            </motion.div>
          )}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

export default TaskBarTasks;
