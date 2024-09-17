import { UseQueryResult } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";

type LoadingAndErrorBoundaryProps = {
  errorFallback: ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
  useApiCall: () => UseQueryResult<unknown, unknown>;
  [prop: string]: unknown; // Unknown props
};

type ChildrenComponentProps = {
  data: unknown;
};

// Will need to inject the response of the useApiCall into "children" just like it was done in GenericForm
const LoadingAndErrorBoundary: FC<LoadingAndErrorBoundaryProps> = ({
  children,
  errorFallback,
  loadingFallback,
  useApiCall,
  ...rest // Unknown props
}) => {
  const { data, isError, isLoading, isSuccess } = useApiCall();

  const injectPropsAndRender = (): ReactNode => {
    if (!React.isValidElement(children)) {
      return children;
    }

    const grandChildren: React.FunctionComponentElement<ChildrenComponentProps>[] =
      children.props?.children;

    // Pass the idx as a key, the loaded data from useApiCall(), and the remaining unknown props to our child component
    return grandChildren.map((child, idx) => {
      return React.cloneElement(child, { key: idx, data: data, ...rest });
    });
  };

  const render = (): ReactNode => {
    if (isSuccess) {
      return injectPropsAndRender();
    } else if (isLoading) {
      return loadingFallback;
    } else if (isError) {
      return errorFallback;
    }
  };

  return render();
};

export default LoadingAndErrorBoundary;
