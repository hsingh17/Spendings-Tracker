import React from "react";
import { Constants } from "./constants";

export type Nullable<T> = T | null;

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

export type SpendingUserAggr = {
  spendingUserAggrId: number;
  date: string;
  spendings: Array<Spending>;
  total: number;
};

export type SpendingsFormProps = {
  parentHandleSubmit: (spendings: Nullable<Array<Spending>>) => void;
  parentSetDate: (date: string) => void;
  isAdd: boolean;
  date: Nullable<string>;
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
  toggleRefresh: () => void;
  spendingUserAggrList: Array<SpendingUserAggr>;
};

export type SpendingsRowProps = {
  toggleRefresh: () => void;
  spendingUserAggr: SpendingUserAggr;
};

export type SpendingsRowDeleteProps = {
  toggleRefresh: () => void;
  spendingDate: string;
};

export type SpendingComponentProps = {
  spending: Spending;
};

export type AddEditSpendingProps = {
  isAdd: boolean;
  spendingDate: Nullable<string>;
};

export type AddEditSpendingsNavigateProps = {
  spendingDate: string;
  parentSetSpendings: (spendings: Nullable<Array<Spending>>) => void;
  parentSetError: (error: Nullable<string>) => void;
  spendings: Array<Spending>;
}

export type EditSpendingsParams = {
  spendingDate: string;
};

export type UseApiResponse<T> = {
  loading: boolean;
  response: Nullable<ApiResponse<T>>;
};

export type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export type LoginFormProps = {
  parentSetFormData: (formData: Nullable<LoginFormFormData>) => void;
};

export type LoginFormFormData = {
  username: string;
  password: string;
};

export type LoginFormNavigateProps = {
  parentSetFormData: (formData: Nullable<LoginFormFormData>) => void;
  parentSetError: (error: Nullable<string>) => void;
  formData: LoginFormFormData;
};

export type ViewSpendingsFilterFormProps = {
  parentSetApiUrl: (apiUrl: Nullable<string>) => void;
};

export type ViewSpendingsButtonProps = {
  parentSetApiUrl: (apiUrl: Nullable<string>) => void;
  buttonText: Nullable<string>;
  buttonUrl: Nullable<string>;
};

export type PopupProps = {
  children: React.ReactNode;
  type: Constants.POPUP_TYPES;
  time: number;
};