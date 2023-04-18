<template>
  <div>
    <div class="account-header">
      <i>故之</i>
    </div>
    <div class="account-style">
      <div class="account-left">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="头像">
            <a-upload
              :customRequest="(file) => customRequest(file)"
              list-type="picture-card"
              :file-list="fileList"
              :multiple="true"
              @preview="handlePreview"
              @change="handleChange"
              :action="url"
              :headers="headers"
            >
              <div v-if="fileList.length < 8">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-model-item>
          <a-form-model-item label="昵称">
            <a-input v-model="form.username" placeholder="请输入昵称"></a-input>
          </a-form-model-item>
          <a-form-model-item label="个性签名">
            <a-input
              v-model="form.signature"
              placeholder="写点什么做一个独特的自己"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="个人介绍">
            <a-textarea
              v-model="form.introduction"
              placeholder="写点什么让别人对你印象深刻吧"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-model-item>
          <a-form-model-item label="家乡">
            <a-input v-model="form.address" placeholder="请输入"></a-input>
          </a-form-model-item>
          <a-form-model-item label="生日">
            <a-date-picker
              v-model="form.birthday"
              valueFormat="YYYY-MM-DD"
              placeholder="设置生日"
            />
          </a-form-model-item>
          <a-form-model-item label="手机号">
            <p>
              {{ form.phone }}
              <span @click="phoneBind">{{
                !phoneVisible ? "换绑" : "取消"
              }}</span>
            </p>
            <a-input
              v-if="phoneVisible"
              v-model="form.newPhone"
              style="width: 50%"
              placeholder="请输入手机号码"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="第三方">
            <a-icon type="wechat" class="ThreeIcon" />
            <span @click="bind">绑定</span>
            <a-icon type="weibo" class="ThreeIcon" />
            <span @click="bind">绑定</span>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button @click="goback">取消</a-button>
            <a-button @click="onSumbit" style="margin-left: 20px" type="primary"
              >确定</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="account-right">
        <div class="advertise">
          <img src="@/assets/image/hotspot/advertise/1.jpg" alt="" />
          <div class="advertise-info">
            <span>[同人点亮]活动已开启</span>
          </div>
          <p class="icon">广告</p>
        </div>
        <div class="detail-info">
          <p>
            <span style="color: #37a">个性化域名:</span
            >将用作个人主页网址的一部分，最多15个数字或字母，字母开头，一经设定则不可更改。
            如果现在你不是非常确定，可以先留空，以后再说。
          </p>
        </div>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
import { mapMutations } from "vuex";
import { validetePhone } from "../../utils/validate";
export default {
  name: "Account-a",
  data() {
    return {
      userInfo: {},
      phoneVisible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 13 },
      timeRange: undefined,
      form: {
        username: "",
        address: null,
        phone: null,
        newPhone: null,
        birthday: "",
        signature: "",
        introduction: "",
        avatar: "",
      },
      previewImage: "",
      fileList: [],
      url: "http://localhost:8080/file/uploadFile",
      previewVisible: false,
      headers: {
        authorization: "multipart/form-data",
      },
    };
  },
  mounted() {
    const { name } = this.$route.query;
    if (name) {
      this.getUserByName(name);
      return
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getUserById(this.userInfo);
    document.title =  this.userInfo.username + "的账号";
  },
  created() {},
  computed: {
    // ...mapState('user',['userInfo'])
  },
  methods: {
    ...mapMutations("user", ["updateUserInfo"]),
    getUserByName(name) {
      this.$req.getUserByName(name).then((res) => {
        this.form = res.data[0];
        this.setFileList(this.form.avatar);
        document.title =  res.data[0].username + "的账号";
      });
    },
    getUserById(info) {
      this.$req.getUserById(info.id).then((res) => {
        this.form = res.data;
        this.setFileList(this.form.avatar);
      });
    },
    setFileList(data) {
      const file = data.split("/");
      this.fileList[0] = {
        uid: data[3],
        name: file[file.length - 1],
        status: "done",
        url: data,
      };
    },
    onSumbit() {
      if (this.phoneVisible && !validetePhone(this.form.newPhone)) {
        this.$message.error("请填写正确手机号码");
        return;
      }
      const {
        address,
        avatar,
        birthday,
        id,
        phone,
        newPhone,
        username,
        signature,
        introduction,
      } = this.form;
      const params = {
        address,
        avatar,
        birthday,
        id,
        username,
        introduction,
        signature,
        phone: newPhone ? newPhone : phone,
      };
      this.$req.updateUser(params).then((res) => {
        if (res.data) {
          this.updateUserInfo(this.form);
          this.$message.success("修改成功");
          this.form.phone = newPhone ? newPhone : phone;
        }
        this.getUserById(this.userInfo);
        this.phoneVisible = false;
        this.form.newPhone = null;
      });
    },
    phoneBind() {
      this.phoneVisible = !this.phoneVisible;
    },
    bind() {
      this.$message.info("暂未开发...");
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList, file }) {
      this.fileList = fileList;
      console.log(file);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    onChange(value, dateString) {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    },
    customRequest(options) {
      const { file, onSuccess } = options;
      const formData = new FormData();
      formData.append("file", file);
      this.$req.uploadFile(formData).then((res) => {
        if (res.status === 0) {
          // 调用组件内方法, 设置为成功状态
          onSuccess();
          options.status = "done";
          this.form.avatar = res.data;
          this.$message.success({ content: "上传成功" });
        } else {
          // onError()
          options.status = "error";
          this.$message.error({ content: "上传失败" });
        }
      });
      onSuccess("done", file);
      options.statue = "done";
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px;
}
.account-header {
  width: 100%;
  height: 100px;
  position: relative;
  background-image: linear-gradient(
    to right,
    #ff574d 0%,
    #20d8dc 25%,
    #2bc7ff 50%,
    #20d8dc 75%,
    #ef3834 100%
  );
  i {
    color: #88dd2c;
    font-size: 40px;
    letter-spacing: 10px;
    position: absolute;
    top: 20%;
    left: 20%;
  }
}
.account-style {
  width: 80%;
  // min-width: 1200px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  // border: 1px solid #ef3834;
  .account-left {
    width: 60%;
    .a-input {
      border: 1px solid #eaeaea;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    .password {
      color: #37a;
      cursor: pointer;
    }
  }
  .account-right {
    width: 35%;
    height: 400px;
    // border: 1px solid red;
    .advertise {
      width: 300px;
      height: 80px;
      border: 1px solid #eaeaea;
      margin-bottom: 70px;
      display: flex;
      position: relative;
      img {
        height: 80px;
      }
      .advertise-info {
        padding: 10px 0px 0px 20px;
        cursor: default;
        span {
          font-size: 13px;
          color: #37a;
          letter-spacing: 1px;
        }
      }
      .icon {
        width: 38px;
        height: 20px;
        text-align: center;
        background: #999;
        position: absolute;
        bottom: 0px;
        right: 0px;
        cursor: default;
      }
      .detail-info {
        width: 30%;
      }
    }
  }
  span {
    color: #37a;
    font-size: 14px;
    margin-left: 7px;
    cursor: pointer;
  }
  .ThreeIcon {
    margin-left: 20px;
    font-size: 28px;
    color: #88dd2c;
    &:nth-of-type(2) {
      color: #ef3834;
      margin-left: 20px;
    }
  }
}
</style>