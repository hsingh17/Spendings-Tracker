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

export type Spending = {
  spendingId: Nullable<number>;
  userId: Nullable<number>;
  category: Nullable<string>;
  amount: Nullable<number>;
  date: Nullable<string>;
};

export type SpendingsForADay = {
  date: string;
  count: number;
  total: number;
  spendings: Array<Spending>;
};

export type SpendingsApiResponse = {
  count: number;
  total: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  startDate: string;
  endDate: string;
  totalSpent: number;
  spendingsForADayList: Array<SpendingsForADay>;
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
  spendingsForADayList: Array<SpendingsForADay>;
};

export type SpendingsRowProps = {
  toggleRefresh: () => void;
  spendingsForADay: SpendingsForADay;
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
  parentSetSpendings: (spendings: Nullable<Array<Spending>>) => void;
  parentSetError: (error: Nullable<string>) => void;
  spendings: Array<Spending>;
}

export type EditSpendingsParams = {
  spendingDate: string;
};

export type FetchResponseWrapper<T> = {
  ok: boolean;
  obj: Nullable<T>;
  error: string;
};

export type GenericApiResponse = {
  message: string;
};

export type UseApiResponse<T> = {
  loading: boolean;
  response: Nullable<FetchResponseWrapper<T>>;
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
