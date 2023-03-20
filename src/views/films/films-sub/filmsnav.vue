<template>
  <div>
    <div class="films-nav">
      <div class="nav-item">
        <div class="item-style">
          <div class="type-title">类型</div>
          <ul>
            <li
              @click="getNavType(item)"
              v-for="item in navTypeList"
              :key="item.name"
              :class="`${item.typeId}` == navObj.typeId ? 'active' : ''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-item">
        <div class="item-style">
          <div class="type-title">地区</div>
          <ul>
            <li
              @click="getNavRegion(item)"
              v-for="item in navRegionList"
              :key="item.name"
              :class="`${item.typeId}` == navObj.regionId ? 'active' : ''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-item">
        <div class="item-style">
          <div class="type-title">年代</div>
          <ul>
            <li
              @click="getNavEra(item)"
              v-for="item in navEraList"
              :key="item.name"
              :class="`${item.typeId}` == navObj.eraId ? 'active' : ''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "films-nav",
  data() {
    return {
      navTypeList: [],
      navRegionList: [],
      navEraList: [],
      navObj: {
        typeId: "1",
        typeName: "全部",
        regionId: "16",
        regionName: "全部",
        eraId: "27",
        eraName: "全部",
      },
      selectObj: {
        type: "",
        locaton: "",
        year: "",
      },
    };
  },
  created() {
    this.getFilmsnavType();
    this.getFilmsnavRegion();
    this.getFilmsnavEra();
    const type = this.$route.query.type;
    this.navObj.type = type ? type : "";
    this.$emit("getnavtype", this.navObj.type);
  },
  methods: {
    getFilmsnavType() {
      this.$req.getFilmsnavType().then((res) => {
        this.navTypeList = res.data;
      });
    },
    getFilmsnavRegion() {
      this.$req.getFilmsnavRegion().then((res) => {
        this.navRegionList = res.data;
      });
    },
    getFilmsnavEra() {
      this.$req.getFilmsnavEra().then((res) => {
        this.navEraList = res.data;
        this.$emit("show", true);
      });
    },
    getNavType(item) {
      this.navObj.typeId = item.typeId;
      this.navObj.typeName = item.name;
      this.$emit("getnavtype", item.type);
      this.selectObj.type = item.type;
    },
    getNavRegion(item) {
      this.navObj.regionId = item.typeId;
      this.navObj.regionName = item.name;
      this.$emit("getNavRegion", item.location);
    },
    getNavEra(item) {
      this.navObj.eraId = item.typeId;
      this.navObj.eraName = item.name;
      this.$emit("getNavEra", item.year);
    },
  },
};
</script>

<style lang="scss" scoped>
.films-nav {
  width: 80%;
  height: 290px;
  min-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaea;
  .nav-item {
    width: 100%;
    height: 100px;
    &:last-child .item-style {
      border: none;
    }
    .item-style {
      height: 80px;
      display: flex;
      margin: 10px 100px;
      border-bottom: 1px solid #eaeaea;
      .type-title {
        width: 4%;
        color: #666;
        line-height: 64px;
      }
      ul {
        width: 96%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        li {
          // width: 50px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 14px;
          padding: 0px 10px;
          &:hover {
            color: #ef4638;
            cursor: default;
          }
        }
      }
    }
  }
}
.maker-empot {
  height: 500px;
  width: 80%;
  margin: 0 auto;
}
.active {
  background: #ef4638;
  color: #fff !important;
}
</style>