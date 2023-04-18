const Mock = require("mockjs");
const getRegExpUrl = function (relativeUrl) {
  return RegExp(relativeUrl + ".*");
};



//设置拦截axios请求的时间
Mock.setup({
  timeout: "100",
});

//登录
Mock.mock(getRegExpUrl('/getLogin'),'post',()=>{
  return{
    status:0,
    msg:'操作成功',
    data:{
      token:'fndjfdinanfhdnsionfjdsknfkds3u82rnjkdsfh2839',
      role:2,
      username:'三千里',
      password:439778,
    }
  }
})
//获取验证码
Mock.mock(getRegExpUrl('/user/getRandomNum'),'get',()=>{
  return{
    status:0,
    msg:'操作成功',
    data:{
      code:439778
    }
  }
})