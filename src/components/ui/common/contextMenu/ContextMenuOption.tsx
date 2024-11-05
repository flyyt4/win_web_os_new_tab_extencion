import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Button, Card, Kbd } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Children, FC, isValidElement, ReactNode, useRef } from "react";
import { useHover } from "usehooks-ts";
import { useContextMenus } from "../../../../stores/contextMenu";

interface ContextMenuOptionsProps {
  children: ReactNode[] | ReactNode;
  onClick?: () => void;
  className?: string;
  shortcut?: string;
  icon: string;
}

const ContextMenuOption: FC<ContextMenuOptionsProps> = ({
  children,
  icon,
  shortcut,
  onClick = () => {},
}) => {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(subMenuRef);
  const isSubMenu = Children.map(children, (child) =>
    isValidElement(child) && child.type === ContextMenuOption ? child : null
  );
  const setVisible = useContextMenus((state) => state.setVisible);
  const variants = {
    "fase-in": {
      height: "auto",
    },
    "fase-out": {
      height: 0,
    },
  };
  if (isSubMenu) {
    if (isSubMenu.length > 0) {
      const childrenNodes = children as ReactNode[];
      return (
        <div className="w-full relative" ref={subMenuRef}>
          <Button
            className="w-[calc(100%-0.5rem)] h-9 m-1 p-2 justify-between"
            variant="light"
            radius="sm"
          >
            <div className="flex gap-2 items-center text-md">
              <Icon icon={icon} />
              {childrenNodes[0]}
            </div>
            <Icon icon="tabler:chevron-right" />
          </Button>
          <motion.div
            className="absolute right-[-100%] top-1/2 -translate-y-1/2"
            variants={variants}
            exit="fase-out"
            animate={isHover ? "fase-in" : "fase-out"}
          >
            <Card
              className="w-56 p-1 overflow-visible"
              style={{ display: isHover ? "flex" : "none" }}
            >
              {childrenNodes.slice(1)}
            </Card>
          </motion.div>
        </div>
      );
    }
    return (
      <Button
        className="w-[calc(100%-0.25rem)] h-[calc(100%-0.25rem)] m-1 p-2 justify-between"
        variant="light"
        radius="sm"
        onClick={() => {
          onClick();
          setVisible(false);
        }}
      >
        <div className="flex gap-2 items-center text-md">
          <Icon icon={icon} />
          {children}
        </div>
        {shortcut && (
          <Kbd
            classNames={{
              content: "text-sm",
            }}
          >
            {shortcut}
          </Kbd>
        )}
      </Button>
    );
  }
};

export default ContextMenuOption;
