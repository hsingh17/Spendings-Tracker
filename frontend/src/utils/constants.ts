// #######################################################################################
// #######################################################################################
//                                      PAGES
// #######################################################################################
// #######################################################################################

export const HOME_PAGE: string = "/";
export const LOGIN_PAGE: string = "/login";
export const DASHBOARD_PAGE: string = "/dashboard";
export const PASSWORD_RESET_PAGE: string = "/password-reset";
export const SEND_PASSWORD_RESET_EMAIL_PAGE: string =
  "/send-password-reset-email";
export const CREATE_ACCT_PAGE: string = "/create-account";
export const VIEW_SPENDINGS_PAGE: string = "/view";
export const SAVE_SPENDINGS_PAGE: string = "/save";
export const METRICS_PAGE: string = "/metrics";
export const SETTINGS_PAGE: string = "/settings";
export const VERIFY_ACCT_PAGE: string = "/verify-acct";
export const UNAUTHENTICATED_PAGES: string[] = [
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

export const GET: string = "GET";
export const POST: string = "POST";
export const DELETE: string = "DELETE";
export const PUT: string = "PUT";
export const PATCH: string = "PATCH";

// #######################################################################################
// #######################################################################################
//                                      API URLS
// #######################################################################################
// #######################################################################################

export const API_VERSION = "/v1";
export const BASE_API_URL: string = import.meta.env.VITE_SERVER_BASE_URL;
export const AUTH_LOGIN_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/login`;
export const AUTH_LOGOUT_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/logout`;
export const ME_API_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/me`;
export const SEND_PASSWORD_RESET_EMAIL_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/send-password-reset-email`;
export const RESEND_ACCT_REG_EMAIL_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/resend-registration-email`;
export const PASSWORD_RESET_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/reset-password`;
export const CREATE_ACCT_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/register`;
export const VERIFY_ACCT_ROUTE: string = `${BASE_API_URL}${API_VERSION}/auth/verify-acct`;
export const SPENDINGS_API_ROUTE: string = `${BASE_API_URL}${API_VERSION}/api/spendings`;
export const SPENDING_CATEGORIES_ROUTE: string = `${BASE_API_URL}${API_VERSION}/api/spending-categories`;

// #######################################################################################
// #######################################################################################
//                                      DROP DOWNS
// #######################################################################################
// #######################################################################################

export const PAGE_LIMITS: Array<number> = [5, 10, 25, 50, 100, 200];

// #######################################################################################
// #######################################################################################
//                                      LIMITS
// #######################################################################################
// #######################################################################################

export const MAX_SPENDINGS_FOR_A_DAY: number = 15;
export const MAX_CATEGORY_LENGTH: number = 100;
export const MAX_AMOUNT: number = 100000000;
export const REQ_PASSWORD_LENGTH: number = 8;
export const MAX_PASSWORD_LENGTH: number = 64;
export const MAX_USERNAME_LENGTH: number = 128;
export const MAX_EMAIL_LENGTH: number = 255;

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
//                                      DATE FORMATS
// #######################################################################################
// #######################################################################################

export const ISO_FORMAT: string = "%Y-%m-%d";

// #######################################################################################
// #######################################################################################
//                                      SCREEN SIZES
// #######################################################################################
// #######################################################################################

export const MOBILE_SCREEN_WIDTH: number = 767;

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
