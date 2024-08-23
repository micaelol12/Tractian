import { memo } from "react";
import { useCompanie } from "../../Contexts/CompanieContext";
import "./Actives.css";

const ActivesHeader:React.FC = () => {
  const { companie } = useCompanie();

  return (
    <div className="Active">
      <div>
        <span className="header">Ativos </span>
        <span className="subtitle">/ {companie?.name}</span>
      </div>
    </div>
  );
};

export default memo(ActivesHeader);
