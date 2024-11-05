import { Card } from "@nextui-org/react";
import { FC, ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMenuId } from "./ContextMenu";
import { useContextMenus } from "../../../../stores/contextMenu";

interface ContextMenuOptionsProps {
  children: ReactNode;
}

const ContextMenuOptions: FC<ContextMenuOptionsProps> = ({ children }) => {
  const [size] = useState({ width: 0, height: 0 });
  const optionsRef = useRef<HTMLDivElement>(null);
  const menuId = useMenuId();
  const { currentMenu, visible, x, y } = useContextMenus((state) => state);

  return (
    <motion.div
      ref={optionsRef}
      initial={{ x: 0, y: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
      animate={{
        left: x + size.width / 2,
        top: y + size.height / 2,
        opacity: visible ? 1 : 0,
      }}
      className="fixed"
      style={{ display: visible && currentMenu === menuId ? "flex" : "none" }}
    >
      <Card className="w-56 p-1 overflow-visible" radius="sm">
        {children}
      </Card>
    </motion.div>
  );
};

export default ContextMenuOptions;
