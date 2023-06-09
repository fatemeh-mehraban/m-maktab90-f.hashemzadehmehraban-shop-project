import { useQuery } from "react-query";
import { queryKeys } from "./queryKeys";
import { LoginAdmin } from "./services";
import { User } from "./interface";
// import { any } from "zod";

export const useAccessAdmin = ()=>{
  return useQuery(queryKeys.ACCESS_ADMIN,({data}:any)=>{
    LoginAdmin({data})
  })
}