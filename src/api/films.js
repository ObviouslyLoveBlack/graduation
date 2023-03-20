import request from "@/utils/request";

const filmsApi ={
    getFilmsType:'/boardType/getboardType/films', //获取电影路由分类
    getFilmsnavType:'/getFilmsNav/filmsType/type', //获取电影导航栏 类型分类
    getFilmsnavRegion:'/getFilmsNav/filmsType/location', //获取电影导航栏 地区分类
    getFilmsnavEra:'/getFilmsNav/filmsType/year', //获取电影导航栏 年代分类
    getAllfilms:'/releaseFilms/ByPageWithType', //获取电影 正在热映全部电影
    getReleaseFilms:'/getFilms/getreleasefilms', //获取电影 即将上映 全部电影
    getFilmsDetailById:'/releaseFilms/ReleaseFilmsById',
    getFilmsDetailByName:'/releaseFilms/getByName',
    getAllfilmsNotType:'/releaseFilms/getAllFilms',

    saveShortComment:"/shortComm/saveShortComment" , //电影详情新增影评
    updateSum:"/releaseFilms/update/sum" , //电影详情新增影评数量

    updateLikes:"/shortComm/update/likes" , //电影详情更新影评 likes
}

export function updateLikes(params){
    return request({
         url:filmsApi.updateLikes,
         method:'put',
         data:params,
         headers:{
             'Content-Type':'application/json;charset=UTF-8'
         }
     })
 }

export function updateSum(params){
    return request({
         url:filmsApi.updateSum,
         method:'put',
         data:params,
         headers:{
             'Content-Type':'application/json;charset=UTF-8'
         }
     })
 }

export function saveShortComment(params){
    return request({
         url:filmsApi.saveShortComment,
         method:'post',
         data:params,
         headers:{
             'Content-Type':'application/json;charset=UTF-8'
         }
     })
 }

export function getAllfilmsNotType(params){
    return request({
         url:filmsApi.getAllfilmsNotType,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }

export function getFilmsDetailByName(name){
    return request({
         url:`${filmsApi.getFilmsDetailByName}/${name}`,
         method:'get',
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }

export function getFilmsDetailById(id){
    return request({
         url:`${filmsApi.getFilmsDetailById}/${id}`,
         method:'get',
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
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
         method:'post',
         data:params,
         headers:{
             'Content-Type':'application/json;charset=UTF-8'
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