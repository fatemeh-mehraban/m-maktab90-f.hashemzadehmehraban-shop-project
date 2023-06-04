import { useQuery } from "react-query";
import { queryKeys } from "./queryKeys";
import { LoginAdmin } from "./services";

export const useAccessAdmin = ()=>{
  return useQuery(queryKeys.ACCESS_ADMIN,LoginAdmin)
}