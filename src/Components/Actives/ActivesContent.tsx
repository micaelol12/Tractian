import { memo } from "react";
import ActivesMenu from "./ActivesMenu/ActivesMenu";
import { useCompanie } from "../../Contexts/CompanieContext";

const ActivesContent = () => {
  const { companie } = useCompanie();

  return (
    <div
      style={{
        height: "calc(100% - 30px)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {companie && <ActivesMenu companieId={companie.id} />}
      <div>conteudo</div>
    </div>
  );
};

export default memo(ActivesContent);
