<template>
  <div>
    <!-- <button @click="goSwiper">swiper</button> -->
    <div class="home-main" v-if="show">
      <div class="home-main-left">
        <soonSwiper></soonSwiper>
        <div class="main-left-icon1">
          <div class="left-header">
            <span>
              正在热映{{ "(" + `${hotInfo.films.total}` + "部" + ")" }}</span
            >
            <span @click="all('hot')">全部 ></span>
          </div>
          <div class="left-main">
            <div
              class="item"
              v-for="action in hotInfo.films.records"
              :key="action.id"
              @click="filmsDetail(action)"
            >
              <div class="image">
                <img :src="`${action.img}`" alt="" />
                <div class="shadow"></div>
                <span>{{ action.movieName }}</span>
              </div>
              <p>购票</p>
            </div>
          </div>
        </div>
        <div class="main-left-icon2">
          <div class="icon2-header">
            <span>
              即将上映
              {{ "(" + `${releaseInfo.films.total}` + "部" + ")" }}</span
            >
            <span @click="all('release')">全部 ></span>
          </div>
          <div class="icon2-main">
            <div
              class="item"
              v-for="action in releaseInfo.films.records"
              :key="action.id"
              @click="filmsDetail(action)"
            >
              <img :src="action.img" alt="" />
              <div class="shadow"></div>
              <span class="nameBox">{{ action.movieName }}</span>
              <p>{{ action.sum }}人想看</p>
              <div class="want-look">
                <div class="icon">预告片</div>
                <div class="icon">预售</div>
              </div>
              <!-- <p>{{ action.releaseTime }}上映</p> -->
            </div>
          </div>
        </div>
        <classicSwiper></classicSwiper>
        <div class="main-left-icon5">
          <div class="icon5-header">
            <span>最受欢迎影评</span>
            <span @click="moreReview">更多热门影评>></span>
          </div>
          <div class="icon5-main">
            <ul>
              <li v-for="action in hotFilmsReview" :key="action.id">
                <img :src="action.img" alt="" />
                <div class="icon5-title">
                  <span @click="hotspotDetail(action)">
                    {{ action.title }}</span
                  >
                  <p>{{ action.author }} 评论 {{ action.movieName }}</p>
                  <p class="overlow">
                    {{ action.content1 }}
                    <span class="all" @click="hotspotDetail(action)"
                      >(全文)</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home-main-right" v-if="boxOfficeList">
        <div class="main-right-icon1">
          <div class="right-header">
            <span>今日票房</span>
          </div>
          <div class="right-main">
            <div class="icon" @click="filmsDetail(boxOfficeInfo[0])">
              <img :src="boxOfficeInfo[0].img" alt="" />
              <span>{{ boxOfficeInfo[0].movieName }}</span>
              <i>{{ boxOfficeInfo[0].num }}万</i>
            </div>
            <div class="right-main-rank">
              <ul>
                <li
                  class="item"
                  v-for="action in boxOfficeList"
                  :key="action.key"
                  @click="filmsDetail(action)"
                >
                  <div>
                    <p>
                      {{ action.key }} <span>{{ action.movieName }}</span>
                    </p>
                    <i>{{ action.num }}万</i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="main-right-icon2">
          <div class="right-earn">今日收益</div>
          <div class="right-data">
            <p>{{ realData }}<span>万</span></p>
            <p>查看更多<span>></span></p>
          </div>
          <div class="box-office-data">
            <span>北京时间：{{ nowDate }}</span>
            <span>专业版实时票房数据</span>
          </div>
        </div>
        <div class="main-right-icon3">
          <div class="icon3-header">
            <span>最受期待</span>
            <span @click="getcomplete('expect')">查看完整榜单></span>
          </div>
          <div class="icon3-main" @click="filmsDetail(mostexpectInfo[0])">
            <img :src="mostexpectInfo[0].img" alt="" />
            <p>{{ mostexpectInfo[0].movieName }}</p>
            <p>上映时间:{{ mostexpectInfo[0].updateTime }}</p>
            <p>{{ mostexpectInfo[0].num }}想看</p>
          </div>
          <div class="icon3-intrdus">
            <div
              class="icon3-intrdus-item"
              @click="filmsDetail(mostexpectInfo[1])"
            >
              <img :src="mostexpectInfo[1].img" alt="" />
              <div class="intrdus-detail">
                <p>{{ mostexpectInfo[1].movieName }}</p>
                <p>{{ mostexpectInfo[0].num }}想看</p>
              </div>
            </div>
            <div
              class="icon3-intrdus-item"
              @click="filmsDetail(mostexpectInfo[2])"
            >
              <img :src="mostexpectInfo[2].img" alt="" />
              <div class="intrdus-detail">
                <p>{{ mostexpectInfo[2].movieName }}</p>
                <p>{{ mostexpectInfo[0].num }}想看</p>
              </div>
            </div>
          </div>
          <div class="icon3-main-rank">
            <ul>
              <li
                class="item"
                v-for="(action, index) in mostexpectList"
                :key="index"
                @click="filmsDetail(action)"
              >
                <div>
                  <p>
                    {{ index + 4 }}<span>{{ action.movieName }}</span>
                  </p>
                  <i>{{ action.num }}人想看</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-right-icon4">
          <div class="icon4-header">
            <span>TOP 100</span>
            <span @click="getcomplete('tophundred')">查看完整榜单 ></span>
          </div>
          <div class="icon4-image" @click="filmsDetail(TophundredInfo[0])">
            <img :src="TophundredInfo[1].img" alt="" />
            <span>{{ TophundredInfo[0].movieName }}</span>
            <i>{{ TophundredInfo[0].score }}分</i>
          </div>
          <div class="icon4-main-rank">
            <ul>
              <li
                class="item"
                v-for="(action, index) in TophundredList"
                :key="index"
                @click="filmsDetail(action)"
              >
                <div>
                  <p>
                    {{ index + 1 }}<span>{{ action.movieName }}</span>
                  </p>
                  <i>{{ action.score }}分</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="main-right-icon5" v-if="moviemakerInfo.length > 0">
          <div class="icon5-header">
            <span>热门影人</span>
          </div>
          <div class="icon5-image" @click="movieMaker(moviemakerInfo[0])">
            <img :src="moviemakerInfo[0].img" alt="" />
            <span>{{ moviemakerInfo[0].movieName }}</span>
          </div>
          <div class="icon5-main-rank">
            <ul>
              <li
                class="item"
                v-for="(action, index) in moviemakerList"
                :key="index"
              >
                <div>
                  <p @click="movieMaker(action)">
                    {{ index + 2 }}<span>{{ action.movieName }}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <p class="maker-empot" v-else>
      <a-spin size="large" tip="数据加载中..." />
    </p>
  </div>
