<template>
  <div>
    <div class="films-container" v-show="isShow">
      <div>
        <filmsnav
          @getnavtype="getnavtype"
          @getNavRegion="getNavRegion"
          @getNavEra="getNavEra"
          @show="show"
        />
      </div>
      <div class="films-main">
        <div class="main-wrapper" v-if="!loading">
          <div
            class="item"
            v-for="item in allFilmsList"
            :key="item.key"
            @mouseover="getHover(item)"
            @mouseleave="getleave()"
            @click="filmsDetail(item)"
          >
            <img :src="item.img" alt="" />
            <p>{{ item.movieName }}</p>
            <p :class="hoverObj ? 'fonSize' : ''">
              {{ item.sum ? item.sum + "人想看" : "点映评分" + item.score }}
            </p>
            <div class="icon" v-if="hoverObj && hoverObj.id == item.id">
              <img :src="hoverObj.img" alt="" />
              <div class="films-info">
                <div class="info-detail">
                  <div class="info-name">
                    <p>{{ hoverObj.movieName }}</p>
                    <span>{{ hoverObj.score }}</span>
                  </div>
                  <p>类型:<span>{{ hoverObj.type }}</span></p>
                  <p>主演:<span>{{ hoverObj.act }}</span></p>
                  <p>上映时间:<span>{{ hoverObj.dateTime }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <span>抱歉，没有找到相关结果，请尝试用其他条件筛选。</span>
        </div>
      </div>
      <div class="middle" v-if="total > 10">
        <a-pagination
          v-model="current"
          :total="total"
          :pageSize="18"
          @change="change"
        />
      </div>
    </div>
    <p class="maker-empot" v-if="!isShow">
      <a-spin size="large" tip="数据加载中..." />
    </p>
  </div>
</template>

<script>
import filmsnav from "./filmsnav.vue";
export default {
  name: "releaseFilms",
  components: {
    filmsnav,
  },
  data() {
    return {
      loading: false,
      allFilmsList: [],
      list: [],
      hoverObj: null,
      type: "all",
      location: "all",
      year: "all",
      total: "",
      current: 1,
      page: 1,
      pagination: false,
      isShow: false,
    };
  },
  created() {
    this.getReleaseFilms("all", "all", "all");
  },
  methods: {
    show(type) {
      this.isShow = type;
    },
    async getReleaseFilms(type, location, year) {
      this.pagination = false;
      this.loading = false;
      const params = {
        pageSize: 10,
        pageNum: 1,
        films_type: "classics",
      };
      const { data: res1 } = await this.$req.getAllfilms(params);
      const res = res1.films.records;
      this.total = res.total;
       if (type == "all" && location == "all" && year == "all") {
        this.allFilmsList = res;
      } else if (location == "all" && year == "all") {
        this.allFilmsList = res.filter((v) => v.type === type);
      } else if (type == "all" && year == "all") {
        this.allFilmsList = res.filter((v) => v.location === location);
      } else if (type == "all" && location == "all") {
        this.allFilmsList = res.filter((v) => v.year === year);
      } else if (type ==="all") {
        this.allFilmsList = res.filter(
          (v) => v.location === location && v.year === year
        );
      } else if (location == "all") {
        this.allFilmsList = res.filter(
          (v) => v.type === type && v.year === year
        );
        this.total = this.allFilmsList.length;
      } else if (year == "all") {
        this.allFilmsList = res.filter(
          (v) => v.location === location && v.type === type
        );
      } else {
        this.allFilmsList = res.filter(
          (v) => v.type === type && v.location === location && v.year === year
        );
      }
      console.log(this.allFilmsList);
      if(this.allFilmsList.length<=0) {
        this.loading = true
      }
    },
    change(page) {
      this.page = page;
      if (this.pagination) {
        this.allFilmsList = this.list.slice((page - 1) * 30, page * 30);
      } else {
        this.$req.getReleaseFilms().then((res) => {
          this.total = res.total;
          this.allFilmsList = res.filter((v) => v.page === this.page);
        });
      }
    },
    getnavtype(type) {
      this.type = type;
      this.getReleaseFilms(type, this.location, this.year);
    },
    getNavRegion(location) {
      this.location = location;
      this.getReleaseFilms(this.type, location, this.year);
    },
    getNavEra(year) {
      this.year = year;
      this.getReleaseFilms(this.type, this.location, year);
    },
    getHover(item) {
      this.hoverObj = item;
    },
    getleave() {
      this.hoverObj = null;
    },
    filmsDetail(action) {
      let url = this.$router.resolve({
        path: "/movie/flims/detail",
        query: {
          name: encodeURIComponent(JSON.stringify(action.moviename)),
        },
      });
      window.open(url.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.films-container {
  width: 80%;
  min-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
  .films-nav {
    width: 80%;
    height: 290px;
    min-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid #eaeaea;
  }
  .films-main {
    width: 80%;
    min-width: 1200px;
    margin: 0 auto;
    margin-top: 60px;
    .main-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 200px;
        height: 290px;
        text-align: center;
        padding: 0px 20px;
        position: relative;
        img {
          width: 160px;
          height: 220px;
        }
        p {
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0px;
          margin-top: 4px;
          font-size: 16px;
          text-align: center;
          &:last-child {
            color: #ffb401;
            font-size: 17px;
          }
        }
        .icon {
          width: 200px;
          height: 250px;
          border: 1px solid #eaeaea;
          position: absolute;
          top: 0px;
          left: 0px;
          img {
            width: 100%;
            height: 100%;
          }
          .films-info {
            width: 100%;
            height: 52%;
            background: #fff;
            position: absolute;
            left: 0px;
            bottom: 0px;
            .info-detail {
              margin: 0px 10px;
              .info-name {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0px;
                p {
                  color: #000;
                  margin-top: 9px;
                  font-size: 22px;
                }
                span {
                  color: #ffb401;
                  font-size: 22px;
                  margin-top: 8px;
                }
              }
              p {
                text-align: left;
                width: 170px;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 3px;
                span {
                  color: #999;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
  .middle {
    margin: 30px auto;
  }
}
.maker-empot {
  height: 470px;
  width: 70%;
  margin: 50px auto;
}
.fonSize {
  font-size: 17px;
  color: #ffb401;
}
</style>