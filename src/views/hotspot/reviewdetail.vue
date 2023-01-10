<template>
  <div class="detail-container">
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
          <button>
            <a-icon type="like" style="margin-right: 3px" />有用<span>{{
              targetObj.like
            }}</span>
          </button>
          <button>
            <a-icon type="dislike" style="margin-right: 3px" />没用<span>{{
              targetObj.dislike
            }}</span>
          </button>
        </div>
        <div class="old-review">
          <a-comment
            class="comment"
            v-for="action in targetObj.reviewInfo"
            :key="action.key"
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
            <p slot="content">{{ action.content }}</p>
            <a-comment v-for="item in action.children" :key="item.id">
              <a slot="author" class="review-author">
                <span>{{ item.author }}</span>
                <span>{{ item.datetime }}</span>
              </a>
              <a-avatar
                slot="avatar"
                :src="`${item.avatar}`"
                :alt="item.author"
              />
              <p slot="content">{{ item.content }}</p>
            </a-comment>
          </a-comment>
          <div class="respone">
            <a-icon type="right" style="margin-right: 5px" />
            我来评论
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
          <p>导演：<span>{{targetObj.director}}</span></p>
          <p>主演：<span>{{targetObj.tostar}}</span></p>
          <p>类型：<span>{{targetObj.type}}</span></p>
          <p>地区：<span>{{targetObj.location}}</span></p>
          <p>上映：<span>{{targetObj.Shown}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "review-detail",
  data() {
    return {
      targetObj: {},
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
    };
  },
  created() {
    const { target } = this.$route.query;
    this.targetObj = JSON.parse(decodeURIComponent(target));
    console.log(this.targetObj);
  },
  methods: {
    onSearch(value) {
      console.log(value);
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
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
        width: 420px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        font-size: 13px;
        margin-bottom: 10px;
        cursor: default;
        img {
          height: 24px;
          width: 24px;
        }
        p {
          margin-top: 13px;
          color: #37a;
          &:hover {
            background: #37a;
            color: #fff;
          }
        }
        .movicname {
          color: #37a;
          &:hover {
            background: #37a;
            color: #fff;
          }
        }
        .rate {
          font-size: 14px;
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
          span {
            margin-left: 3px;
          }
          &:hover {
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
          padding-top: 10px;
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
</style>