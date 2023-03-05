<template>
  <div class="home-header">
    <div class="home-header-logo">
      <div class="logo">故之电影</div>
      <div class="location">杭州<a-icon type="caret-up" class="icon" /></div>
    </div>
    <div class="home-header-nav">
      <ul v-for="action in menuList" :key="action.id">
        <li
          @click="go(`${action.pathUrl}`)"
          :class="`${action.pathUrl}` === isActive ? 'active' : ''"
        >
          {{ action.pathName }}
        </li>
      </ul>
      <div class="load" @click="more">
        <a-icon type="mobile" class="icon" />了解更多
        <div v-if="codeVisible" class="code">
          <span>点击关闭</span>
        </div>
      </div>
    </div>
    <div class="home-header-login">
      <div class="login-layout">
        <div class="login-input">
          <input v-model="value" type="text" placeholder="找影视剧、影院、影人" />
          <div @click="onSearch" class="search"><a-icon type="search" class="icon" /></div>
        </div>
        <div class="login-logo" @mouseover="type = true" @mouseleave="type = false">
          <div class="logo">
            <img :src="userInfo.avatar" alt="">
            <div class="userInfo" v-if="!userInfo.token">
              <ul>
                <li @click="gologin"><a href="javascript:;">登录</a></li>
              </ul>
            </div>
            <div class="userInfo" v-else>
              <ul>
                <li @click="PerCenter"><a href="javascript:;">个人中心</a></li>
                <li @click="accountMan"><a href="javascript:;">账号管理</a></li>
                <li @click="logout"><a href="javascript:;">退出</a></li>
              </ul>
            </div>
          </div>
          <a-icon v-if="!type" type="caret-up" class="icon" />
          <a-icon v-else type="caret-down" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
const userUrl= {
    userAvart:require('../assets/image/猫眼/user.png')
}
export default {
  name: "my-header",
  data() {
    return {
      codeVisible: false,
      userVisible: false,
      userInfo:{},
      value:'',
      form: {
        home: true,
        films: false,
        cinema: false,
        billboard: false,
        hotspot: false,
      },
      menuList: [],
      isActive: "",
      active:'',
      type:false
    };
  },
  created() {
    this.newBackground();
    this.getMenuList();
    setInterval(() => {
      this.newBackground();
    }, 10);
  },
  computed:{
   ...mapState('user',['token']),
  },
  watch:{
    token:{
      immediate:true,
      handler(){
       this.userInfo = JSON.parse(localStorage.getItem('userInfo')) || {avatar:userUrl.userAvart,token:''}
      }
    }
  },
  methods: {
    ...mapMutations('user',['userInfologout']),
    onSearch(){
     if(!this.value) return
     let url = this.$router.resolve({
        path:'/movie/flims/detail',
        query:{
          name:encodeURIComponent(JSON.stringify(this.value)),
        }
      })
      window.open(url.href,'_blank')
      this.value = ''
    },
    more() {
      this.codeVisible = !this.codeVisible;
    },
    gologin() {
      this.$router.push({
        path: "/login",
        query:{
          url:this.$route.path
        }
      });
    },
    accountMan(){
       this.$router.push({
        path: "/account",
      });
    },
    logout(){
      this.userInfologout()
      this.$router.push('/login')
    },
    go(path) {
      this.$router.push({
        path:`/${path}`,
      });
      this.newBackground();
    },
    getMenuList() {
      this.$req.getMenuList().then((res) => {
        this.menuList = res.data;
      });
    },
    newBackground() {
      this.isActive = this.$route.path.split('/')[1];
    },
    PerCenter(){
    this.$message.info('暂未开发，敬请期待...')
    },
  },
};
</script>

<style lang="scss" scoped>
.home-header {
  width: 100%;
  height: 70px;
  min-width: 1200px;
  border: 1px solid #efefef;
  display: flex;
  // margin-bottom: 40px;
  .home-header-logo {
    width: 25%;
    height: 70px;
    display: flex;
    justify-content: end;
    align-items: center;
    .logo {
      width: 7.5rem;
      color: red;
      font-size: 1.6625rem;
    }
    .location {
      width: 3.9rem;
      color: #666;
      font-size: 0.9375rem;
      display: flex;
      padding-top: 5px;
      .icon {
        margin-left: 0.625rem;
        margin-top: 4px;
      }
    }
  }
  .home-header-nav {
    flex: 1;
    height: 70px;
    display: flex;
    text-align: center;
    line-height: 70px;
    ul {
      flex: 1;
      // width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      li {
        width: 100%;
        font-size: 1.15rem;
        text-align: center;
        user-select: none;
        &:hover {
          color: red;
        }
      }
    }
    .load {
      width: 20%;
      height: 70px;
      position: relative;
      .icon {
        font-size: 25px;
        padding-top: 5px;
        margin-right: 6px;
      }
      .code {
        width: 215px;
        height: 215px;
        border: 1px solid #e1e1e1;
        background: #fff;
        position: absolute;
        top: 70px;
        left: 0px;
        background: url(../assets/image/code.jpg) no-repeat;
        background-size: cover;
        span {
          position: absolute;
          bottom: -20px;
          left: 73px;
        }
      }
    }
  }
  .home-header-login {
    width: 30%;
    height: 70px;
    .login-layout {
      width: 75%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .login-input {
        height: 2.375rem;
        border: 1px solid #e1e1e1;
        border-radius: 1.25rem;
        background: #faf8fa;
        line-height: 2.375rem;
        position: relative;
        input {
          margin-left: 0.9375rem;
          height: 20px;
          width: 16.25rem;
          border: none;
          background: #faf8fa;
          &:focus {
            outline: none;
          }
        }
        .search {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 1.25rem;
          background: #ef4638;
          position: absolute;
          top: -1px;
          right: 0px;
          text-align: center;
          color: #fff;
          .icon {
            font-size: 20px;
            position: absolute;
            top: -3px;
            left: -4px;
          }
        }
      }
      .login-logo {
        display: flex;
        height: 70px;
        margin-left: 100px;
        align-items: center;
        .logo {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 1.25rem;
          // background: #ef4638;
          // background: url(../assets/image/猫眼/user.png);
          background-size: 100% 100%;
          position: relative;
          display: flex;
          img{
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 1.25rem;
          }
          .userInfo {
            background: #fff;
            position: absolute;
            display: none;
            top: 54px;
            left: -18px;
            ul {
              width: 100px;
              border: 1px solid #efefef;
              list-style: none;
              text-align: center;
              margin-bottom: 0px;
              li {
                padding: 6px 0px;
                border-bottom: 1px solid #eaeaea;
                a{
                  color:#999;
                  &:hover{
                    color: #ef4638;
                  }
                }
                &:last-child{
                  border: 0px;
                }
              }
            }
          }
        }
        &:hover .userInfo {
          display: block;
        }
      }
      .icon {
        text-align: center;
        padding: 15px;
      }
    }
  }
}
.active {
  background-color: #ef4638;
  color: #fff;
  &:hover {
    color: #fff !important;
  }
}
</style>