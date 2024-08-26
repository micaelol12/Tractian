import { memo } from "react";
import { ESensorType, EStatus } from "../../../model";
import { ReactComponent as Thunder } from "./../../../Assets/bolt.svg";

const ComponentStatus: React.FC<{
  status: EStatus;
  type: ESensorType | null;
}> = ({ status, type }) => {
  const color = status === EStatus.OPERATING ? "green" : "red";

  if (type === ESensorType.ENERGY) {
    return <Thunder color={color} fill={color}/>;
  }

  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 6,
        background: color,
      }}
    />
  );
};

export default memo(ComponentStatus);
