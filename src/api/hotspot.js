import request from "@/utils/request";

const hotspotApi ={
    getmostPopular:'/mostPopular/getPage', //获取最受欢迎影评
    getnewfilmsreview:'/newReview/getPage', //获取新片影评
    getReviewById:'/mostPopular/getById', //最受按ID
    getNewReviewById:'/newReview/getNewReview', //最受按ID
}

export function getNewReviewById(id){
    return request({
        url:`${hotspotApi.getNewReviewById}/${id}`,
        method:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getReviewById(id){
    return request({
        url:`${hotspotApi.getReviewById}/${id}`,
        method:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

export function getmostPopular(params){
    return request({
        url:hotspotApi.getmostPopular,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getnewfilmsreview(params){
    return request({
        url:hotspotApi.getnewfilmsreview,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}