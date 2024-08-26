import { memo } from "react";

import { IAsset } from "../../../model";
import ComponentStatus from "./ComponentStatus";
import ComponentProp from "./ComponenProp";
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
          borderBottom: "1px solid #e6ebef",
        }}
      >
        <h2>{component.name}</h2>
        <ComponentStatus status={component.status} type={component.sensorType} />
      </div>
      <div
        style={{
          padding: 20,
          gap: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <div>
            <img src="/example_image.png" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ComponentProp
              label={"Tipo de Equipamento"}
              value={"Motor Elétrico (Trifásico)"}
            />

            <ComponentProp label={"Responsáveis"} value={"Életrica"} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <ComponentProp
            label={"Sensor"}
            value={component.sensorId}
            icon={<img src="./sensor.png" />}
          />
          <ComponentProp
            label={"Receptor"}
            value={component.gatewayId}
            icon={<img src="./receptor.png" />}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ActivesComponent);
