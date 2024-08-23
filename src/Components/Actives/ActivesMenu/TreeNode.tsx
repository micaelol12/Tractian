import { memo, useState } from "react";
import { EType, ITreeNode } from "./ActivesMenu";

interface ILocationProps {
  data: ITreeNode;
  margin?: number;
}

const TreeNode: React.FC<ILocationProps> = ({ data, margin = 0 }) => {
  const [open, setOpen] = useState(false);

  const isAsset = data.type === EType.ASSET;

  const isLocation = data.type === EType.LOCATION;

  const isComponent = data.type === EType.COMPONENT;

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

  return (
    <div style={{ marginLeft: margin }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: "2px 0px",
        }}
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
      ;
      {hasChildren && open && (
        <div>
          {data.children.map((c) => (
            <TreeNode data={c} key={c.id} margin={margin + 25} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(TreeNode);
