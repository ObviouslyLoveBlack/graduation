<template>
  <div class="films-container">
    <div>
      <filmsnav
        @getnavtype="getnavtype"
        @getNavRegion="getNavRegion"
        @getNavEra="getNavEra"
      />
    </div>
    <div class="films-main">
      <div class="main-wrapper">
        <div
          class="item"
          v-for="item in allFilmsList"
          :key="item.key"
          @mouseover="getHover(item)"
          @mouseleave="getleave()"
        >
          <img :src="item.img" alt="" />
          <p>{{ item.moviename }}</p>
          <p :class="hoverObj ? 'fonSize' : ''">
            {{ item.sum ? item.sum + "人想看" : "点映评分" + item.score }}
          </p>
          <div class="icon" v-if="hoverObj && hoverObj.key == item.key">
            <img :src="hoverObj.img" alt="" />
            <div class="films-info">
              <div class="info-detail">
                <div class="info-name">
                  <p>{{ hoverObj.moviename }}</p>
                  <span>{{ hoverObj.score }}</span>
                </div>
                <p>类型:<span>动作/惊险</span></p>
                <p>主演:<span>维吉尼亚·加德纳/</span></p>
                <p>上映时间:<span>2022-11-18</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <span>抱歉，没有找到相关结果，请尝试用其他条件筛选。</span>
      </div>
    </div>
    <div class="middle" v-if="total > 30">
      <a-pagination
        v-model="current"
        :total="total"
        :pageSize="30"
        @change="change"
      />
    </div>
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
    };
  },
  created() {
    this.getReleaseFilms("all", "all", "all");
  },
  methods: {
    async getReleaseFilms(type, location, year) {
      this.pagination = false;
      this.loading = false;
      const res = await this.$req.getReleaseFilms();
      this.total = res.total;
      if (type === "all" && location === "all" && year === "all") {
        this.allFilmsList = res.data.filter((v) => v.page === this.page);
      } else if (location === "all" && year === "all") {
        this.allFilmsList = res.data.filter(
          (v) =>
            v.type === type || v.othertype === type || v.othertypes === type
        );
        this.total = this.allFilmsList.length;
      } else if (type === "all" && year === "all") {
        this.allFilmsList = res.data.filter(
          (v) => v.location === location || v.location1 === location
        );
        this.total = this.allFilmsList.length;
      } else if (type === "all" && location === "all") {
        this.allFilmsList = res.data.filter((v) => v.year === year);
        this.total = this.allFilmsList.length;
      } else if (type === "all") {
        this.allFilmsList = res.data.filter(
          (v) =>
            (v.location === location || v.location1 === location) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      } else if (location === "all") {
        this.allFilmsList = res.data.filter(
          (v) =>
            (v.type === type ||
              v.othertype === type ||
              v.othertypes === type) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      } else if (year === "all") {
        this.allFilmsList = res.data.filter(
          (v) =>
            (v.location === location || v.location1 === location) &&
            (v.type === type || v.othertype === type || v.othertypes === type)
        );
        this.total = this.allFilmsList.length;
      } else {
        this.allFilmsList = res.data.filter(
          (v) =>
            (v.type === type ||
              v.othertype === type ||
              v.othertypes === type) &&
            (v.location === location || v.location1 === location) &&
            v.year === year
        );
        this.total = this.allFilmsList.length;
      }
      if (this.allFilmsList.length > 30) {
        this.pagination = true;
        this.list = this.allFilmsList;
        this.allFilmsList = this.list.slice(0, 30);
      }
      if (this.allFilmsList.length <= 0) {
        this.loading = true;
      }
    },
    change(page) {
      this.page = page;
      if (this.pagination) {
        this.allFilmsList = this.list.slice((page - 1) * 30, page * 30);
      } else {
        this.$req.getReleaseFilms().then((res) => {
          this.total = res.total;
          this.allFilmsList = res.data.filter((v) => v.page === this.page);
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
.fonSize {
  font-size: 17px;
  color: #ffb401;
}
</style>