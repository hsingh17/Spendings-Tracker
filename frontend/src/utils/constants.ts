export namespace Constants {

  // #######################################################################################
  // #######################################################################################
  //                                      PAGES
  // #######################################################################################
  // #######################################################################################

  export const HOME_PAGE: string = "/";
  export const LOGIN_PAGE: string = "/login";
  export const DASHBOARD_PAGE: string = "/dashboard";
  export const VIEW_SPENDINGS_PAGE: string = "/view";
  export const SAVE_SPENDINGS_PAGE: string = "/save";
  export const METRICS_PAGE: string = "/metrics";
  export const SETTINGS_PAGE: string = "/settings";

  
  // #######################################################################################
  // #######################################################################################
  //                                      HTTP METHODS
  // #######################################################################################
  // #######################################################################################
  
  export const GET: string = "GET";
  export const POST: string = "POST";
  export const DELETE: string = "DELETE";
  export const PUT: string = "PUT";


  // #######################################################################################
  // #######################################################################################
  //                                      API URLS
  // #######################################################################################
  // #######################################################################################

  export const API_VERSION = "/v1";
  export const BASE_API_URL: string = import.meta.env.VITE_SERVER_BASE_URL;
  export const AUTH_LOGIN_ROUTE: string = `${API_VERSION}/auth/login`;
  export const ME_API_ROUTE: string = `${API_VERSION}/api/me`;
  export const SPENDINGS_API_ROUTE: string = `${API_VERSION}/api/spendings`;

  // #######################################################################################
  // #######################################################################################
  //                                      DROP DOWNS
  // #######################################################################################
  // #######################################################################################

  export const PAGE_LIMITS: Array<string> = [
    "5",
    "10",
    "25",
    "50",
    "100",
    "200"
  ];
  
  // #######################################################################################
  // #######################################################################################
  //                                      LIMITS
  // #######################################################################################
  // #######################################################################################

  export const MAX_SPENDINGS_FOR_A_DAY: number = 15;
  export const MAX_CATEGORY_LENGTH: number = 100;
  export const MAX_AMOUNT: number = 100000000;

  // #######################################################################################
  // #######################################################################################
  //                                      POPUP TYPES
  // #######################################################################################
  // ####################################################################################### 
  
  export const enum POPUP_TYPES { SUCCESS, WARN, DANGER };

  // #######################################################################################
  // #######################################################################################
  //                                      PROMISE STATES
  // #######################################################################################
  // ####################################################################################### 
  
  export const enum PROMISE_STATES { PENDING, FUFILLED, REJECTED };
  
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
};
