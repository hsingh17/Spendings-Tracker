import React, { ReactElement } from "react";
import { Constants } from "./constants";

export type Nullable<T> = T | null | undefined;

export type User = {
  userId: number;
  username: string;
  authorities: Nullable<Array<string>>;
  accountNonExpired: Nullable<boolean>;
  accountNonLocked: Nullable<boolean>;
  credentialsNonExpired: Nullable<boolean>;
  enabled: Nullable<boolean>;
};

export type ApiLinks =  {
  first : Nullable<string>;
  prev : Nullable<string>;
  self : Nullable<string>;
  next : Nullable<string>;
  last : Nullable<string>;
};

export type ApiMetadata = {
   currentPage: number;
   pageSize: number;
   totalCount: number;
   totalPages: number;
   links: ApiLinks;
};

export type ApiResponse<T> = {
  metadata: Nullable<ApiMetadata>;
  timestamp: string;
  ok: boolean;
  message: string;
  httpStatus: number;
  data: Nullable<T>;
};

export type Spending = {
  spendingId: Nullable<number>;
  category: Nullable<string>;
  amount: Nullable<number>;
  delete: Nullable<boolean>;
};

export type CategoricalSpendings = {
  category: string;
  total: number;
};

export type SpendingListRow = {
  spendingUserAggrId: number;
  date: string;
  total: number;
};

export type SaveSpendingsFormProps = {
  parentHandleDateChange: (date: string) => void;
  date: string;
  initialSpendings: Nullable<Array<Spending>>;
};

export type SpendingsFormRowProps = {
  parentHandleDeleteRow: (idx: number) => void;
  parentHandleChange: (idx: number, newSpending: Spending) => void;
  idx: number;
  spending: Spending;
};

export type SpendingsFormInputProps = {
  parentHandleChange: (e: React.ChangeEvent, labelText: string) => void;
  idx: number;
  labelText: string;
  value: Nullable<string | number>;
};

export type SpendingsTableProps = {
  parentRefetch: () => void;
  spendings: Nullable<Array<SpendingListRow>>;
};

export type SpendingsRowProps = {
  parentRefetch: () => void;
  spending: SpendingListRow;
};

export type SpendingComponentProps = {
  spending: Spending;
};

export type SaveSpendingProps = {
  date: string;
}

export type UserFormData = {
  username: string;
  password: string;
};

export type ViewSpendingsFilterFormProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  resetSearchParams: () => void;
};

export type TableFooterContainerProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  apiMetaData: Nullable<ApiMetadata>;
};

export type TableButtonsContainerProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  apiLinks: Nullable<ApiLinks>;
};

export type TablePageDropdownProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
};

export type TableButtonProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  buttonIcon: ReactElement<any, any>;
  buttonUrl: Nullable<string>;
};

export type PopupProps = {
  children: React.ReactNode;
  type: Constants.POPUP_TYPES;
  time: number;
};

export type GenericChartProps<T> = {
  width: number;
  height: number;
  data: Nullable<Array<T>>;
}
export type BarChartProps = GenericChartProps<CategoricalSpendings>;

export type LineChartProps = GenericChartProps<SpendingListRow> & {
  groupBy: string;
};

export type PieChartProps = GenericChartProps<CategoricalSpendings> & {
  innerRadius: number;
  outerRadius: number;
};