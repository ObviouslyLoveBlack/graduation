export default {
    namespaced:true,
    state:()=>({
        redirectInfo:null, //记录从何页面跳转到登录页面，登录成功后返回原页面
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {} ,
        token:JSON.parse(localStorage.getItem('token')) || ''
    }),
    mutations:{
        setUserInfo(state,info){
            state.userInfo = info
            state.token = info.token
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
            localStorage.setItem('token',JSON.stringify(state.token))
        },
        userInfologout(state){
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            state.token = ''
            state.userInfo = {}
        },
        updateUserInfo(state,info){
            state.userInfo = info
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        }
    },
    getters:{
        
    }
}