<template>
  <div class="container">
    <div class="main-header">
      <span>热门推荐 >></span>
    </div>
    <div class="main-box">
      <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(action, index) in SwiperData"
            :key="index"
            @click="filmsDetail(action)"
          >
            <div class="main-image">
              <img :src="action.img" alt="" />
            </div>
            <div class="main-info">
              <p>{{ action.movieName }}</p>
              <p>{{ action.longTime }}</p>
              <p>{{ action.otherType }}</p>
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
  data() {
    return {
      hotPlayInfo: {}, //热播电影
      SwiperData: [],
    };
  },
  created() {
    this.getHotPlay();
  },
  watch: {
    SwiperData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // direction: "horizontal", // 垂直切换选项
            autoplay: true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              //   el: ".swiper-pagination",
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
    filmsDetail(action) {
        let url = this.$router.resolve({
          path: "/movie/flims/detail",
          query: {
            id: action.id,
          },
        });
        window.open(url.href, "_blank");
    },
    getHotPlay() {
      const params = {
        pageSize: 5,
        pageNum: 1,
        films_type: "classics",
      };
      this.$req.getsoonRelease(params).then((res) => {
        this.SwiperData = res.data.films.records;
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // width: 50%;
  // margin: 100px auto;
  margin-bottom: 40px;
  .main-header {
    margin-bottom: 15px;
    span {
      cursor: pointer;
      font-size: 20px;
      color: #37a;
      &:hover {
        color: white;
        background: #37a;
      }
    }
  }
  .main-box {
    // border: 1px solid red;
    .swiper-container .swiper-wrapper .swiper-slide {
      display: flex;
      .main-info {
        padding: 30px;
        p {
          margin-bottom: 10px;
          color: #37a;
          &:first-child {
            font-size: 20px;
          }
        }
      }
    }
  }
}
.swiper-container {
  border: 1px solid #eaeaea;
  //   height: 260px;
  img {
    width: 360px;
    height: 240px;
  }
}
.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  position: absolute;
  bottom: -95px;
  right: -7px;
  font-size: 11px;
  background: #6d98d2;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
}
.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  font-size: 11px;
  font-weight: 800;
  position: absolute;
  bottom: -95px;
  left: 690px;
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