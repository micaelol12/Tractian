import { memo } from "react";
import ActivesHeader from "./ActivesHeader";
import ActivesContent from "./ActivesContent";
import { useCompanie } from "../../Contexts/CompanieContext";

const Actives = () => {
  return (
    <div
      style={{
        margin: 10,
        border: "1px solid #e6ebef",
        height: "calc(100% - 25px)",
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <ActivesHeader />
      <ActivesContent />
    </div>
  );
};

export default memo(Actives);
