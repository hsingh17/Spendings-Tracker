import { UseQueryResult } from "@tanstack/react-query";
import React, { FC, ReactElement, ReactNode } from "react";
import { ApiResponse, Nullable } from "../utils/types";

type ApiCallBoundaryProps = {
  errorFallback: ReactNode;
  loadingFallback: ReactNode;
  children: ReactNode;
  needRefetch?: boolean;
  useApiCall: () => UseQueryResult<ApiResponse<unknown>, unknown>;
  [prop: string]: unknown; // Unknown props
};
type ChildrenComponentProps = {
  children: ReactNode;
};

type GrandchildrenComponentProps = {
  key: number;
  response: Nullable<ApiResponse<unknown>>;
  refetch?: () => void;
};

// Will need to inject the response of the useApiCall into "children" just like it was done in GenericForm
const ApiCallBoundary: FC<ApiCallBoundaryProps> = ({
  children,
  errorFallback,
  loadingFallback,
  needRefetch = false,
  useApiCall,
  ...rest // Unknown props
}) => {
  const { data, isError, isLoading, isSuccess, refetch } = useApiCall();

  const injectPropsAndClone = (
    grandChildren: React.FunctionComponentElement<GrandchildrenComponentProps>[],
  ): ReactNode => {
    return React.cloneElement<ChildrenComponentProps>(
      children as ReactElement<ChildrenComponentProps>,
      {
        children: grandChildren.map((child, idx) => {
          const props: GrandchildrenComponentProps = {
            key: idx,
            response: data,
            ...rest,
          };

          if (needRefetch) {
            props.refetch = refetch;
          }

          return React.cloneElement(child, props);
        }),
      },
    );
  };

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

    return injectPropsAndClone(grandChildren);
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

export default ApiCallBoundary;
