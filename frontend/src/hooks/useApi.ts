import { useEffect, useState } from "react";
import { UseApiResponse } from "../utils/types";
import { FetchResponseWrapper } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";

function useApi<T>(apiUrl: string, method: string, body:string = "") : UseApiResponse<T> {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ response, setResponse ] = useState<FetchResponseWrapper<T> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: FetchResponseWrapper<T> = await fetchRequestWrapper<T>(apiUrl, method, body);
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