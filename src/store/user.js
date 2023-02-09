export default {
    namespaced:true,
    state:{
        redirectInfo:null, //记录从何页面跳转到登录页面，登录成功后返回原页面
        userInfo:{},
        token:''
    },
    mutations:{
        // updateRedirecInfo(state,info){
        //     state.redirectInfo = info
        //     this.commit('user/redirectInfoToStorage')
        // },
        // redirectInfoToStorage(state){
        //     localStorage.setItem('redirectInfo',state.redirectInfo)
        // },
        setUserInfo(state,info){
            state.userInfo = info
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        },
    },
    // getters:{
        
    // }
}