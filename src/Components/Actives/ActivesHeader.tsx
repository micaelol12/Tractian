import "./Actives.css";
import { memo } from "react";
import { useCompanie } from "../../Contexts/CompanieContext";
import ActiveButton from "../ActiveButton/ActiveButton";
import { ReactComponent as Exclamation } from "./../../Assets/ExclamationCircle.svg";
import { ReactComponent as Thunder } from "./../../Assets/Thunderbolt.svg";

import { ESensorType, EStatus } from "../../model";

const ActivesHeader: React.FC = () => {
  const { companie, sensorType, setSensorType, status, setStatus } =
    useCompanie();

  const isEnergySensor = sensorType === ESensorType.ENERGY;

  const isCritict = status === EStatus.ALERT;

  const onEnergyClickHandler = () => {
    if (isEnergySensor) {
      setSensorType(undefined);
    } else {
      setSensorType(ESensorType.ENERGY);
    }
  };

  const onStatusClickHandler = () => {
    if (status) {
      setStatus(undefined);
    } else {
      setStatus(EStatus.ALERT);
    }
  };

  return (
    <div
      className="Active"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span className="header">Ativos </span>
        <span className="subtitle">/ {companie?.name}</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <ActiveButton
          selected={isEnergySensor}
          label="Sensor de energia"
          onClick={onEnergyClickHandler}
          icon={<Thunder color={isEnergySensor ? "white" : "#2188ff"} />}
          disable={!isEnergySensor}
        />
        <ActiveButton
          selected={isCritict}
          label="Crítico"
          onClick={onStatusClickHandler}
          icon={<Exclamation color={isCritict ? "white" : "#2188ff"} />}
          disable={!isCritict}
        />
      </div>
    </div>
  );
};

export default memo(ActivesHeader);
