import { Icon } from "@iconify-icon/react/dist/iconify.js";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import clsx from "clsx";

function TaskBarInfo({
  taskbarStyle,
}: {
  taskbarStyle: "default" | "joined" | "classic" | "compact";
}) {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <Button
          className={clsx(
            "size-full flex justify-between items-center text-lg dark:text-white/50 data-[style=default]:px-4",
            "data-[style=compact]:px-2 bg-transparent"
          )}
          radius="none"
          style={{ height: "100%" }}
          data-style={taskbarStyle}
        >
          <Icon icon="tabler:wifi" />
          <Icon icon="tabler:volume" />
          <Icon icon="tabler:battery-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>TaskBarInfo</p>
      </PopoverContent>
    </Popover>
  );
}

export default TaskBarInfo;
