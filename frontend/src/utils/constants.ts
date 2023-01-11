export namespace Constants {
  export const BASE_URL: String = (import.meta.env.DEV ? import.meta.env.VITE_SERVER_BASE_URL_DEV : import.meta.env.VITE_SERVER_BASE_URL_PROD);
};
