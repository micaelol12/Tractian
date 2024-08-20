import useFetch from "../Hooks/useFetch";
import { getCompanies } from "../Service/service";

const Companies = () => {
  const { data, error, loading } = useFetch({ axiosCallback: getCompanies });

  return (
      <div style={{ display: `flex`, flexDirection: "row", gap: 10 }}>
        {data?.map((companie) => (
          <>{companie.name}</>
        ))}
      </div>
  );
};

export default Companies;
