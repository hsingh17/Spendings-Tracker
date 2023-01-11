type Nullable<T> = T | null;

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
  id: number;
  amount: number;
  category: String;
  date: String;
};

export type SpendingsApiResponse = {
  spendings: SpendingMap
  startDate: String;
  endDate: String;
  totalSpent: number;
  totalSpendings: number;
};

export type SpendingFormRow = {
  category: Nullable<string>,
  amount: Nullable<string>
};
