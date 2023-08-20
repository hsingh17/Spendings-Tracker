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
  idx: number;
  spending: Spending;
  parentHandleDeleteRow: (idx: number) => void;
  parentHandleChange: (idx: number, newSpending: Spending) => void;
};

export type SpendingsFormInputProps = {
  parentHandleChange: (e: React.ChangeEvent, labelText: string) => void;
  idx: number;
  labelText: string;
  value: Nullable<string | number>;
};

export enum SortType {
  DATE,
  TOTAL,
};

export enum SortOrder {
  ASC = 1,
  NONE = 0,
  DESC = -1,
};

export type Sort = {
  sortType: SortType;
  sortOrder: SortOrder;
};

export type SortIconProps = {
  sortOrder: SortOrder;
};

export type SpendingsTableProps = {
  isLoading: boolean;
  spendings: Nullable<Array<SpendingListRow>>;
  parentRefetch: () => void;
  parentSetSpendingId: (spendingId: number) => void;
};

export type TableHeaderProps = {
  sort: Sort;
  parentHandleSort: (sortType: SortType) => void;
};

export type TableBodyProps = {
  isLoading: boolean;
  spendings: Array<SpendingListRow>;
  parentRefetch: () => void;
  parentSetSpendingId: (spendingId: number) => void;
};

export type TableRowProps = {
  isLoading: boolean;
  spending: SpendingListRow;
  parentRefetch: () => void;
  parentSetSpendingId: (spendingId: number) => void;
};

export type DeleteModalProps = {
  show: boolean;
  spendingId: Nullable<number>;
  parentSetShow: (show: boolean) => void;
  parentRefetch: () => void;
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

export type TableFilterProps = {
  isLoading: boolean;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  parentResetSearchParams: () => void;
};

export type TableFilterButtonProps = {
  parentSetOpen: (e: Nullable<React.MouseEvent>, open: boolean) => void;
  isOpen: boolean;
};

export type TableFilterFormProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  parentResetSearchParams: () => void;
  parentSetOpen: (e: Nullable<React.MouseEvent>, open: boolean) => void;
  isOpen: boolean;
};

export type TableFooterContainerProps = {
  isLoading: boolean;
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

export type TableFooterPageDataProps = {
  apiMetaData: Nullable<ApiMetadata>;
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