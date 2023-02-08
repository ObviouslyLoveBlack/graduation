export default {
    namespaced:true,
    state:()=>({
        redirectInfo:null, //记录从何页面跳转到登录页面，登录成功后返回原页面
    }),
    mutations:{
        updateRedirecInfo(state,info){
            state.redirectInfo = info
            this.redirectInfoToStorage()
        },
        redirectInfoToStorage(state){
            localStorage.setItem('info',state.redirectInfo)
        }
    },
    getters:{
        
    }
}