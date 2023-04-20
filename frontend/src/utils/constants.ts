export namespace Constants {

  // #######################################################################################
  // #######################################################################################
  //                                      PAGES
  // #######################################################################################
  // #######################################################################################

  export const HOME_PAGE: string = "/";
  export const LOGIN_PAGE: string = "/login";
  export const DASHBOARD_PAGE: string = "/dashboard";
  export const VIEW_SPENDINGS_PAGE: string = "/view-spendings";
  export const ADD_SPENDINGS_PAGE: string = "/add-spendings";
  export const EDIT_SPENDINGS_PAGE: string = "/edit-spendings";

  
  // #######################################################################################
  // #######################################################################################
  //                                      HTTP METHODS
  // #######################################################################################
  // #######################################################################################
  
  export const GET: string = "GET";
  export const POST: string = "POST";
  export const DELETE: string = "DELETE";


  // #######################################################################################
  // #######################################################################################
  //                                      API URLS
  // #######################################################################################
  // #######################################################################################

  export const BASE_API_URL: string = (import.meta.env.DEV ? import.meta.env.VITE_SERVER_BASE_URL_DEV : import.meta.env.VITE_SERVER_BASE_URL_PROD);
  export const AUTH_LOGIN_ROUTE: string = "/auth/login";
  export const ME_API_ROUTE: string = "/api/me";
  export const GET_SPENDING_API_ROUTE: string = "/api/spending/get-spending";
  export const GET_SPENDINGS_API_ROUTE: string = "/api/spending/get-spendings";
  export const SAVE_SPENDING_API_ROUTE: string = "/api/spending/save-spending";
  export const DELETE_SPENDING_API_ROUTE: string = "/api/spending/delete-spending";  

  // #######################################################################################
  // #######################################################################################
  //                                      DROP DOWNS
  // #######################################################################################
  // #######################################################################################

  export const PAGE_LIMITS: Array<string> = [
    "1", // TODO: Remove
    "2",
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
};
