import request from "@/utils/request";

const boardApi = {
    getboardType:'/boardType/getboardType/board',//获取榜单list

    getboardpraise:'/boardPraise/getBorderPraise',//获取热映口碑

    boardboxoffice:'/boardPraise/getBorderBoxOffice',//获取国内票房

    getexpect:'/boardExpect/getPage',//获取最受期待

    getTop:'/boardTop/getPage',//获取top100
}

export function getTop(params){
    return request({
         url:boardApi.getTop,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }

export function getexpect(params){
    return request({
         url:boardApi.getexpect,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }

export function boardboxoffice(params){
    return request({
         url:boardApi.boardboxoffice,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
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
 export function getboardpraise(params){
    return request({
         url:boardApi.getboardpraise,
         method:'get',
         params,
         headers:{
             'Content-Type':'application/x-www-form-urlencoded'
         }
     })
 }