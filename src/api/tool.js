import request from "@/utils/request";


const toolApi={
    Logout:'/getValidate',
    Login:'/user/getLogin',
    register:'/user/savePhone',
    verification:'/user/getRandomNum', //获取验证码
    getmakerById:'/makers/getById',
    makerAwardById:'awardNominate/getById', //获奖详情
    updateUser:'/user/update/user'

}

export function updateUser(params){
  return request({
     url:toolApi.updateUser,
     method:'put',
     data:params,
     headers:{
      'Content-Type':'application/json;charset=UTF-8'
     }
   })
}

export function makerAwardById(id){
  return request({
     url:`${toolApi.makerAwardById}/${id}`,
     method:'get',
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
  })
}

export function getmakerById(id){
  return request({
     url:`${toolApi.getmakerById}/${id}`,
     method:'get',
     headers:{
      'Content-Type':'application/x-www-form-urlencoded'
     }
  })
}

export function register(params){
  return request({
     url:toolApi.register,
     method:'post',
     data:params,
     headers:{
      'Content-Type':'application/json;charset=UTF-8'
     }
   })
}

export function Verification(params){
  return request({
     url:toolApi.verification,
     method:'get',
     params,
    //  headers:{
    //   'Content-Type':'application/x-www-form-urlencoded'
    // }
  })
}

export function Logout(params){
  return request({
     url:toolApi.Logout,
     method:'post',
     params,
   })
}
export function Login(phone){
  return request({
     url:`${toolApi.Login}/${phone}`,
     method:'get',
   })
}