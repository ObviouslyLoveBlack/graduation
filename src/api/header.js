import request from "@/utils/request";

const headerApi ={
    getMenuList:'/boardType/getboardType/menu',
}

export function getMenuList(params){
   return request({
        url:headerApi.getMenuList,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}