import { memo } from "react";
import ActivesHeader from "./ActivesHeader";
import ActivesContent from "./ActivesContent";

const Actives = () => {
  return (
    <main style={{ height: "calc(100% - 48px)", overflow: "auto" }}>
      <div
        style={{
          margin: 10,
          border: "1px solid #e6ebef",
          height: "calc(100% - 45px)",
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
    </main>
  );
};

export default memo(Actives);
