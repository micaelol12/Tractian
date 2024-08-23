import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

// Interface para o caso em que params é opcional
interface IUseFetchParamsOptional<T> {
  axiosCallback: () => Promise<AxiosResponse<T, any>>;
  params?: undefined;
}

// Interface para o caso em que params é obrigatório
interface IUseFetchParamsRequired<T, X> {
  axiosCallback: (params: X) => Promise<AxiosResponse<T, any>>;
  params: X;
}

type IUseFetchParams<T, X> = undefined extends X
  ? IUseFetchParamsOptional<T>
  : IUseFetchParamsRequired<T, X>;

const useFetch = <T, X extends any>({
  axiosCallback,
  params,
}: IUseFetchParams<T, X>) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosCallback(params as any);
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, [axiosCallback, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, error, loading };
};

export default useFetch;