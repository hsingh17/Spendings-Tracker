export namespace Constants {
  export const BASE_URL: String = (import.meta.env.DEV ? import.meta.env.VITE_SERVER_BASE_URL_DEV : import.meta.env.VITE_SERVER_BASE_URL_PROD);
  
  export const PAGE_LIMITS: Array<string> = [
    "1", // TODO: Remove
    "2",
    "10",
    "25",
    "50",
    "100",
    "200"
  ];

  export const GET_SPENDING_ROUTE: string = "/api/spending/get-spending";
  export const MAX_SPENDINGS_FOR_A_DAY: number = 15;
};
