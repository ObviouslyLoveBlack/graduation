<template>
  <div>
    <div v-if="loading">
       <div class="detail-container" v-if="targetObj">
         <div class="style-content">
      <div class="content-header">
        <div class="detail-header">
          <span>故之电影</span>
          <div class="search">
            <a-input-search
              class="a-input"
              placeholder="搜索电影、电视剧、综艺、影人"
              enter-button
              @search="onSearch"
            />
          </div>
        </div>
        <div class="detail-image">
          <img src="@/assets/image/annual_2022.png" alt="" />
        </div>
      </div>
         </div>
         <div class="detail-main">
      <div class="main-left">
        <p class="title">{{ targetObj.title }}</p>
        <div class="author-info">
          <img :src="`${targetObj.avatar}`" alt="" />
          <p>{{ targetObj.author }}</p>
          <span>评论</span>
          <span class="movicname">{{ targetObj.moviename }}</span>
          <a-rate
            :default-value="targetObj.score"
            allow-half
            disabled
            class="rate"
          />
          <span class="datetime">{{ targetObj.datetime }}</span>
        </div>
        <div class="spoiler">这篇有可能有剧透</div>
        <p v-html="targetObj.content" class="left-content"></p>
        <p>
          © 本文版权归作者 {{ targetObj.author }} 所有，任何形式转载请联系作者。
        </p>
        <div class="review-info">
          <button
            :class="current === index ? 'active' : ''"
            v-for="(item, index) in arr"
            :key="index"
            @click="changeStatus(item, index)"
          >
            <a-icon :type="item.type" style="margin-right: 3px" />{{ item.name
            }}<span>{{ item.num }}</span>
          </button>
          <!-- <button @click="like">
            <a-icon type="like" style="margin-right: 3px" />有用<span>{{
              targetObj.like
            }}</span>
          </button>
          <button @click="dislike">
            <a-icon type="dislike" style="margin-right: 3px" />没用<span>{{
              targetObj.dislike
            }}</span>
          </button> -->
        </div>
        <div class="old-review">
          <a-comment
            class="comment"
            v-for="action in targetObj.reviewInfo"
            :key="action.id"
            @mouseenter="touchComment(action.id)"
            @mouseleave="touchLeave()"
          >
            <a slot="author" class="review-author">
              <span>{{ action.author }}</span>
              <span>{{ action.datetime }}</span>
            </a>
            <a-avatar
              slot="avatar"
              :src="`${action.avatar}`"
              :alt="action.author"
            />
            <p slot="content">
              {{ action.content }}
              <span
                v-show="touch === action.id && token"
                class="one-res"
                @click="oneRespone(action)"
                >回应</span
              >
            </p>
            <div class="reply" v-if="reply === action.id ">
              <input
                type="text"
                v-model="finallyWord"
                :placeholder="'回复  ' + `${action.author}`"
              />
              <button @click="onReply(action)">回复</button>
              <button @click="handleClose">取消</button>
            </div>
            <a-comment
              v-for="item in action.children"
              :key="item.id"
              @mouseenter="touchComment(item.id)"
              @mouseleave="touchLeave()"
            >
              <a slot="author" class="review-author">
                <span>{{ item.author }}</span>
                <span>{{ item.datetime }}</span>
              </a>
              <a-avatar
                slot="avatar"
                :src="`${item.avatar}`"
                :alt="item.author"
              />
              <p slot="content">
                {{ item.content }}
                <span
                  v-show="touch === item.id && token"
                  class="one-res"
                  @click="oneRespone(item)"
                  >回应</span
                >
              </p>
              <div class="reply" v-if="reply === item.id">
                <input
                  type="text"
                  v-model="finallyWord"
                  :placeholder="'回复  ' + `${item.author}`"
                />
                <button @click="onReply(item)">回复</button>
                <button @click="handleClose">取消</button>
              </div>
            </a-comment>
          </a-comment>
          <div class="respone" v-if="!token" @click="gotoComment">
            <a-icon type="right" style="margin-right: 5px" />
            我来评论
          </div>
          <div slot="content" v-else>
            <a-form-item>
              <a-textarea
                :rows="4"
                v-model.trim="textareaValue"
                @change="handleChange"
                class="textarea"
              />
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
              >
                回应
              </a-button>
            </a-form-item>
          </div>
          <p class="footer">
            © 2005－2023 guzhi.com, all rights reserved 故之之科技有限公司
          </p>
        </div>
      </div>
      <div class="main-right">
        <div class="advertise">
          <img src="@/assets/image/hotspot/advertise/1.jpg" alt="" />
          <div class="advertise-info">
            <span>[同人点亮]活动已开启</span>
          </div>
          <p class="icon">广告</p>
        </div>
        <p class="right-title">
          <a-icon type="right" style="margin-right: 5px" />{{
            targetObj.moviename
          }}
        </p>
        <img :src="targetObj.img" alt="" />
        <div class="films-info">
          <p>
            导演：<span>{{ targetObj.director }}</span>
          </p>
          <p>
            主演：<span>{{ targetObj.tostar }}</span>
          </p>
          <p>
            类型：<span>{{ targetObj.type }}</span>
          </p>
          <p>
            地区：<span>{{ targetObj.location }}</span>
          </p>
          <p>
            上映：<span>{{ targetObj.Shown }}</span>
          </p>
        </div>
      </div>
         </div>
       </div>
       <div class="maker-empot" v-else>
         <p>暂无此数据，请稍后再试</p>
       </div>
    </div>
     <p style="height:150px" class="maker-empot" v-else>
      <a-spin  size="large" tip="数据加载中..."/>
     </p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "review-detail",
  data() {
    return {
      targetObj: {},
      loading:false,
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      touch: "", //回应字的显示隐藏
      reply: "", //回应输入框的显示隐藏
      submitting: false, //判断回应发表
      textareaValue: "",
      finallyWord: "",
      token: null,
      arr: [],
      current: "",
    };
  },
  mounted(){
   const userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''
   this.token = userInfo.token
  },
  computed: {
    count: {
      get() {
        return this.arr[0].num + this.arr[1].num;
      },
    },
  },
  created() {
    const { popularId,newId } = this.$route.query;
    if(popularId){
      this.getRevieDetail(popularId)
    }
    if(newId){
      this.getNewRevieDetail(newId)
    }
  },
  methods: {
    async getRevieDetail(id){
     const res = await this.$req.getReviewById(id)
     this.targetObj = res.data.data
     this.already(this.targetObj)
    },
    async getNewRevieDetail(id){
      const res = await this.$req.getNewReviewById(id)
       this.targetObj = res.data.data
       this.already(this.targetObj)
    },
    already(targetObj){
     document.title = '热门影评--' + targetObj.title
     this.arr = [
      { type: "like", name: "有用", num: targetObj.likes },
      { type: "dislike", name: "没用", num: targetObj.dislike },
    ];
     this.loading = true
    },
    onSearch(value) {
      let url = this.$router.resolve({
        path:'/movie/flims/detail',
        query:{
          name:encodeURIComponent(JSON.stringify(value)),
        }
      })
      window.open(url.href,'_blank')
    },
    changeStatus(item, index) {
      if(!this.token) return
      if (this.current === index) return;
      let rate = this.current !== '' ? 1 : 0;
      this.current = index;
      let another = index === 0 ? 1 : 0;
      this.arr[index].num += 1;
      this.arr[another].num = this.count - this.arr[index].num - rate;
    },
    handleChange() {
      // console.log(this.textareaValue);
    },
    handleSubmit() {
      if (!this.textareaValue) return;
      const {username,avatar} = JSON.parse(localStorage.getItem('userInfo'))
      this.targetObj.reviewInfo.push({
          content: this.textareaValue,
          author: username,
          avatar,
          datetime: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          id: this.targetObj.reviewInfo.length + 1,
      })
      this.textareaValue = ''
    },
    oneRespone(comment) {
      this.reply = comment.id;
      this.touch = null;
    },
    //鼠标移入影评
    touchComment(key) {
      // console.log(key);
      this.touch = key;
    },
    touchLeave() {
      this.touch = "";
    },
    //最终提交回复
    onReply(comment) {
      if (!this.finallyWord) return;
      const {username,avatar} = JSON.parse(localStorage.getItem('userInfo'))
      if(comment.author == username) return this.$message.error('不可回复自己')
      if (comment.children) {
        comment.children.push({
          content: this.finallyWord,
          author: username,
          avatar,
          datetime: this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          id: Number(comment.id) + 1,
        });
      } else {
        this.$message.info('回复失败')
      }
      this.finallyWord = "";
      this.reply = false
    },
    handleClose() {
      this.reply = null;
    },
    gotoComment() {
      if (!this.token) {
        this.$router.push({
          path: "/login",
        });
      }
      this.token = "fndgfdj9fndjgf9d9gfmd";
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-container {
  .style-content {
    width: 100%;
    background: #e3ebec;
    .content-header {
      width: 80%;
      min-width: 1200px;
      height: 100px;
      margin: 0 auto;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      .detail-header {
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #ef4238;
          font-size: 23px;
        }
        .search {
          display: flex;
          .a-input {
            width: 550px;
          }
        }
      }
      .detail-image {
        width: 189px;
        height: 92px;
        margin-top: 4px;
        margin-right: 190px;
        img {
          width: 189px;
          height: 92px;
        }
      }
    }
  }
  .detail-main {
    width: 80%;
    height: 200px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    .main-left {
      width: 60%;
      height: 200px;
      .title {
        font-size: 23px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .author-info {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: 13px;
        margin-bottom: 10px;
        cursor: default;
        img {
          height: 24px;
          width: 24px;
          margin-right: 10px;
        }
        p {
          margin-top: 13px;
          color: #37a;
          margin-right: 10px;
          &:hover {
            background: #37a;
            color: #fff;
          }
        }
        .movicname {
          color: #37a;
          margin-right: 10px;
          margin-left: 10px;
          &:hover {
            background: #37a;
            color: #fff;
          }
        }
        .rate {
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .spoiler {
        border-left: 2px solid #37a;
        padding-left: 10px;
        margin-bottom: 20px;
        //   &::before{
        //   display: inline-block;
        //   content: "";
        //   width: 2px;
        //   height: 22px;
        //   background: #37a;
        //   margin: 0px 10px 0px 0px;
        // }
      }
      .left-content {
        padding-bottom: 30px;
        // border-bottom: 1px solid #eaeaea;
        img {
          width: 100%;
        }
      }
      .review-info {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #eaeaea;
        button {
          margin-right: 16px;
          padding: 5px 10px;
          background: #fff;
          border: 1px solid #999;
          color: #999;
          cursor: pointer;
          span {
            margin-left: 3px;
          }
          &.active {
            background: #37a;
            color: #fff;
          }
        }
      }
      .old-review {
        width: 100%;
        // height: 600px;
        margin: 40px 0px;
        overflow: hidden;
        .review-author {
          width: 690px;
          display: block;
          height: 25px;
          line-height: 25px;
          background: #f3f5f7;
          align-items: center;
          color: #999;
          span {
            margin-right: 9px;
            &:first-child {
              color: #37a;
              &:hover {
                background: #37a;
                color: #fff;
              }
            }
          }
        }
        .respone {
          color: #000;
          cursor: default;
          padding-bottom: 30px;
          border-bottom: 1px solid #eaeaea;
          &:hover {
            color: #37a;
          }
        }
        p {
          padding: 10px 0px;
          // border-bottom: 1px solid #37a;
          position: relative;
          .one-res {
            position: absolute;
            bottom: -10px;
            right: 5px;
            color: #999;
            cursor: pointer;
            &:hover {
              background: #37a;
              color: white;
            }
          }
        }
        .footer {
          padding-top: 3px;
          margin: 0px;
          font-size: 13px;
          color: #999;
        }
      }
    }
    .main-right {
      width: 35%;
      height: 400px;
      position: fixed;
      top: 150px;
      right: 0%;
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
          bottom: -14px;
          right: 0px;
          cursor: default;
        }
      }
      .right-title {
        // width: 110px;
        display: inline-block;
        color: #37a;
        cursor: default;
        &:hover {
          background: #37a;
          color: #fff;
        }
      }
      img {
        display: block;
        height: 170px;
        margin-bottom: 20px;
      }
      .films-info {
        // margin-top: 20px;
        p {
          margin-bottom: 5px;
          color: #999;
          cursor: default;
          span {
            color: #000;
          }
        }
      }
    }
  }
}
.maker-empot{
  width: 50%;
  min-width: 1000px;
  height: 90px;
  margin: 50px auto;
}
::v-deep .ant-btn-primary {
  background: #ef4238;
  border-color: #ef4238;
}
::v-deep .ant-input {
  border: 1px solid #ef4238;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.comment {
  margin-bottom: 20px;
  // border: 1px solid #37a;
  .reply {
    display: flex;
    justify-content: space-between;
    input {
      border: 1px solid #eaeaea;
      width: 80%;
      padding: 4px 10px;
      margin-bottom: 5px;
      &:focus {
        outline: none;
        border: 1px solid #eaeaea;
      }
    }
    button {
      height: 31px;
      padding: 0px 10px;
      color: #999;
      border: 1px solid #eaeaea;
      // background: #eaeaea;
      &:hover {
        color: white;
        background: #37a;
      }
    }
  }
}
::v-deep .ant-comment-inner {
  padding: 0px;
}
::v-deep .ant-avatar {
  border-radius: 1px;
  width: 32px;
  height: 32px;
  img {
    width: 32px;
    height: 32px;
    border-radius: 1px;
  }
}
textarea.ant-input {
  border: 1px solid #eaeaea;
}
.ant-btn-primary {
  background: #37a;
  border: none;
}
</style>