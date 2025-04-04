import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export type Nullable<T> = T | null | undefined;

export type RenderChildrenProps = {
  children: ReactNode;
};

export type User = {
  userId: number;
  username: string;
  authorities: Nullable<string[]>;
  accountNonExpired: Nullable<boolean>;
  accountNonLocked: Nullable<boolean>;
  credentialsNonExpired: Nullable<boolean>;
  enabled: Nullable<boolean>;
  hasMfa: boolean;
};

export type ApiLinks = {
  first: Nullable<string>;
  prev: Nullable<string>;
  self: Nullable<string>;
  next: Nullable<string>;
  last: Nullable<string>;
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

export type CategoriesMap = {
  [category: string]: string;
};

export type Spending = {
  spendingId: Nullable<number>;
  category: Nullable<string>;
  amount: Nullable<number>;
  memo: Nullable<string>;
  delete: Nullable<boolean>;
};

export type SpendingsPage<Type extends SpendingListItem> = {
  spendingPage: {
    content: Type[];
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SpendingListItem { }

export interface SpendingListRowLineChart extends SpendingListItem {
  spendingUserAggrId: number;
  date: Dayjs;
  category: string;
  total: number;
}

export type CategoryTotalMap = {
  [category: string]: number;
};

export interface SpendingListRowBarChart extends SpendingListItem {
  date: Dayjs;
  total: number;
  categoryTotalMap: CategoryTotalMap;
}

export interface SpendingListRowPieChart extends SpendingListItem {
  category: string;
  total: number;
}

export enum SortType {
  DATE,
  TOTAL,
}

export enum SortOrder {
  ASC = 1,
  NONE = 0,
  DESC = -1,
}

export type Sort = {
  sortType: SortType;
  sortOrder: SortOrder;
};

export type NavbarHeaderProps = {
  state: NavbarState;
  transitionState: (action: NavbarAction) => void;
};

export type NavbarHamburgerIconProps = NavbarHeaderProps;

export type NavbarHeaderTitleProps = {
  state: NavbarState;
};

export type NavbarArrowProps = NavbarHeaderProps;

export type NavbarListItem = {
  category: string;
  children: NavbarSublistItem[];
};

export type NavbarSublistItem = {
  iconPath: string;
  name: string;
  onClick: () => void;
};

export type NavbarSublistProps = {
  state: NavbarState;
  item: NavbarListItem;
};

export type NavbarSublistItemProps = {
  state: NavbarState;
  item: NavbarSublistItem;
};

export enum NavbarState {
  NON_MOBILE_EXPANDED,
  NON_MOBILE_COLLAPSED,
  MOBILE_MENU_HIDDEN,
  MOBILE_MENU_SHOWN,
}

export enum NavbarAction {
  NON_MOBILE_COLLAPSE,
  NON_MOBILE_EXPAND,
  RESIZE_TO_NON_MOBILE,
  RESIZE_TO_MOBILE,
  MOBILE_SHOW_MENU,
  MOBILE_HIDE_MENU,
  MOBILE_NAVIGATE_TO_PAGE,
}

export type TooltipPosition = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export enum ExternalUserType {
  GOOGLE = "GGL",
}

export type FormValidator = {
  msg: string;
  validate: (val: string) => boolean;
};

export type GenericFormInputProps = {
  title?: string;
  name?: string;
  customStyles?: string;
  addformvalidators?: (formFieldName: string, validate: () => boolean) => void;
};

export type FormError = {
  errMsg: string;
  valid: boolean;
};
