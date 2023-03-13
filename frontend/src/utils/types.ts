export type Nullable<T> = T | null;

type SpendingMap = {
  [date: string]: Array<Spending>
}

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

export type SpendingsApiResponse = {
  count: number;
  next: Nullable<String>;
  previous: Nullable<String>;
  spendings: SpendingMap
  startDate: String;
  endDate: String;
  totalSpendings: number;
};

export type SpendingFormRow = {
  category: Nullable<string>,
  amount: Nullable<string>
};


export type SpendingsListProps = {
  spendingDate: String;
  spendingsArray: Array<Spending>;
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