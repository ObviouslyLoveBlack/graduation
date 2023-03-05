import request from "@/utils/request";

const cinemaApi = {
    getOfficeData:'/analyseOffice/getAnalyse/office', //获取数据分析 票房数据
    getAggregateData:'/getDatas/aggregate/detail', //获取数据分析 综合票房数据
    getWeblogData:'/analyseWeblog/getWeblogAll', //获取数据分析 网播热剧数据
    getTvVewingData:'/analyseTvviewing/TvViewing', //获取数据分析 电视数据

    arrangementcommon:'/arrangement/getAll', //获取数据分析 排片 普通时间段
    arrangementperiod:'/getDatas/arrangement/period', //获取数据分析 排片 黄金时间段
    arrangementcommonSeat:'/arrangement/common/seat', //获取数据分析 排片 普通时间段按座位
    arrangementperiodSeat:'/arrangement/period/seat', //获取数据分析 排片 黄金时间段按座位
    
}
export function arrangementcommon(params){
    return request({
        url:cinemaApi.arrangementcommon,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function arrangementperiod(params){
    return request({
        url:cinemaApi.arrangementperiod,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function arrangementcommonSeat(params){
    return request({
        url:cinemaApi.arrangementcommonSeat,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function arrangementperiodSeat(params){
    return request({
        url:cinemaApi.arrangementperiodSeat,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getTvVewingData(params){
    return request({
        url:cinemaApi.getTvVewingData,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getOfficeData(params){
    return request({
        url:cinemaApi.getOfficeData,
        method:'get',
        params,
        // headers:{
        //     'Content-Type':'application/x-www-form-urlencoded'
        // }
    })
}
export function getAggregateData(params){
    return request({
        url:cinemaApi.getAggregateData,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}
export function getWeblogData(params){
    return request({
        url:cinemaApi.getWeblogData,
        method:'get',
        params,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}