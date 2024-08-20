import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

interface IUseFetchParams<T> {
  axiosCallback: () => Promise<AxiosResponse<T, any>>;
}

const useFetch = <T extends any>({ axiosCallback }: IUseFetchParams<T>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosCallback();
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [axiosCallback]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading };
};

export default useFetch;
