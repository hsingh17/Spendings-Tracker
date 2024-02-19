import { useQuery } from "@tanstack/react-query";
import { GET, ME_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { User } from "../utils/types";

async function getUser() {
  return await fetchRequestWrapper<User>(ME_API_ROUTE, GET);
}

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
