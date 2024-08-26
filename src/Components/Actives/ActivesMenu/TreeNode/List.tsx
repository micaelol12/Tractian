import { memo } from "react";

import TreeNode from "./TreeNode";
import { ITreeNode } from "../ActivesMenu";

interface IListProps {
  data: ITreeNode;
  margin: number;
  open: boolean;
}

const List: React.FC<IListProps> = ({ data, margin, open }) => {
  if (!open) {
    return null;
  }

  return (
    <div>
      {data.children.map((d) => (
        <TreeNode data={d} key={d.id} margin={margin + 25} />
      ))}
    </div>
  );
};

export default memo(List);
