<template>
  <div>
    <div class="review-container" v-if="list.length > 0">
      <div class="item" v-for="action in list" :key="action.key">
        <img :src="action.img" alt="" />
        <a-comment>
          <template slot="actions">
            <!-- <span key="comment-basic-like">
              <a-tooltip title="赞成">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like(action)"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ action.like }}
              </span>
            </span>
            <span key="comment-basic-dislike">
              <a-tooltip title="不赞成">
                <a-icon
                  type="dislike"
                  :theme="action === 'disliked' ? 'filled' : 'outlined'"
                  @click="dislike(action)"
                />
              </a-tooltip>
              <span style="padding-left: '8px'; cursor: 'auto'">
                {{ action.dislike }}
              </span>
            </span> -->
            <span
              @click="viewDetail(action)"
              class="edit-reply"
              key="comment-basic-reply-to"
            >
              评论
              <a-icon type="edit" />
            </span>
          </template>
          <a slot="author" class="author">
            <div class="author-img">
              <img :src="action.avatar" alt="" />
            </div>
            <span @click="getUserDetail(action)">{{ action.author }}</span>
            <a-tooltip slot="star-score" :title="action.score">
              <a-rate
                :default-value="action.score"
                allow-half
                disabled
                class="star-score"
              />
            </a-tooltip>
          </a>
          <p slot="content" class="title" @click="viewDetail(action)">
            {{ action.title }}
          </p>
          <p
            slot="content"
            :class="full && action.id == key ? 'full-text' : 'content'"
            v-html="
              full && action.id === key ? action.content : action.content1
            "
          ></p>
          <span
            v-if="!full || action.id !== key"
            class="detail-content"
            @click="fullText(action.id, $event)"
            >(全文展开)</span
          >
          <span
            v-if="full && action.id === key"
            class="detail-content"
            @click="Stow"
            >(收起)</span
          >
          <a-tooltip slot="datetime" :title="action.dateTime">
            <!-- moment().format('YYYY-MM-DD HH:mm:ss') -->
            <span class="datetime">{{
              moment(action.dateTime).fromNow()
            }}</span>
          </a-tooltip>
        </a-comment>
      </div>
      <div class="pagination">
        <a-pagination
          v-model="current"
          :total="total"
          :show-total="(total) => `共 ${total} 条`"
          :pageSize="5"
          @change="change"
        />
      </div>
    </div>
    <p style="height: 150px" class="maker-empot" v-else>
      <a-spin size="large" tip="数据加载中..." />
    </p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "films-review",
  data() {
    return {
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      star: 4.5,
      full: false,
      date: [2022 - 12 - 12],
      list: [],
      key: "",
      total: 30,
      current: 1,
      seat: {},
    };
  },
  created() {
    this.getmostPopular(1);
  },
  methods: {
     getUserDetail(action,author){
      this.$router.push({
        path:'/account',
        query:{
          name:action.author || author
        }
      })
    },
    getmostPopular(page) {
      const params = {
        pageNum: page,
        pageSize: 5,
      };
      this.$req.getmostPopular(params).then((res) => {
        this.total = res.data.total;
        this.list = res.data.records;
      });
    },
    like(action) {
      action.like += 1;
      this.action = "liked";
    },
    dislike(action) {
      action.dislike += 1;
      this.action = "disliked";
    },
    fullText(key, e) {
      this.seat = {
        X: e.pageX,
        y: this.heightToTop(e.target),
      };
      this.key = key;
      this.full = true;
    },
    heightToTop(ele) {
      //ele为指定跳转到该位置的DOM节点
      let root = document.body;
      let height = 0;
      do {
        height += ele.offsetTop;
        ele = ele.offsetParent;
      } while (ele !== root);
      return height;
    },
    Stow() {
      window.scrollTo({
        top: this.seat.y - 300,
        behavior: "smooth",
      });
      this.full = false;
    },
    viewDetail(action) {
      this.$router.push({
        path: "/films-detail",
        query: {
          popularId: action.id,
        },
      });
    },
    change(page) {
      this.getmostPopular(page);
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.review-container {
  margin-top: -18px;
  width: 80%;
  // height: 800px;
  // border: 1px solid red;
  .item {
    padding: 30px 0px;
    display: flex;
    border-bottom: 1px solid #eaeaea;
    img {
      height: 170px;
    }
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
.author {
  display: flex;
  align-items: center;
  .author-img {
    width: 24px;
    height: 24px;
    // border-radius: 50%;
    background: pink;
    margin-right: 6px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.datetime {
  line-height: 23px;
}
.star-score {
  font-size: 12px;
  margin-left: 5px;
  margin-bottom: 3px;
}
.title {
  display: inline-block;
  cursor: default;
  font-size: 16px;
  color: #37a;
  &:hover {
    background: #37a;
    color: #fff;
  }
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: default;
}
.detail-content {
  position: absolute;
  bottom: 0%;
  right: 7px;
  color: #37a;
  &:hover {
    background: #37a;
    color: #fff;
    cursor: default;
  }
}
::v-deep .ant-comment-inner {
  padding: 0px;
}
.full-text {
  overflow: auto !important;
  cursor: default;
}
.edit-reply {
  &:hover {
    color: #fff;
    background: #37a;
  }
}
</style>