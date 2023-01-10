import request from "@/utils/request";

const hotspotApi ={
    getmostPopular:'/getfilms/mostPopular', //获取最受欢迎影评
    getnewfilmsreview:'/getfilms/newfilmsreview', //获取新片影评
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