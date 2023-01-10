import request from "@/utils/request";

const boardApi = {
    getboardType:'/getboardType',//获取榜单list
}

export function getboardType(params){
    return request({
         url:boardApi.getboardType,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }