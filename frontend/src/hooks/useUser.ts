import { useQuery } from "@tanstack/react-query";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Constants } from "../utils/constants";
import { User } from "../utils/types";

async function getUser() {
  return await fetchRequestWrapper<User>(Constants.BASE_API_URL + Constants.ME_API_ROUTE, Constants.GET);
}

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser
  });
}