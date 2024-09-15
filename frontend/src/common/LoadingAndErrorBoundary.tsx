import { UseQueryResult } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

type LoadingAndErrorBoundaryProps = {
  errorFallback: ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
  useApiCall: () => UseQueryResult<unknown, unknown>;
};

// Will need to inject the response of the useApiCall into "children" just like it was done in GenericForm
const LoadingAndErrorBoundary: FC<LoadingAndErrorBoundaryProps> = () => {
  return <></>;
};

export default LoadingAndErrorBoundary;
