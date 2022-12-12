import request from "@/utils/request";


const toolApi={
    Logout:'/getValidate',
}

export function Logout(params){
  return request({
     url:toolApi.Logout,
     method:'post',
     params,
   })
}