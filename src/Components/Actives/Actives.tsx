import { memo } from "react";
import ActivesHeader from "./ActivesHeader";
import ActivesContent from "./ActivesContent";

const Actives = () => {
  return (
    <div
      style={{
        margin: 10,
        border: "1px solid #e6ebef",
        height: "calc(100% - 20px)",
        backgroundColor: "white",
        borderRadius: 3,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <ActivesHeader />
      <ActivesContent />
    </div>
  );
};

export default memo(Actives);
