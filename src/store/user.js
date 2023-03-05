export default {
    namespaced:true,
    state:()=>({
        redirectInfo:null, //记录从何页面跳转到登录页面，登录成功后返回原页面
        userInfo: {} ,
        token:'' 
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
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            state.userInfo = {
                ...userInfo,
                username:info.username,
                hometown:info.hometown,
                birsday:info.time
            }
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        }
    },
    getters:{
        
    }
}