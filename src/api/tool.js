import request from "@/utils/request";


const toolApi={
    Logout:'/getValidate',
    Login:'/getLogin',
    verification:'/login/verification', //获取验证码

}

export function Verification(params){
  return request({
     url:toolApi.verification,
     method:'get',
     params,
   })
}
export function Logout(params){
  return request({
     url:toolApi.Logout,
     method:'post',
     params,
   })
}
export function Login(params){
  return request({
     url:toolApi.Login,
     method:'post',
     params,
   })
}