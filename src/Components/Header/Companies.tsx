import { memo, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { getCompanies } from "../../Service/service";
import { useCompanie } from "../../Contexts/CompanieContext";
import ActiveButton from "../ActiveButton/ActiveButton";

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
        <ActiveButton
          key={c.id}
          icon={<img src="./gold.png" />}
          label={c.name}
          onClick={() => setCompanie(c)}
          selected={c.id === companie?.id}
        />
      ))}
    </div>
  );
};

export default memo(Companies);