</template>

<script>
import soonSwiper from "@/views/home/home-sub/soonSwiper";
import classicSwiper from "@/views/home/home-sub/classicSwiper.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    soonSwiper,
    classicSwiper,
  },
  data() {
    return {
      hotInfo: {}, //正在热映
      releaseInfo: {}, //即将上映
      hotFilmsReview: {}, //热门影评
      boxOfficeInfo: null, //今日票房|
      boxOfficeList: [],
      profitInfo: [
        { key: "1", num: 310.7 },
        { key: "2", num: 957.3 },
        { key: "3", num: 1301.6 },
      ], //今日收益
      mostexpectInfo: null, //最受期待
      mostexpectList: [],
      TophundredInfo: null, //TOP100
      TophundredList: [],
      moviemakerInfo: null, //热门影人
      moviemakerList: [],
      nowDate: "",
      nowhour: "",
      swiper: null,
      show: false,
    };
  },
  created() {
    this.getHotMovies();
    this.getsoonRelease();
    // this.getHotPlay();
    this.getFilmReview();
    this.getboxoffice();
    // this.getprofit();
    this.getmostexpect();
    this.getTophundred();
    this.getmoviemaker();
    setInterval(() => {
      this.getnewDate();
    }, 1000);
  },
  computed: {
    realData: function () {
      return this.nowhour < 8
        ? this.profitInfo[0].num
        : this.nowhour < 16
        ? this.profitInfo[1].num
        : this.nowhour < 24
        ? this.profitInfo[2].num
        : "暂无数据";
    },
  },
  methods: {
    goSwiper() {
      this.$router.push("/home/swiper");
    },
    hotspotDetail(action) {
      this.$router.push({
        path: "/films-detail",
        query: {
          newId: action.id,
        },
      });
    },
    all(type) {
      sessionStorage.setItem("path", "/films");
      this.$router.push({
        path: `/films/${type}`,
      });
    },
    getHotMovies() {
      const params = {
        pageSize: 8,
        pageNum: 1,
        films_type: "process",
      };
      this.$req.getHotMovies(params).then((res) => {
        this.hotInfo = res.data;
      });
    },
    getsoonRelease() {
      const params = {
        pageSize: 8,
        pageNum: 1,
        films_type: "soon",
      };
      this.$req.getsoonRelease(params).then((res) => {
        this.releaseInfo = res.data;
      });
    },
    getFilmReview() {
      this.$req.getFilmReview().then((res) => {
        this.hotFilmsReview = res.data;
        // this.show = true
      });
    },
    getboxoffice() {
      this.$req.getboxoffice().then((res) => {
        this.boxOfficeInfo = res.data;
        this.boxOfficeList = res.data.slice(1, 5);
      });
    },
    // getprofit() {
    //   this.$req.getprofit().then((res) => {
    //     this.profitInfo = res.data;
    //   });
    // },
    cancle(){
      this.$message.info('请查看完整榜单...')
    },
    getnewDate() {
      var time = new Date();
      var hour = time.getHours();
      this.nowhour = hour;
      this.nowDate = this.$moment(time).format("HH:mm:ss");
    },
    getmostexpect() {
      this.$req.getmostexpect().then((res) => {
        this.mostexpectInfo = res.data;
        this.mostexpectList = this.mostexpectInfo.slice(3);
      });
    },
    getTophundred() {
      this.$req.getTophundred().then((res) => {
        this.TophundredInfo = res.data;
        this.TophundredList = this.TophundredInfo.slice(1);
      });
    },
    getmoviemaker() {
      this.$req.getmoviemaker().then((res) => {
        this.moviemakerInfo = res.data;
        this.moviemakerList = this.moviemakerInfo.slice(1);
        this.show = true;
      });
    },
    hotDetail(type) {
      sessionStorage.setItem("path", "/films");
      this.$router.push({
        path: "/films/classic",
        query: {
          type,
        },
      });
    },
    moreReview() {
      sessionStorage.setItem("path", "/hotspot");
      this.$router.push({
        path: "/hotspot",
      });
    },
    getcomplete(path) {
      sessionStorage.setItem("path", "/billboard");
      this.$router.push({
        path: `/billboard/${path}`,
      });
    },
    movieMaker(action) {
      this.$router.push({
        path: "/movie/maker",
        query: {
          id: action.id,
        },
      });
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
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  width: 80%;
  min-width: 1200px;
  height: 3180px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  .home-main-left {
    width: 62%;
    .main-left-icon1 {
      width: 100%;
      height: 620px;
      .left-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
          &:nth-child(2) {
            font-size: 18px;
            padding-top: 12px;
            &:hover {
              color: #37a;
              cursor: default;
            }
          }
        }
      }
      .left-main {
        width: 100%;
        height: 620px;
        // background: pink;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 21.5%;
          height: 269px;
          box-sizing: border-box;
          border: 1px solid #efefef;
          .image {
            width: 160px;
            height: 220px;
            position: relative;
            img {
              width: 100%;
            }
            span {
              color: #fff;
              position: absolute;
              bottom: 8px;
              left: 10px;
              z-index: 3;
            }
            .shadow {
              width: 100%;
              height: 36px;
              background: url(../../assets/image/猫眼/yin.png);
              position: absolute;
              bottom: 0px;
              left: 0px;
              z-index: 2;
            }
            i {
              color: #ffb401;
              font-size: 17px;
              position: absolute;
              right: 10px;
              bottom: 6px;
            }
          }
          P {
            width: 160px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #ef4638;
            &:hover {
              background: #ef4638;
              color: #fff;
            }
          }
        }
      }
    }
    .main-left-icon2 {
      width: 100%;
      margin-top: 80px;
      .icon2-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
          &:nth-child(2) {
            font-size: 18px;
            padding-top: 12px;
            &:hover {
              color: #37a;
              cursor: default;
            }
          }
        }
      }
      .icon2-main {
        width: 100%;
        height: 700px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 21.5%;
          height: 290px;
          box-sizing: border-box;
          border: 1px solid #eaeaea;
          position: relative;
          img {
            width: 100%;
          }
          span {
            color: #fff;
            position: absolute;
            bottom: 75px;
            left: 10px;
            z-index: 3;
          }
          .shadow {
            width: 100%;
            height: 36px;
            background: url(../../assets/image/猫眼/yin.png);
            position: absolute;
            bottom: 70px;
            left: 0px;
            z-index: 2;
          }
          p {
            color: #999;
            padding: 10px 0px 10px 10px;
            font-size: 14px;
            &:last-child {
              position: absolute;
              bottom: -55px;
              left: 30px;
            }
          }
          .want-look {
            width: 100%;
            height: 25px;
            display: flex;
            position: absolute;
            bottom: 0px;
            left: 0px;
            // border: 1px solid red;
            .icon {
              width: 50%;
              height: 25px;
              border-right: 1px solid #e1e1e1;
              text-align: center;
              line-height: 25px;
              &:nth-child(2) {
                border-right: none;
                &:hover {
                  background: #ef4638;
                  color: #fff;
                }
              }
            }
          }
          .nameBox {
            user-select: none;
            //  border: 1px solid red;
            display: inline;
            text-align: left;
            width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 3px;
          }
        }
      }
    }
    .main-left-icon5 {
      width: 100%;
      height: 400px;
      // background: #ef4638;
      .icon5-header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e1e1e1;
        span {
          font-size: 16px;
          &:nth-child(2) {
            font-size: 14px;
            color: #37a;
            padding-left: 5px;
            &:hover {
              background: #37a;
              color: #fff;
            }
          }
        }
      }
      .icon5-main {
        width: 100%;
        height: 740px;
        ul {
          li {
            padding-top: 15px;
            height: 180px;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            img {
              height: 135px;
            }
            .icon5-title {
              position: relative;
              span {
                color: #37a;
                font-size: 18px;
                margin-left: 20px;
                &:hover {
                  background: #37a;
                  color: #fff;
                }
              }
              .all {
                // color: red;
                // font-size: 14px;
                // position: absolute;
                // bottom: 0px;
                // right: 0px;
              }
              p {
                color: #666;
                font-size: 13px;
                padding: 10px 0px 0px 20px;
                &:nth-child(3) {
                  color: #111;
                  font-size: 14px;
                  line-height: 24px;
                  padding-top: 0px;
                  span {
                    font-size: 16px;
                  }
                }
              }
              .overlow {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
  .home-main-right {
    width: 32%;
    height: 400px;
    .main-right-icon1 {
      width: 100%;
      height: 465px;
      .right-header {
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
        }
      }
      .right-main {
        .icon {
          width: 100%;
          height: 80px;
          border: 1px solid #efefef;
          box-sizing: border-box;
          position: relative;
          span {
            font-size: 23px;
            position: absolute;
            top: 15px;
            left: 135px;
          }
          i {
            color: #ef4638;
            font-size: 15px;
            position: absolute;
            bottom: 10px;
            left: 135px;
          }
          &:hover {
            background: #e1e1e1;
          }
        }
        .right-main-rank {
          width: 100%;
          height: 305px;
          ul {
            width: 100%;
            height: 305px;
            display: flex;
            flex-direction: column;
            line-height: 61.25px;
            li.item {
              height: 25%;
              div {
                width: 100%;
                height: 55px;
                margin-top: 9px;
                display: flex;
                line-height: 55px;
                justify-content: space-between;
                p {
                  color: #ef4638;
                  font-size: 17px;
                  span {
                    color: #333333;
                    margin-left: 5px;
                  }
                }
                i {
                  color: #ef4638;
                  font-size: 15px;
                  padding-right: 2px;
                }
                &:hover {
                  width: 100%;
                  background: #e1e1e1;
                }
              }
              &:nth-child(3),
              &:nth-child(4) {
                p {
                  color: #999;
                }
              }
            }
          }
        }
      }
    }
    .main-right-icon2 {
      width: 100%;
      height: 130px;
      box-sizing: border-box;
      border: 1px solid #e1e1e1;
      position: relative;
      margin-bottom: 70px;
      .right-earn {
        width: 50px;
        height: 130px;
        background: #ef4638;
        color: #fff;
        font-size: 22px;
        padding: 0px 15px;
        box-sizing: border-box;
      }
      .right-data {
        width: 305px;
        height: 100%;
        display: flex;
        position: absolute;
        top: 37px;
        left: 68px;
        justify-content: space-between;
        p {
          font-size: 29px;
          color: #ef4638;
          span {
            font-size: 15px;
          }
          &:nth-child(2) {
            font-size: 17px;
            margin-top: 10px;
            &:hover {
              color: #37a;
              cursor: default;
            }
          }
        }
      }
      .box-office-data {
        position: absolute;
        bottom: 20px;
        left: 68px;
        span {
          color: #999;
          &:nth-child(2) {
            margin-left: 15px;
          }
        }
      }
    }
    .main-right-icon3 {
      width: 100%;
      // height: 194px;
      .icon3-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
          &:nth-child(2) {
            font-size: 16px;
            padding: 13px 15px 0px 0px;
            &:hover {
              color: #37a;
              cursor: default;
            }
          }
        }
      }
      .icon3-main {
        width: 100%;
        height: 194px;
        border: 1px solid #e1e1e1;
        position: relative;
        margin-bottom: 30px;
        img {
          width: 140px;
          height: 194px;
        }
        p {
          color: #ef4638;
          font-size: 20px;
          position: absolute;
          top: 50px;
          left: 155px;
          &:nth-child(3),
          &:nth-child(4) {
            color: #999;
            font-size: 16px;
            position: absolute;
            top: 80px;
            left: 150px;
          }
          &:nth-child(4) {
            position: absolute;
            top: 105px;
            left: 152px;
            font-size: 15px;
          }
        }
        &:hover {
          background: #e1e1e1;
        }
      }
      .icon3-intrdus {
        width: 100%;
        height: 198px;
        display: flex;
        justify-content: space-between;
        .icon3-intrdus-item {
          width: 180px;
          height: 198px;
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          img {
            width: 100%;
          }
          .intrdus-detail {
            p {
              color: #ef4638;
              font-size: 18px;
              margin-bottom: 0px;
              padding: 10px 0px 0px 10px;
              &:nth-child(2) {
                color: #999;
                font-size: 15px;
                // padding: 8px 0px 0px 10px;
              }
            }
          }
          &:hover {
            background: #e1e1e1;
          }
        }
      }
      .icon3-main-rank {
        width: 100%;
        height: 530px;
        ul {
          width: 100%;
          height: 305px;
          display: flex;
          flex-direction: column;
          line-height: 61.25px;
          li.item {
            height: 25%;
            div {
              width: 100%;
              height: 55px;
              margin-top: 9px;
              display: flex;
              line-height: 55px;
              justify-content: space-between;
              p {
                color: #999;
                font-size: 17px;
                span {
                  color: #333333;
                  margin-left: 14px;
                }
              }
              i {
                color: #ef4638;
                font-size: 15px;
                padding-right: 2px;
              }
              &:hover {
                width: 100%;
                background: #e1e1e1;
              }
            }
            &:nth-child(1),
            &:nth-child(2) {
              p {
                color: #ef4638;
              }
            }
          }
        }
      }
    }
    .main-right-icon4 {
      width: 100%;
      height: 790px;
      .icon4-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
          &:nth-child(2) {
            font-size: 16px;
            padding: 13px 15px 0px 0px;
            &:hover {
              color: #37a;
              cursor: default;
            }
          }
        }
      }
      .icon4-image {
        width: 100%;
        height: 80px;
        border: 1px solid #e1e1e1;
        position: relative;
        span {
          font-size: 23px;
          position: absolute;
          top: 15px;
          left: 135px;
        }
        i {
          color: #999;
          font-size: 15px;
          position: absolute;
          bottom: 10px;
          left: 135px;
        }
        &:hover {
          background: #e1e1e1;
        }
      }
      .icon4-main-rank {
        width: 100%;
        height: 550px;
        ul {
          width: 100%;
          height: 305px;
          display: flex;
          flex-direction: column;
          line-height: 61.25px;
          li.item {
            height: 25%;
            div {
              width: 100%;
              height: 55px;
              margin-top: 9px;
              display: flex;
              line-height: 55px;
              justify-content: space-between;
              p {
                color: #999;
                font-size: 17px;
                span {
                  color: #333333;
                  margin-left: 14px;
                }
              }
              i {
                color: #ef4638;
                font-size: 15px;
                padding-right: 2px;
              }
              &:hover {
                width: 100%;
                background: #e1e1e1;
              }
            }
            &:nth-child(1),
            &:nth-child(2) {
              p {
                color: #ef4638;
              }
            }
          }
        }
      }
    }
    .main-right-icon5 {
      width: 100%;
      height: 790px;
      .icon5-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          color: #ef4638;
          font-size: 27px;
          &:nth-child(2) {
            font-size: 16px;
            padding: 13px 15px 0px 0px;
          }
        }
      }
      .icon5-image {
        width: 100%;
        height: 72px;
        border: 1px solid #e1e1e1;
        position: relative;
        span {
          font-size: 23px;
          position: absolute;
          top: 15px;
          left: 135px;
        }
        i {
          color: #999;
          font-size: 15px;
          position: absolute;
          bottom: 10px;
          left: 135px;
        }
        &:hover {
          background: #e1e1e1;
        }
      }
      .icon5-main-rank {
        width: 100%;
        height: 550px;
        ul {
          width: 100%;
          height: 305px;
          display: flex;
          flex-direction: column;
          line-height: 61.25px;
          li.item {
            height: 25%;
            div {
              width: 100%;
              height: 55px;
              margin-top: 9px;
              display: flex;
              line-height: 55px;
              justify-content: space-between;
              p {
                color: #999;
                font-size: 17px;
                cursor: pointer;
                span {
                  color: #333333;
                  margin-left: 14px;
                  &:hover {
                    color: #ef4638;
                  }
                }
              }
            }
            &:nth-child(1),
            &:nth-child(2) {
              p {
                color: #ef4638;
              }
            }
          }
        }
      }
    }
  }
}
.maker-empot {
  height: 500px;
  width: 70%;
  margin: 60px auto;
}
.active {
  color: #ef4638 !important;
}
.isactive {
  color: #e1e1e1 !important;
}
.swiper {
  width: 744px;
  height: 570px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // border: 1px solid red;
  overflow: hidden;
  position: relative;
  img {
    width: 270px;
    height: 382px;
  }
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  font-size: 10px;
  position: absolute;
  bottom: -262px;
  right: 294px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  background: #6d98d2;
  color: #fff;
  font-weight: 900;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  font-size: 11px;
  font-weight: 800;
  position: absolute;
  bottom: -262px;
  left: 294px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  background: #6d98d2;
  color: #fff;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 2px;
  --swiper-theme-color: #6d98d7;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  background: #6d98d7 !important;
}
</style>