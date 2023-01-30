import request from "@/utils/request";

const formsApi = {
    getFilmworksdetail:'/getfilms/wokers/detail', //获取电影人详情
}


export function getFilmworksdetail(params){
    return request({
         url:formsApi.getFilmworksdetail,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }