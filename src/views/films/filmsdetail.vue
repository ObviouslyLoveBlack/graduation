<template>
  <div>
    <div v-if="loading">
      <div class="maker-container" v-if="targetObj">
        <div class="maker-header">
          <div class="image">
            <img :src="targetObj.img" alt="" />
          </div>
          <div class="maker-info">
            <p class="info-name">{{ targetObj.movieName }}</p>
            <p class="info-name1">{{ targetObj.otherName }}</p>
            <br />
            <p>导演: {{ castmembers[0].name }}</p>
            <p class="act">主演: {{ fullAct }}</p>
            <br />
            <p>类型: {{ targetObj.otherType }}</p>
            <p>{{ targetObj.longTime }}</p>
            <div class="expect-symbol">
              <div
                class="want"
                :class="attention ? 'active' : ''"
                @click="getexpect"
              >
                <a-icon type="heart" />
                想看
              </div>
              <div class="want" @click="getToScore">
                <a-icon type="star" />
                评分
              </div>
            </div>
          </div>
          <div class="films-info">
            <p>想看数</p>
            <span class="fans">{{
              targetObj.sum === null || targetObj.sum === 0
                ? "暂无"
                : targetObj.sum
            }}</span>
            <p>累计票房</p>
            <span class="box-office">{{
              targetObj.office > 10000
                ? (targetObj.office / 10000).toFixed(2) + "亿"
                : targetObj.office > 0
                ? targetObj.office + "万"
                : "暂无"
            }}</span>
          </div>
        </div>
      </div>
      <div class="main" v-if="targetObj">
        <div class="main-left">
          <p class="nav-title">故之电影 > 电影 >{{ targetObj.movieName }}</p>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="介绍">
              <introduce
                :ReleaseIntroduceinfo="ReleaseIntroduceinfo"
                :castmembers="castmembers"
                :shortComments="shortComments"
                :materials="materials"
                :honorary="honorary"
                :awards="awards"
                :id="targetObj.id"
                @reload="reload"
              />
            </a-tab-pane>
            <a-tab-pane
              key="2"
              tab="奖项"
              force-render
              :disabled="awards.length <= 0"
            >
              <awards :awards="awards" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="图集">
              <atlas :atlasurls="atlasurls" />
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="main-right">
          <div class="relevantFlims">
            <h2>相关电影</h2>
            <div class="relevantFlims-box">
              <div
                class="relevantFlims-item"
                v-for="action in releaseRelates"
                :key="action.id"
                @click="filmsDetail(action)"
              >
                <img :src="action.img" alt="" />
                <p>{{ action.movieName }}</p>
                <p class="score">{{ Number(action.score) || "暂无" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="maker-empot" v-else>
        <span>抱歉，没有找到相关结果，请尝试用其他条件筛选。...</span>
      </div>
    </div>
    <p class="maker-empot" v-else>
      <a-spin tip="数据加载中..." />
    </p>
    <a-modal :visible="visible" :footer="false" :closable="false">
      <p class="title">点亮星星-献上你的评分</p>
      <a-rate v-model="score" @hoverChange="changeScore" allow-half style="margin-bottom: 20px" />
      <span style="margin-left:20px;color:#FFC600">{{scoreDesci}}</span>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button class="bnt" @click="handleCancel">取消</a-button>
        <a-button class="bnt" @click="handleOk">提交</a-button>
      </a-form-model-item>
    </a-modal>
  </div>
</template>

<script>
import introduce from "./films-detail-tab/introduce.vue";
import awards from "./films-detail-tab/awards.vue";
import atlas from "./films-detail-tab/atlas.vue";
import { mapState } from "vuex";
export default {
  name: "movie-detail",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    introduce,
    // eslint-disable-next-line vue/no-unused-components
    atlas,
    // eslint-disable-next-line vue/no-unused-components
    awards,
  },
  data() {
    return {
      targetObj: null,
      loading: false,
      visible: false,
      id: "",
      score: 0,
      scoreDesci:'',
      attention: false, //判断是否想看
      atlasurls: [], //图集
      ReleaseIntroduceinfo: [], //个人介绍
      awards: [], //获奖情况
      honorary: [],
      materials: [],
      castmembers: [], //演员表
      shortComments: [], //影评
      releaseRelates: [],
      // awards:{title:'第16届亚洲电影大奖',content:'提名:最佳男主角/最佳男配角'}
    };
  },
  created() {
    const { id, name } = this.$route.query;
    if (id) {
      this.id = id;
      this.getById(id);
    }
    if (name) {
      const newName = JSON.parse(decodeURIComponent(name));
      this.getByName(newName);
    }
  },
  computed: {
    ...mapState("user", ["token", "userInfo"]),
    fullAct() {
      const act =
        this.castmembers[1].name +
        " / " +
        this.castmembers[2].name +
        " / " +
        this.castmembers[3].name +
        " / " +
        this.castmembers[4].name;
      return act;
    },
  },
  methods: {
    reload(id) {
      this.getById(id);
    },
    filmsDetail(action) {
      let url = this.$router.resolve({
        path: "/movie/flims/detail",
        query: {
          id: action.id,
        },
      });
      window.open(url.href, "_blank");
    },
    getexpect() {
      if (!this.token) return;
      this.attention = !this.attention;
      const sum = this.attention
        ? this.targetObj.sum + 1
        : this.targetObj.sum - 1;
      const params = {
        id: this.id,
        sum,
      };
      this.$req.updateSum(params).then((res) => {
        if (res.status === 0) {
          this.getById(this.id);
        }
      });
    },
    async getTarget(res) {
      this.targetObj = res.release;
      this.atlasurls = res.atlasurls;
      this.ReleaseIntroduceinfo = res.ReleaseIntroduceinfo;
      this.awards = res.awards || [];
      this.honorary = res.honorary || [];
      this.materials = res.materials;
      this.castmembers = res.castmembers;
      this.shortComments = res.shortComments;
      this.releaseRelates = res.releaseRelates;
      this.loading = true;
      document.title = "电影--" + this.targetObj.movieName;
    },
    async getById(id) {
      const { data: res } = await this.$req.getFilmsDetailById(id);
      this.getTarget(res);
    },
    async getByName(name) {
      const { data: res } = await this.$req.getFilmsDetailByName(name);
      if (res.length <= 0) {
        this.loading = true;
        this.targetObj = false;
        return;
      }
      this.getById(res[0].id);
    },
    getToScore() {
      if (!this.token) return;
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.score = 0;
    },
    handleOk() {
      const params = {
        id: this.id,
        score: this.score * 2,
      };
      this.$req.updateSum(params).then((res) => {
        if (res.status === 0) {
          this.$message.success('评分成功')
          this.getById(this.id);
          this.handleCancel()
        }
      });
    },
    changeScore(value){
      if(!value || value < 0.5) {
        this.scoreDesci = ''
        return
      }
      const map = new Map([
        [1,'超级烂',],
        [2,'超级烂'],
        [3,'比较差'],
        [4,'比较差'],
        [5,'一般般'],
        [6,'一般般'],
        [7,'比较好'],
        [8,'比较好'],
        [9,'棒极了'],
        [10,'完美']
      ])
       const title = map.get(value * 2)
       this.scoreDesci = value * 2 + ' 分' + title
    }
  },
};
</script>

<style lang="scss" scoped>
.bnt {
  margin-right: 15px;
  &:hover {
    border: 1px solid #333;
    color: #666;
  }
  &:last-child {
    &:hover {
      background: #ef4238;
      color: white !important;
      border: 1px solid #ef4238;
    }
    &:focus {
      color: #666;
      border: 1px solid #d9d9d9;
    }
  }
}
p {
  margin-bottom: 0px;
}
.act {
  width: 300px;
  // border: 1px solid red;
}
.maker-container {
  width: 100%;
  border-top: 1px solid transparent;
  background-image: url(@/assets/image/maker.jpg);
  background-repeat: no-repeat;
  background-size: 100% 95%;
  .maker-header {
    width: 80%;
    min-width: 1200px;
    height: 330px;
    margin: 0 auto;
    margin-top: 70px;
    display: flex;
    position: relative;
    .image {
      border: 1px solid #eaeaea;
      img {
        width: 240px;
        height: 330px;
      }
    }
    .maker-info {
      margin-left: 20px;
      position: relative;
      p {
        color: white;
        font-size: 16px;
        margin-bottom: 5px;
        // border: 1px solid red;
      }
      .info-name {
        margin-top: -8px;
        font-size: 25px;
        font-weight: 500;
      }
      .info-name1 {
        margin-top: -8px;
        font-size: 18px;
        font-weight: 500;
      }
      .expect-symbol {
        // border: 1px solid red;
        position: absolute;
        left: 0px;
        bottom: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        width: 250px;
        .want {
          background: #756189;
          color: #fff;
          padding: 7px 28px;
          cursor: pointer;
          user-select: none;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
    .films-info {
      color: white;
      position: absolute;
      bottom: 100px;
      left: 710px;
      p {
        margin-bottom: 0px;
        font-size: 13px;
        &:nth-of-type(2) {
          margin-top: 10px;
        }
      }
      .fans {
        font-size: 28px;
        color: #ffc600;
      }
      .box-office {
        font-size: 25px;
        font-weight: 400;
      }
    }
  }
}
.main {
  width: 80%;
  min-width: 1200px;
  height: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  .main-left {
    width: 58%;
    min-width: 662px;
    // height: 1000px;
    // border: 1px solid red;
    .nav-title {
      color: #000;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .main-right {
    width: 37%;
    height: 470px;
    .relevantFlims-box {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .relevantFlims-item {
        text-align: center;
        margin: 0px 30px 20px 0px;
        img {
          width: 106px;
          height: 145px;
        }
        p {
          width: 106px;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:last-child {
            color: #ffc600;
          }
        }
      }
    }
  }
}
.maker-empot {
  width: 50%;
  min-width: 1000px;
  height: 90px;
  margin: 50px auto;
}
h2 {
  color: #333;
  display: inline-block;
  font-size: 18px;
  line-height: 18px;
  &::before {
    float: left;
    content: "";
    // display: inline-block;
    width: 3px;
    height: 18px;
    background: #ef4238;
    margin-right: 6px;
  }
}
.active {
  background: #ef4238 !important;
}
::v-deep .ant-tabs-nav .ant-tabs-tab-active {
  color: #ef4238;
}
::v-deep .ant-tabs-nav .ant-tabs-tab:hover {
  color: #ef4238;
}
::v-deep .ant-tabs-ink-bar {
  background: #ef4238;
}
::v-deep .ant-spin::selection {
  background: #ef4238;
}
</style>