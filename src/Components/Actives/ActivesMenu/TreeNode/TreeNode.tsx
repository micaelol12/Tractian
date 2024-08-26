import { memo, useEffect, useMemo, useRef, useState } from "react";

import { EType, ITreeNode } from "../ActivesMenu";
import List from "./List";
import { useCompanie } from "../../../../Contexts/CompanieContext";
import { IAsset } from "../../../../model";
import ComponentStatus from "../../Component/ComponentStatus";
import { ReactComponent as Component } from "./../../../../Assets/Component.svg";

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

  let src = <></>;

  switch (data.type) {
    case EType.ASSET:
      src = <img src={"/asset.png"} width={20} />;
      break;
    case EType.COMPONENT:
      src = <Component color={selected ? "white" : "#2188ff"} />;
      break;
    default:
      src = <img src={"/location.png"} width={20} />;
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
            padding: "3px 4px",
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
          {src}
          <span style={{ textTransform: "uppercase" }}>{data.name}</span>
          {isComponent && data.status && data.sensorType && (
            <ComponentStatus status={data?.status} type={data?.sensorType} />
          )}
        </div>
      )}
      <List data={data} margin={margin} open={open} />
    </div>
  );
};

export default memo(TreeNode);
