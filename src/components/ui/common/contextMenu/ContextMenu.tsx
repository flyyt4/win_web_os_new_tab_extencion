import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import ContextMenuOptions from "./ContextMenuOptions";
import ContextMenuTrigger from "./ContextMenuTrigger";
import { useContextMenus } from "../../../../stores/contextMenu";

interface ContextMenuProps {
  children: ReactNode;
}

const menuIdContext = createContext(0);

const ContextMenu: FC<ContextMenuProps> = ({ children }) => {
  const [menuId, setMenuId] = useState(0);
  const { addMenu, removeMenu } = useContextMenus();
  const trigger = Children.map(children, (child) =>
    isValidElement(child) && child.type === ContextMenuTrigger ? child : null
  );

  const options = Children.map(children, (child) =>
    isValidElement(child) && child.type === ContextMenuOptions ? child : null
  );
  useEffect(() => {
    const menuId = addMenu();
    setMenuId(menuId);
    return () => removeMenu(menuId);
  }, []);

  return (
    <menuIdContext.Provider value={menuId}>
      {trigger}
      {options}
    </menuIdContext.Provider>
  );
};

export const useMenuId = () => {
  return useContext(menuIdContext);
};

export default ContextMenu;
