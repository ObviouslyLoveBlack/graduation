import request from "@/utils/request";

const filmsApi ={
    getFilmsType:'/getfilmsType', //获取电影路由分类
    getFilmsnavType:'/getFilmsnav/filmsType', //获取电影导航栏 类型分类
    getFilmsnavRegion:'/getFilmsnav/filmsRegion', //获取电影导航栏 类型分类
    getFilmsnavEra:'/getFilmsnav/filmsEra', //获取电影导航栏 年代分类
    getAllfilms:'/getFilms/getAllfilms', //获取电影 正在热映全部电影
    getReleaseFilms:'/getFilms/getreleasefilms', //获取电影 即将上映 全部电影
}

export function getFilmsType(params){
   return request({
        url:filmsApi.getFilmsType,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getFilmsnavType(params){
    return request({
         url:filmsApi.getFilmsnavType,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }
 export function getFilmsnavRegion(params){
    return request({
         url:filmsApi.getFilmsnavRegion,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }
 export function getFilmsnavEra(params){
    return request({
         url:filmsApi.getFilmsnavEra,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }
 export function getAllfilms(params){
    return request({
         url:filmsApi.getAllfilms,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }
 export function getReleaseFilms(params){
    return request({
         url:filmsApi.getReleaseFilms,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }