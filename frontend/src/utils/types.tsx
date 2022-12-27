type Nullable<T> = T | null;

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
  id: number;
  amount: number;
  category: string;
  date: string;
}


export type SpendingsResponse = {
  spendings: Array<Spending>;
  startDate: string;
  endDate: string;
  totalSpent: number;
  totalSpendings: number;
}