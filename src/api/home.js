import request from "@/utils/request";


const homeApi={
    getHotMovies:'/getHotMovies',
    getsoonRelease:'/getsoonRelease',
    getHotPlay:'/getHotPlay',
    getHotTvPlay:'/getHotTvPlay',
    getFilmReview:'/getFilmReview',
    getboxoffice:'/getboxoffice',
    getprofit:'/getprofit',
    getmostexpect:'/getmostexpect',
    getTophundred:'/getTophundred',
    getmoviemaker:'/getmoviemaker'
}

export function getHotMovies(params){
  return request({
     url:homeApi.getHotMovies,
     method:'post',
     params,
   })
}
export function getsoonRelease(params){
  return request({
     url:homeApi.getsoonRelease,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getHotPlay(params){
  return request({
     url:homeApi.getHotPlay,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getHotTvPlay(params){
  return request({
     url:homeApi.getHotTvPlay,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getFilmReview(params){
  return request({
     url:homeApi.getFilmReview,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getboxoffice(params){
  return request({
     url:homeApi.getboxoffice,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getprofit(params){
  return request({
     url:homeApi.getprofit,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getmostexpect(params){
  return request({
     url:homeApi.getmostexpect,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getTophundred(params){
  return request({
     url:homeApi.getTophundred,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}
export function getmoviemaker(params){
  return request({
     url:homeApi.getmoviemaker,
     method:'get',
     params,
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
   })
}