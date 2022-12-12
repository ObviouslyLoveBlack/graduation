import request from "@/utils/request";

const headerApi ={
    getMenuList:'/getMenuList',
}

export function getMenuList(params){
   return request({
        url:headerApi.getMenuList,
        method:'post',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}