import { FC, MouseEventHandler, ReactNode, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useMenuId } from "./ContextMenu";
import { useContextMenus } from "../../../../stores/contextMenu";

interface ContextMenuTriggerProps {
  children: ReactNode;
}

const ContextMenuTrigger: FC<ContextMenuTriggerProps> = ({ children }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuId = useMenuId();
  const { setCurrentMenu, setVisible, setPosition } = useContextMenus(
    (state) => state
  );
  const handlerContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setCurrentMenu(menuId);
    setVisible(true);
    setPosition(e.clientX, e.clientY);
  };

  useOnClickOutside(triggerRef, () => {
    setVisible(false);
  });

  return (
    <div
      onContextMenu={handlerContextMenu}
      className="size-fit"
      ref={triggerRef}
    >
      {children}
    </div>
  );
};

export default ContextMenuTrigger;
