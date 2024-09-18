import { UseQueryResult } from "@tanstack/react-query";
import React, { FC, ReactElement, ReactNode } from "react";
import { ApiResponse } from "../utils/types";

type LoadingAndErrorBoundaryProps = {
  errorFallback: ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
  useApiCall: () => UseQueryResult<ApiResponse<unknown>, unknown>;
  [prop: string]: unknown; // Unknown props
};
type ChildrenComponentProps = {
  children: ReactNode;
};

type GrandchildrenComponentProps = {
  response: ApiResponse<unknown>;
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

    let grandChildren: React.FunctionComponentElement<GrandchildrenComponentProps>[] =
      children.props?.children;

    if (!grandChildren) {
      return children;
    }

    if (!Array.isArray(grandChildren)) {
      grandChildren = [grandChildren];
    }

    return React.cloneElement<ChildrenComponentProps>(
      children as ReactElement<ChildrenComponentProps>,
      {
        children: grandChildren.map((child, idx) => {
          return React.cloneElement(child, {
            key: idx,
            response: data,
            ...rest,
          });
        }),
      },
    );
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
