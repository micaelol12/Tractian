import { memo } from "react";
import Companies from "./Companies";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#17192d",
        padding: "0px 16px",
        height: 48,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src="logo.png" width={102} height={14} />
      <Companies />
    </header>
  );
};

export default memo(Header);
