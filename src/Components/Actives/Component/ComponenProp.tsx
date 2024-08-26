import { memo } from "react";

interface IComponentProp {
  value: string;
  icon?: React.ReactNode;
  label: string;
}

const ComponentProp: React.FC<IComponentProp> = ({ icon, label, value }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontWeight: "bold" }}>{label}</span>
      <div style={{ alignItems: "center", gap: 5, display: "flex" }}>
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
};

export default memo(ComponentProp);
