import { memo, useEffect, useMemo, useRef, useState } from "react";
import { EType, ITreeNode } from "../ActivesMenu";
import List from "./List";
import { useCompanie } from "../../../../Contexts/CompanieContext";
import { IAsset } from "../../../../model";

interface ILocationProps {
  data: ITreeNode;
  margin?: number;
  root?: boolean;
  style?: React.CSSProperties | undefined;
  measure?: () => void;
}

const TreeNode: React.FC<ILocationProps> = ({
  data,
  margin = 0,
  style,
  root = false,
}) => {
  const [open, setOpen] = useState(root);

  const { setComponent, component } = useCompanie();

  const isAsset = data.type === EType.ASSET;

  const isLocation = data.type === EType.LOCATION;

  const isComponent = data.type === EType.COMPONENT;

  const selected = data.id === component?.id;

  let src = "";

  switch (data.type) {
    case EType.ASSET:
      src = "/asset.png";
      break;
    case EType.COMPONENT:
      src = "/component.png";
      break;
    default:
      src = "/location.png";
      break;
  }

  const hasChildren = data.children.length > 0;

  const handleClick = () => {
    if (isComponent) {
      setComponent(data as IAsset);
    }
  };

  return (
    <div style={{ marginLeft: margin, ...style }}>
      {!root && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: "3px 0px",
            backgroundColor: selected ? "#2188ff" : undefined,
            color: selected ? "white" : "black",
          }}
          onClick={handleClick}
        >
          {hasChildren && (
            <img
              src="/chevron.png"
              width={20}
              style={{ transform: open ? "rotate(180deg)" : undefined }}
              height={20}
              onClick={() => {
                setOpen((prev) => !prev);
              }}
            />
          )}
          <img src={src} width={20} />
          <span style={{ textTransform: "uppercase" }}>{data.name}</span>
        </div>
      )}
      <List data={data} margin={margin} open={open} />
    </div>
  );
};

export default memo(TreeNode);
