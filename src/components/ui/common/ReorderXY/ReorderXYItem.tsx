import { FC, ReactNode } from "react";

export interface ReorderXYItemProps {
  children: ReactNode;
  i: number;
  updatePosition: (
    i: number,
    {
      width,
      height,
      top,
      left,
    }: { width: number; height: number; top: number; left: number }
  ) => boolean;
  updateOrder: (i: number) => void;
}

const ReorderXYItem: FC<ReorderXYItemProps> = () => {
  return <div>ReorderXYItem</div>;
};

export default ReorderXYItem;
