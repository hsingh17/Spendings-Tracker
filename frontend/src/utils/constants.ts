// #######################################################################################
// #######################################################################################
//                                      PAGES
// #######################################################################################
// #######################################################################################

export const HOME_PAGE = "/";
export const LOGIN_PAGE = "/login";
export const DASHBOARD_PAGE = "/dashboard";
export const PASSWORD_RESET_PAGE = "/password-reset";
export const SEND_PASSWORD_RESET_EMAIL_PAGE = "/send-password-reset-email";
export const CREATE_ACCT_PAGE = "/create-account";
export const VIEW_SPENDINGS_PAGE = "/view";
export const SAVE_SPENDINGS_PAGE = "/save";
export const METRICS_PAGE = "/metrics";
export const SETTINGS_PAGE = "/settings";
export const VERIFY_ACCT_PAGE = "/verify-acct";
export const UNAUTHENTICATED_PAGES = [
  HOME_PAGE,
  LOGIN_PAGE,
  CREATE_ACCT_PAGE,
  PASSWORD_RESET_PAGE,
  SEND_PASSWORD_RESET_EMAIL_PAGE,
  VERIFY_ACCT_PAGE,
];

// #######################################################################################
// #######################################################################################
//                                      HTTP METHODS
// #######################################################################################
// #######################################################################################

export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PUT = "PUT";
export const PATCH = "PATCH";

// #######################################################################################
// #######################################################################################
//                                      API URLS
// #######################################################################################
// #######################################################################################

export const API_VERSION = "/v1";
export const BASE_API_URL = import.meta.env.VITE_SERVER_BASE_URL;
export const AUTH_LOGIN_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/login`;
export const AUTH_LOGOUT_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/logout`;
export const ME_API_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/me`;
export const SEND_PASSWORD_RESET_EMAIL_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/send-password-reset-email`;
export const RESEND_ACCT_REG_EMAIL_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/resend-registration-email`;
export const PASSWORD_RESET_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/reset-password`;
export const CREATE_ACCT_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/register`;
export const VERIFY_ACCT_ROUTE = `${BASE_API_URL}${API_VERSION}/auth/verify-acct`;
export const SPENDINGS_API_ROUTE = `${BASE_API_URL}${API_VERSION}/api/spendings`;
export const SPENDING_CATEGORIES_ROUTE = `${BASE_API_URL}${API_VERSION}/api/spending-categories`;

// #######################################################################################
// #######################################################################################
//                                      DROP DOWNS
// #######################################################################################
// #######################################################################################

export const PAGE_LIMITS = [5, 10, 25, 50, 100, 200];

// #######################################################################################
// #######################################################################################
//                                      LIMITS
// #######################################################################################
// #######################################################################################

export const MAX_SPENDINGS_FOR_A_DAY = 15;
export const MAX_CATEGORY_LENGTH = 100;
export const MAX_AMOUNT = 100000000;
export const REQ_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;
export const MAX_USERNAME_LENGTH = 128;
export const MAX_EMAIL_LENGTH = 255;

// #######################################################################################
// #######################################################################################
//                                      POPUP TYPES
// #######################################################################################
// #######################################################################################

export const enum POPUP_TYPES {
  SUCCESS,
  WARN,
  DANGER,
}

// #######################################################################################
// #######################################################################################
//                                      PROMISE STATES
// #######################################################################################
// #######################################################################################

export const enum PROMISE_STATES {
  PENDING,
  FUFILLED,
  REJECTED,
}

// #######################################################################################
// #######################################################################################
//                                      SCREEN SIZES
// #######################################################################################
// #######################################################################################

export const MOBILE_SCREEN_WIDTH = 767;

// #######################################################################################
// #######################################################################################
//                                      GRAPH CONSTANTS
// #######################################################################################
// #######################################################################################

export enum GRAPH_TYPES {
  Line,
  Bar,
  Pie,
}

// #######################################################################################
// #######################################################################################
//                                      GRAPH CONSTANTS
// #######################################################################################
// #######################################################################################

export enum GRANULARITY {
  Day,
  Week,
  Month,
  Year,
}
