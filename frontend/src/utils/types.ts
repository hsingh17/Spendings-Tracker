export type Nullable<T> = T | null;

export type User = {
  userId: Nullable<number>;
  password: null;
  username: Nullable<string>;
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

export type SpendingsFormRow = {
  spendingId: Nullable<number>;
  userId: Nullable<number>;
  category: Nullable<string>;
  amount: Nullable<string>;
  date: Nullable<string>;
};

export type SpendingsTableProps = {
  spendingsForADayList: Array<SpendingsForADay>;
};

export type SpendingsRowProps = {
  spendingsForADay: SpendingsForADay;
};

export type SpendingComponentProps = {
  spending: Spending;
};

export type AddEditSpendingProps = {
  isAdd: boolean;
  spendingDate: Nullable<string>;
};

export type EditSpendingsParams = {
  spendingDate: string;
};

export type FetchResponseWrapper<T> = {
  ok: boolean;
  obj: Nullable<T>;
  error: string;
};

export type SpendingSaveResponse = {
  message: string;
}