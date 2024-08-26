import { memo } from "react";

const ComponentStatus: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: 6,
        background: status === "operating" ? "green" : "red",
      }}
    />
  );
};

export default memo(ComponentStatus);
