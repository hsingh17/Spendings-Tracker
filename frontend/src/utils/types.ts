export type Nullable<T> = T | null;

export type User = {
  userId: Nullable<number>;
  password: null;
  username: Nullable<String>;
  authorities: Nullable<Array<String>>;
  accountNonExpired: Nullable<boolean>;
  accountNonLocked: Nullable<boolean>;
  credentialsNonExpired: Nullable<boolean>;
  enabled: Nullable<boolean>;
};

export type Spending = {
  spendingId: number;
  userId: number;
  category: String;
  amount: number;
  date: String;
};

export type SpendingsForADay = {
  date: String;
  count: number;
  total: number;
  spendings: Array<Spending>;
};

export type SpendingsApiResponse = {
  count: number;
  total: number;
  next: Nullable<String>;
  previous: Nullable<String>;
  startDate: String;
  endDate: String;
  totalSpent: number;
  spendingsForADayList: Array<SpendingsForADay>;
};

export type SpendingFormRow = {
  category: Nullable<string>;
  amount: Nullable<string>;
};

export type SpendingsTableProps = {
  spendingsForADayList: Array<SpendingsForADay>;
};

export type SpendingsRowProps = {
  spendingForADay: SpendingsForADay;
};

export type SpendingComponentProps = {
  spending: Spending;
};

export type AddEditSpendingProps = {
  isAdd: boolean;
  spendingDate: Nullable<String>;
};

export type EditSpendingsParams = {
  spendingDate: string;
};

export type FetchResponseWrapper<T> = {
  ok: boolean;
  obj: Nullable<T>;
  error: string;
};