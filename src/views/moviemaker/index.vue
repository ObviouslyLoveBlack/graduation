<template>
  <div>
    <div v-if="loading">
      <div class="maker-container" v-if="targetObj">
        <div class="maker-header">
          <div class="image">
            <img :src="targetObj.portrait" alt="" />
          </div>
          <div class="maker-info">
            <p class="info-name">{{ targetObj.name }}</p>
            <p class="info-name">{{ targetObj.endName }}</p>
            <p>{{ targetObj.profession }}</p>
            <div
              class="symbol-worker"
              :class="attention ? 'active' : ''"
              @click="getattention"
            >
              <a-icon type="plus" />
              关注
            </div>
            <div class="maker-piece">
              <p>代表作</p>
              <div class="piece-image">
                <img
                  :src="action.img"
                  alt=""
                  v-for="action in makerFilms"
                  :key="action.id"
                />
              </div>
            </div>
          </div>
          <div class="films-info">
            <p>粉丝</p>
            <span class="fans">{{ targetObj.fans }}</span>
            <p>累计票房</p>
            <span class="box-office">{{ targetObj.accumulate }}</span> 亿
          </div>
        </div>
      </div>
      <div class="main" v-if="targetObj">
        <div class="main-left-introduce">
          <p class="nav-title">故之电影 > 电影 > {{ targetObj.name }}</p>
          <div class="introduce">
            <h2>介绍</h2>
            <div class="introduce-text" :class="openAll ? 'over-hidden' : ''">
              {{ targetObj.introduce }}
              <div class="introduce-table">
                <div
                  class="table-item"
                  v-for="(action, index) in makerTable"
                  :key="index"
                >
                  <div class="table-item-td">
                    <p>{{ action.title }}</p>
                    <span>{{ action.content }}</span>
                  </div>
                  <div class="table-item-td">
                    <p>{{ action.title2 }}</p>
                    <span>{{ action.content2 }}</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="open-all-detail" @click="open">
              <span v-if="openAll">展开详细资料</span>
              <span v-else>收起</span>
              <a-icon type="up" v-if="openAll" />
              <a-icon type="down" v-else />
            </p>
          </div>
          <div class="images">
            <h2>图片</h2>
            <div class="images-item-box">
              <div
                class="images-item"
                v-for="(action, index) in makerImages"
                :key="index"
              >
                <img :src="action.img" alt="" />
              </div>
            </div>
          </div>
          <div class="awards">
            <h2>获奖</h2>
            <div class="awards-box">
              <div>
                <div class="swiper-container" ref="mySwiper">
                  <div class="swiper-wrapper"
                   @mouseenter="mouseenter()"
                   @mouseleave="mouseleave()">
                    <div
                      class="swiper-slide"
                      v-for="(action, index) in finAward"
                      :key="index"
                    >
                      <div class="worker-item-box">
                        <div
                          class="worker-item"
                          v-for="item in action.awards"
                          :key="item.id"
                          @mouseenter="getawardsDetail(item)"
                        >
                          <img :src="item.img" alt="" />
                          <p>{{ item.name }}</p>
                          <p>提名1次</p>
                          <div v-if="location === item.id" class="triangle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-pagination"></div>
                  <div v-show="ispagina" @click="change('prev')" class="swiper-button-prev"></div>
                  <div v-show="ispagina" @click="change('next')" class="swiper-button-next"></div>
                </div>
              </div>

              <div class="worker-awards-detail">
                <div
                  class="awards-detail-item"
                  v-for="(action, index) in awardsList"
                  :key="index"
                >
                  <span>{{ action.title }}</span>
                  <span>{{ action.filmsName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-right">
          <div class="relevantWorker">
            <h2>相关影人</h2>
            <div class="wokers">
              <div
                class="workers-item"
                v-for="(action, index) in makerConcatct"
                :key="index"
                @click="relevantDetail(action)"
              >
                <div class="item-image">
                  <img :src="action.img" alt="" />
                </div>
                <span>{{ action.name }}</span>
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
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "movie-maker",
  data() {
    return {
      ispagina: false,
      targetObj: {},
      makerFilms: [],
      makerImages: [],
      makerAward: [],
      finAward: [
        { key: 1, awards: [] },
        { key: 2, awards: [] },
      ],
      makerConcatct: [],
      makerTable: [],
      loading: false,
      id: "",
      attention: false, //判断是否点击关注
      openAll: true,
      bannerList: [], // 获奖类型
      awardsList: [], //详细获奖情况
      location: 1, //底部红三角的显示位置
    };
  },
  created() {
    const { id } = this.$route.query;
    this.getDetailById(id);
  },
  watch: {
    makerAward: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            pagination: {
              // el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerView: 1,
          });
        });
      },
    },
  },
  methods: {
    async getDetailById(id) {
      const res = await this.$req.getmakerById(id);
      this.targetObj = res.data.maker;
      document.title = "热门影人--" + this.targetObj.name;
      this.makerFilms = res.data.makerFilmsurl;
      this.makerImages = res.data.makerImages;
      this.makerAward = res.data.makerAward;
      this.makerConcatct = res.data.makerConcatcturl;
      this.makerTable = res.data.makerTable;
      this.loading = true;
      this.AwardData(this.makerAward);
      // this.bannerDetail()
    },
    AwardData(data) {
      const tar1 = data.slice(0, 5);
      const tar2 = data.slice(-5);
      tar1.forEach((e) => {
        this.finAward[0].awards.push(e);
      });
      tar2.forEach((e) => {
        this.finAward[1].awards.push(e);
      });
      this.getawardsDetail(this.finAward[0].awards[0]);
    },
    bannerDetail() {
      this.bannerList = this.targetObj.detailData;
      this.awardsList = this.bannerList[0].award[0].nominate;
    },
    open() {
      this.openAll = !this.openAll;
    },
    mouseenter() {
      this.ispagina = true;
    },
    mouseleave() {
      this.ispagina = false;
    },
    async getawardsDetail(action) {
      this.location = action.id;
      const res = await this.$req.makerAwardById(action.id);
      this.awardsList = res.data;
    },
    change(type) {
      this.location = type ==='prev' ? 1 :6
    },
    relevantDetail(action) {
      let routerUrl = this.$router.resolve({
        path: "/movie/maker",
        query: {
          id: action.id,
        },
      });
      window.open(routerUrl.href, "_blank");
    },
    getattention() {
      this.attention = !this.attention;
      this.attention ? (this.targetObj.fans += 1) : (this.targetObj.fans -= 1);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0px;
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
        margin-bottom: 0px;
        // border: 1px solid red;
      }
      .info-name {
        margin-top: -8px;
        font-size: 25px;
        font-weight: 500;
      }
      .symbol-worker {
        padding: 5px 20px;
        background: hsla(0, 0%, 100%, 0.2);
        color: white;
        position: absolute;
        font-size: 18px;
        top: 0px;
        right: 0px;
        cursor: pointer;
      }
      .maker-piece {
        width: 340px;
        p {
          margin: 20px 0px 10px 0px;
        }
        .piece-image {
          display: flex;
          justify-content: space-between;
          img {
            width: 100px;
            height: 150px;
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
  .main-left-introduce {
    width: 55%;
    min-width: 662px;
    .nav-title {
      color: #000;
      font-size: 16px;
      margin-bottom: 40px;
    }
    .introduce {
      .introduce-text {
        margin-top: 20px;
        line-height: 27px;
        .introduce-table {
          margin-top: 14px;
          .table-item {
            display: flex;
            justify-content: space-between;
            padding: 6px 0px;
            border-bottom: 1px solid #eaeaea;
            .table-item-td {
              width: 50%;
              display: flex;
              // background: #999;
              // border: 1px solid red;
              p {
                width: 30%;
                color: #999;
              }
              span {
                width: 70%;
                color: #000;
              }
            }
          }
        }
      }
      .open-all-detail {
        margin-top: 30px;
        text-align: center;
        color: #ef4238;
        font-size: 17px;
        cursor: pointer;
        span {
          margin-right: 4px;
          font-size: 14px;
        }
      }
    }
    .images {
      margin-top: 50px;
      .images-item-box {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        .images-item {
          img {
            width: 120px;
            height: 170px;
          }
        }
      }
    }
    .awards {
      margin-top: 50px;
      .awards-box {
        margin-top: 20px;
        .swiper-container {
          .worker-item-box {
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 15px;
            border-bottom: 1px solid #ef4238;
            .worker-item {
              text-align: center;
              font-size: 13px;
              margin-right: 20px;
              position: relative;
              &:last-child {
                margin-right: 0px;
              }
              .triangle {
                width: 6px;
                height: 6px;
                border: 6px solid transparent;
                border-bottom: 6px solid red;
                position: absolute;
                bottom: -15px;
                left: 44%;
              }
              img {
                width: 116px;
                height: 130px;
              }
            }
          }
        }
        .worker-awards-detail {
          .awards-detail-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px;
            background: #fbfbfb;
            border-bottom: 1px solid #eaeaea;
          }
        }
      }
    }
  }
  .main-right {
    width: 40%;
    height: 400px;
    .relevantWorker {
      .wokers {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        align-items: center;
        .workers-item {
          text-align: center;
          margin: 0px 30px 20px 0px;
          .item-image {
            width: 106px;
            height: 106px;
            border: 1px solid #000;
            border-radius: 50%;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          span {
            cursor: default;
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
.over-hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
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

.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  font-size: 25px;
  color: #fff;
  background: rgb(195, 193, 193);
  padding: 10px 5px;
  position: absolute;
  top: -20px;
  right: -10px;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  font-size: 25px;
  color: #fff;
  background: rgb(195, 193, 193);
  padding: 10px 5px;
  position: absolute;
  top: -20px;
  left: -10px;
}
.active {
  background: #ef4238 !important;
}
</style>