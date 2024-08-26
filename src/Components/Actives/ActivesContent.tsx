import { memo } from "react";

import ActivesMenu from "./ActivesMenu/ActivesMenu";
import { useCompanie } from "../../Contexts/CompanieContext";
import Component from "./Component/Component";

const ActivesContent = () => {
  const { companie, component } = useCompanie();

  return (
    <div
      style={{
        height: "calc(100% - 30px)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {companie && <ActivesMenu companieId={companie.id} />}
      <Component component={component} />
    </div>
  );
};

export default memo(ActivesContent);
