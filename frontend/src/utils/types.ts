import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { POPUP_TYPES } from "./constants";

export type Nullable<T> = T | null | undefined;

export type RenderChildrenProps = {
  children: ReactNode;
};

export type User = {
  userId: number;
  username: string;
  authorities: Nullable<Array<string>>;
  accountNonExpired: Nullable<boolean>;
  accountNonLocked: Nullable<boolean>;
  credentialsNonExpired: Nullable<boolean>;
  enabled: Nullable<boolean>;
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

export type SpendingCategoriesResponse = {
  categoryToS3UrlMap: CategoriesMap;
};

export type CategoriesMap = {
  [category: string]: string;
};

export type SpendingDetailResponse = {
  spendings: Spending[];
};

export type SpendingSaveRequest = {
  spendingRequests: Spending[];
};

export type Spending = {
  spendingId: Nullable<number>;
  category: Nullable<string>;
  amount: Nullable<number>;
  delete: Nullable<boolean>;
};

// TODO: Probably can remove and just use Spending
export type SpendingFormInput = Spending & {
  categoryError: Nullable<FormInputError>;
  amountError: Nullable<FormInputError>;
};

export type CategoricalSpendings = {
  category: string;
  total: number;
};

export type SpendingsPage = {
  spendingPage: {
    content: SpendingListRow[];
  };
};

export type SpendingListRow = {
  spendingUserAggrId: number;
  date: string;
  category: string;
  total: number;
};

export type SaveSpendingsFormProps = {
  date: string;
  initialSpendings: Nullable<Array<Spending>>;
  isCreateMode: boolean;
};

export type SaveSpendingsTitleProps = {
  date: string;
  isCreateMode: boolean;
  parentHandleDateChange: (date: string) => void;
};

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

export type SpendingComponentProps = {
  spending: Spending;
};

export type SaveSpendingProps = {
  date: string;
};

export type LoginRequest = {
  username?: string;
  password?: string;
  oAuthCredential?: string;
};

export type TableFilterProps = {
  isLoading: boolean;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  parentResetSearchParams: () => void;
};

export type TableFilterButtonProps = {
  isOpen: boolean;
  parentSetOpen: (e: Nullable<React.MouseEvent>, open: boolean) => void;
};

export type TableFilterFormProps = {
  isOpen: boolean;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
  parentResetSearchParams: () => void;
  parentSetOpen: (e: Nullable<React.MouseEvent>, open: boolean) => void;
};

export type TableFooterContainerProps = {
  isLoading: boolean;
  apiMetaData: Nullable<ApiMetadata>;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
};

export type TableButtonsContainerProps = {
  apiLinks: Nullable<ApiLinks>;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
};

export type TablePageDropdownProps = {
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
};

export type TableButtonProps = {
  buttonIcon: ReactElement<unknown, JSXElementConstructor<unknown>>;
  buttonUrl: Nullable<string>;
  parentSetSearchParams: (searchParams: URLSearchParams) => void;
};

export type TableFooterPageDataProps = {
  apiMetaData: Nullable<ApiMetadata>;
};

export type PopupProps = {
  children: React.ReactNode;
  type: POPUP_TYPES;
  time: number;
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
  children: Array<NavbarSublistItem>;
};

export type NavbarSublistItem = {
  iconPath: string;
  name: string;
  onClick: (e: React.MouseEvent) => void;
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

export enum FormInputError {
  EMPTY_CATEGORY = "Enter a category!",
  ZERO_AMOUNT = "Must be greater than 0!",
  MAX_AMOUNT = "Must be less than 99,999,999!",
  MAX_CATEGORY_LENGTH = "Must be less than 100 characters!",
  DUPLICATE_CATEGORY = "No duplicate categories allowed!",
}

export type TooltipPosition = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

export type ResetPasswordRequest = {
  password: string;
  uuid: string;
};

export type CreateAccountRequest = {
  username: string;
  password: string;
  email: string;
};

export type VerifyAcctRequest = {
  pin: string;
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
