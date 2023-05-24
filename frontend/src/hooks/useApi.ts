import { useEffect, useState } from "react";
import { Nullable, UseApiResponse } from "../utils/types";
import { ApiResponse } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";

function useApi<T>(apiUrl: string, method: string, body:string = "") : UseApiResponse<T> {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ response, setResponse ] = useState<Nullable<ApiResponse<T>>>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: ApiResponse<T> = await fetchRequestWrapper<T>(apiUrl, method, body);
      setLoading(false);
      setResponse(response);
    };

    fetchData();
  }, [apiUrl]);

  return {
    loading: loading,
    response: response
  };
};

export default useApi;