import { memo, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { getCompanies } from "../../Service/service";
import { useCompanie } from "../../Contexts/CompanieContext";
import Companie from "./Companie/Companie";
import { ICompanie } from "../../model";

const Companies = () => {
  const { data, error, loading } = useFetch({ axiosCallback: getCompanies });
  const { setCompanie, companie } = useCompanie();

  useEffect(() => {
    if (data) {
      setCompanie(data[0]);
    }
  }, [data, setCompanie]);

  return (
    <div style={{ display: `flex`, flexDirection: "row", gap: 10 }}>
      {data?.map((c) => (
        <Companie
          key={c.id}
          companie={c}
          onClick={setCompanie}
          selected={c.id === companie?.id}
        />
      ))}
    </div>
  );
};

export default memo(Companies);
