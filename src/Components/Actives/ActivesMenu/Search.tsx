import { memo } from "react";
import { useCompanie } from "../../../Contexts/CompanieContext";

const Search = () => {
  const { search, setSearch } = useCompanie();

  return (
    <>
      <input
        type="search"
        style={{ width: "100%", padding: 10 }}
        placeholder="Buscar Ativo ou Local"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </>
  );
};
export default memo(Search);
