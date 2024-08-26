import { memo } from "react";

import { IAsset } from "../../../../model";
import ComponentStatus from "./ComponentStatus";

interface IActivesComponentProps {
  component: IAsset;
}

const ActivesComponent: React.FC<IActivesComponentProps> = ({ component }) => {
  return (
    <div
      style={{
        border: "1px solid #e6ebef",
        height: "100%",
        width: "calc(100% - 410px)",
        marginLeft: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingInline: 15,
          border: "1px solid #e6ebef",
        }}
      >
        <h2>{component.name}</h2>
        <ComponentStatus status={component.status} />
      </div>
      <div>
        <div>Sensor {component.sensorId}</div>
        <div>Resceptor {component.gatewayId}</div>
      </div>
    </div>
  );
};

export default memo(ActivesComponent);
