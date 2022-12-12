<template>
  <div class="carousel">
    <div class="main-left-icon4">
      <div class="icon4-header">
        <span>{{ hotTvPlayInfo.title }}</span>
        <ul>
          <li
            @click="changeType('domestic')"
            :class="type.domestic ? 'active' : ''"
          >
            国产剧
          </li>
          <li
            @click="changeType('variety')"
            :class="type.variety ? 'active' : ''"
          >
            综艺
          </li>
          <li @click="changeType('UsTv')" :class="type.UsTv ? 'active' : ''">
            美剧
          </li>
          <li
            @click="changeType('KoreanTv')"
            :class="type.KoreanTv ? 'active' : ''"
          >
            韩剧
          </li>
          <li
            @click="changeType('documentary')"
            :class="type.documentary ? 'active' : ''"
          >
            纪录片
          </li>
        </ul>
        <span>全部 ></span>
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
                v-for="item in action.moviceList"
                :key="item.id"
              >
                <img :src="item.img" alt="" />
                <div class="shadow"></div>
                <p>{{ item.update }}</p>
                <span>{{ item.moviename }}</span>
                <i :class="item.score ?'':'isactive'">{{ item.score ? item.score : "暂无评分" }}</i>
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
  name: "g-films",
  data() {
    return {
      hotTvPlayInfo: {}, //热播电视剧
      hotTvPlayList: [],
      type: {
        domestic: true,
        variety: false,
        UsTv: false,
        KoreanTv: false,
        documentary: false,
      },
    };
  },
  created() {
    this.getHotTvPlay("domestic");
  },
  watch: {
    hotTvPlayList: {
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
    getHotTvPlay(type) {
      this.$req.getHotTvPlay().then((res) => {
        this.hotTvPlayInfo = res.data;
        this.hotTvPlayList = this.hotTvPlayInfo[`${type}`];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 744px;
  height: 570px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid red;
  overflow: hidden;
  position: relative;
  img {
    width: 270px;
    height: 382px;
  }
}
.main-left-icon4 {
  width: 100%;
  height: 670px;
  margin-top: 50px;

  .icon4-header {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    span {
      color: #ef4638;
      font-size: 27px;
      &:last-child {
        font-size: 18px;
        padding-top: 12px;
        &:hover {
          color: #37a;
          cursor: default;
        }
      }
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
    height: 540px;
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
        background: url(../../assets/image/猫眼/yin.png);
        position: absolute;
        bottom: 0px;
        left: 0px;
        z-index: 2;
      }
      p {
        color: #fff;
        position: absolute;
        bottom: -9px;
        left: 10px;
        z-index: 3;
      }
      span {
        color: #37a;
        font-size: 15px;
        padding: 10px 0px 0px 8px;
      }
      i {
        color: #e09015;
        font-size: 13px;
        padding: 6px 0px 0px 8px;
      }
    }
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
  background: #37a;
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
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 11px;
  background: #37a;
  color: #fff;
}
:root {
  --swiper-theme-color: #37a;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 2px;
}
.isactive{
  color: #e1e1e1 !important;
}
</style>