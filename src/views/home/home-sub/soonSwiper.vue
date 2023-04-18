<template>
  <div class="container">
    <div class="main-left-icon4" v-if="hotTvPlayList">
      <div class="icon4-header">
        <span>最近热门电影</span>
      </div>
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(action, index) in hotTvPlayList"
            :key="index"
          >
            <div class="icon4-main">
              <div
                class="item"
                v-for="(item, index) in action.moviceList"
                :key="index"
                @click="getFilmsDeatil(item)"
              >
                <img :src="item.img" alt="" />
                <div class="shadow"></div>
                <p>{{ item.upDate }}</p>
                <p class="nameBox">{{ item.movieName }}</p>
                <i :class="item.score ? '' : 'isactive'">{{
                  item.score ? item.score : "暂无评分"
                }}</i>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "swiper-w",
  data() {
    return {
      hotTvPlayInfo: null, //热播电视剧
      hotTvPlayList: [
        { key: 1, moviceList: [] },
        { key: 2, moviceList: [] },
        { key: 3, moviceList: [] },
        { key: 4, moviceList: [] },
        { key: 5, moviceList: [] },
      ],
      type: {
        domestic: true,
        variety: false,
        UsTv: false,
        KoreanTv: false,
        documentary: false,
      },
      SwiperData: [],
    };
  },
  created() {
    this.getHotTvPlay();
  },
  watch: {
    SwiperData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // direction: "horizontal", // 垂直切换选项
            // autoplay: true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
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
    changeType(type) {
      this.SwiperData = [];
      this.getHotTvPlay(type);
      this.type = {
        domestic: false,
        variety: false,
        UsTv: false,
        KoreanTv: false,
        documentary: false,
      };
      this.type[`${type}`] = true;
    },
    getHotTvPlay() {
      this.$req.getAllfilmsNotType().then((res) => {
        this.SwiperData = res.data;
        this.hotTvPlayChange(this.SwiperData);
      });
    },
    hotTvPlayChange(data) {
      const tar1 = data.slice(0, 8);
      const tar2 = data.slice(8, 16);
      const tar3 = data.slice(16, 24);
      const tar4 = data.slice(-8);
      const tar5 = data.slice(24,32);
      tar1.forEach((v) => {
        this.hotTvPlayList[0].moviceList.push(v);
      });
      tar2.forEach((v) => {
        this.hotTvPlayList[1].moviceList.push(v);
      });
      tar3.forEach((v) => {
        this.hotTvPlayList[2].moviceList.push(v);
      });
      tar4.forEach((v) => {
        this.hotTvPlayList[3].moviceList.push(v);
      });
       tar5.forEach((v) => {
        this.hotTvPlayList[4].moviceList.push(v);
      });
    },
    getFilmsDeatil(action) {
      //  let url = this.$router.resolve({
      //     path: "/movie/flims/detail",
      //     query: {
      //       id: action.id,
      //     },
      //   });
      //   window.open(url.href, "_blank");
       this.$router.push({
        path: "/movie/flims/detail",
        query: {
          id: action.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // width: 70%;
  // margin: 100px auto;
  .main-left-icon4 {
    width: 100%;
    height: 670px;
    // margin-top: 50px;
    .icon4-header {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      span {
        color: #ef4638;
        font-size: 27px;
        // &:last-child {
        //   font-size: 18px;
        //   padding-top: 12px;
        //   &:hover {
        //     color: #37a;
        //     cursor: default;
        //   }
        // }
      }
      ul {
        width: 240px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 13px;
        left: 155px;
        li {
          color: #999;
          &:hover {
            color: #ef4638;
            cursor: default;
          }
        }
      }
    }
    .icon4-main {
      height: 560px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 160px;
        height: 230px;
        position: relative;
        text-align: center;
        img {
          width: 160px;
          height: 230px;
          object-fit: cover;
        }
        .shadow {
          width: 100%;
          height: 36px;
          background: url(@/assets/image/猫眼/yin.png);
          position: absolute;
          bottom: 0px;
          left: 0px;
          z-index: 2;
        }
        p {
          color: #fff;
          position: absolute;
          bottom: 0px;
          left: 10px;
          z-index: 3;
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
        i {
          color: #e09015;
          font-size: 13px;
          padding: 6px 0px 0px 8px;
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
.swiper-container {
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