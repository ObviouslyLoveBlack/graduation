<template>
  <div class="home-header">
    <div class="home-header-logo">
      <div class="logo">故之电影</div>
      <div class="location">杭州<a-icon type="caret-up" class="icon" /></div>
    </div>
    <div class="home-header-nav">
      <ul v-for="action in menuList" :key="action.id">
        <li
          @click="go(`${action.path}`)"
          :class="`${action.path}` === isActive ? 'active' : ''"
        >
          {{ action.title }}
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
          <input type="text" placeholder="找影视剧、影院、影人" />
          <div class="search"><a-icon type="search" class="icon" /></div>
        </div>
        <div class="login-logo">
          <div class="logo">
            <div class="userInfo">
              <ul>
                <li><a><router-link :to="{path:'/login'}">登录</router-link></a></li>
              </ul>
            </div>
          </div>
          <a-icon type="caret-up" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      codeVisible: false,
      userVisible: false,
      form: {
        home: true,
        films: false,
        cinema: false,
        billboard: false,
        hotspot: false,
      },
      menuList: [],
      isActive: "",
      active:''
    };
  },
  created() {
    this.newBackground();
    this.getMenuList();
    setInterval(() => {
      this.newBackground();
    }, 10);
  },
  methods: {
    more() {
      this.codeVisible = !this.codeVisible;
    },
    gologin() {
      // this.$router.push({
      //   path: "/evaluation",
      // });
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
      justify-content: space-evenly;
      .login-input {
        width: 14rem;
        height: 2.375rem;
        border: 1px solid #e1e1e1;
        border-radius: 1.25rem;
        background: #faf8fa;
        line-height: 2.375rem;
        position: relative;
        input {
          margin-left: 0.9375rem;
          height: 20px;
          width: 11.25rem;
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
        align-items: center;
        // border: 1px solid red;
        .logo {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 1.25rem;
          background: #ef4638;
          background: url(../assets/image/猫眼/user.png);
          background-size: 100% 100%;
          position: relative;
          .userInfo {
            width: 90px;
            height: 40px;
            background: #fff;
            border: 1px solid #efefef;
            position: absolute;
            display: none;
            top: 54px;
            left: -18px;
            ul {
              list-style: none;
              li {
                padding: 10px 26px;
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