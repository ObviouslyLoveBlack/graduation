<template>
  <div class="style-container">
    <div class="style-header"></div>
    <!-- <a-button @click="goback">返回</a-button> -->
    <div class="main-box">
      <div class="main-title">
        <h3>故之电影</h3>
        <div class="main-content">
          <img src="@/assets/image/3.png" alt="" />
          <div class="login-detail">
            <div class="login-box">
              <a-input
                @change="InputChange"
                placeholder="请输入手机号"
                v-model.number="form.phone"
                :maxLength="11"
                class="a-input"
              />
              <span @click="getVerfication" :class="tel ? 'spanActive' : ''">发送验证码</span>
            </div>
            <div class="login-box">
              <!-- <input type="text" v-model="form.verification" placeholder="请输入验证码" /> -->
              <a-input
                @change="InputChange"
                placeholder="请输入验证码"
                v-model.number="form.verification"
                :maxLength="6"
                class="a-input"
              />
            </div>
            <button @click="onSubmit" :class="code ? 'buttonActive' : ''">登录</button>
            <div class="agree-info">
              <input
                type="radio"
                name="checkbox"
                id="checkbox"
                :checked="agree"
                @click="changeAgree"
                class="radioStyle"
                :class="agree ? 'active' : ''"
              />
              <p>
                我已阅读并同意<span @click="showDrawer('series')"
                  >《用户服务协议》</span
                ><span @click="showDrawer('privacy')">《隐私政策》</span>
              </p>
            </div>
            <div class="careful">未注册的手机号将自动生成新账号</div>
            <a-drawer
              placement="right"
              :closable="false"
              :visible="visible"
              @close="onClose"
              :width="300"
            >
              <component :is="current" ref="current" />
            </a-drawer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import series from "./login-sub/service.vue";
import privacy from "./login-sub/privacy.vue";
export default {
  name: "login-1",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    series,
    // eslint-disable-next-line vue/no-unused-components
    privacy,
  },
  data() {
    return {
      agree: false,
      visible: false,
      current: "series",
      tel:false, //判断手机号校验是否合格
      code:false, //判断验证码?手机号检验是否合格
      form: {
        phone: "",
        verification: null,
      },
    };
  },
  created() {},
  methods: {
    InputChange() {
      if (typeof this.form.verification == "string") {
        this.form.verification = null;
      }
      if (typeof this.form.phone == "string") {
        this.form.phone = null;
      }
      const validPhone =  this.validPhone(this.form.phone)
      this.tel = validPhone
      const validCode = String(this.form.verification).length == 6 && validPhone
      this.code = validCode
    },
    async getVerfication() {
      if(!this.tel) return
      const { data: res } = await this.$req.Verification();
      this.form.verification = res.code;
    },
    async onSubmit(){
      if(!this.code) return
      if(!this.agree) return this.$message.info('请仔细阅读并同意勾选用户服务协议等')
      const { data: res } = await this.$req.Login();
      console.log(res);
    },
    goback() {
      this.$router.back();
    },
    changeAgree() {
      this.agree = !this.agree;
    },
    showDrawer(type) {
      this.visible = true;
      if (type === "series") {
        this.current = "series";
      } else {
        this.current = "privacy";
      }
    },
    onClose() {
      this.visible = false;
    },
    //验证输入的手机号
    validPhone (str) {
     return /^[1]([3-9])[0-9]{9}$/.test(str)
    }
  },
};
</script>
<style lang="scss" scoped>
.style-header {
  width: 100%;
  height: 40px;
}
.main-box {
  width: 70%;
  min-width: 1100px;
  margin: 0px auto;
  .main-title {
    h3 {
      padding: 10px 20px;
      color: #ff626e;
      font-size: 50px;
      text-shadow: 4px 7px #ffbe71;
      letter-spacing: 14px;
    }
    .main-content {
      display: flex;
      justify-content: space-evenly;
      img {
        width: 480px;
        height: 370px;
      }
      .login-detail {
        margin-top: 100px;
        .login-box {
          position: relative;
          border-bottom: 1px solid #eaeaea;
          input {
            width: 300px;
            padding: 20px 20px 10px 0px;
            border: none;
            &:focus {
              outline: none;
            }
          }
          span {
            position: absolute;
            top: 10px;
            right: 14px;
            cursor: pointer;
            color: #adadad;
          }
          .a-input {
            padding: 20px 0px;
            &:focus {
              border: 0;
              outline: none !important;
              box-shadow: none;
            }
          }
        }
        button {
          width: 100%;
          margin: 20px 0px 0px 0%;
          border-radius: 20px;
          padding: 10px 40px;
          border: 1px solid #eaeaea;
          color: #adadad;
        }
        .agree-info {
          margin-top: 10px;
          display: flex;
          align-items: center;
          .radioStyle {
            width: 16px;
            height: 16px;
            border: 1px solid #999;
            border-radius: 50%;
            cursor: pointer;
            &:focus {
              outline: none;
            }
          }
          p {
            margin: 2px 0px 0px 5px;
            span {
              color: #ef3834;
              cursor: pointer;
              &:hover {
                border-bottom: 1px solid #ff626e;
              }
            }
          }
        }
        .careful {
          margin: 10px 15px;
          position: relative;
          &::before {
            display: block;
            content: "*";
            position: absolute;
            top: -5px;
            left: -12px;
            font-size: 20px;
            color: #ef3834;
          }
        }
      }
    }
  }
}
.active {
  background-image: url(@/assets/image/checkbox.png) !important;
  background-position: 100% 100%;
  background-size: contain;
  border: none;
}
.spanActive{
  color: #ef3834 !important;
}
.buttonActive{
  background: #ef3834;
  color: white !important;
}

input[type="checkbox"]{
  -webkit-appearance: none;
}
input[type="radio"]{
  -webkit-appearance: none;
}
</style>