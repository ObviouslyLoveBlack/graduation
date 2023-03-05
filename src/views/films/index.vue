<template>
  <div class="container-style">
    <div v-if="FilmsTypeList.length>0">
      <div class="films-header">
      <ul>
        <li
          @click="onChange(action)"
          v-for="action in FilmsTypeList"
          :key="action.codes"
          :class="`${action.type}` == type ? 'active' : ''"
        >
          {{ action.pathName }}
          <div :class="`${action.type}` == type ? 'triangle' : ''"></div>
        </li>
        <div class="triangle"></div>
      </ul>
      </div>
     <div class="films-main">
      <router-view></router-view>
     </div>
    </div>
    <p class="maker-empot" v-else>
      <a-spin size="large" tip="数据加载中..."/>
    </p>
  </div>
</template>

<script>
export default {
  name: "g-films",
  data() {
    return {
      FilmsTypeList: [],
      triangle: true,
      type: "",
    };
  },
  created() {
    this.getFilmsType();
    const type = this.$route.path.split('/')[2];
    this.type = type || "hot";
  },
  watch: {},

  methods: {
    getFilmsType() {
      this.$req.getFilmsType().then((res) => {
        this.FilmsTypeList = res.data;
      });
    },
    onChange(action) {
      this.type = action.type;
      this.$router.push({
        path: `${action.pathUrl}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-style {
  width: 100%;
  // height: 600px;
  .films-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-image: linear-gradient(
      to right,
      #3e3b31 0%,
      #31322c 30%,
      #39363f 60%,
      #2d2d30 100%
    );
    ul {
      width: 20%;
      margin: 0 auto;
      color: #999;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 16px;
        font-weight: 500;
        position: relative;
        cursor: pointer;
        user-select: none;
        &:hover {
          color: #fff;
        }
        .triangle {
          width: 8px;
          height: 8px;
          border: 8px solid transparent;
          border-bottom: 8px solid #fff;
          position: absolute;
          bottom: 0px;
          right: 25px;
        }
      }
    }
  }
  .maker-empot{
    height: 150px;
    width: 70%;
    margin: 60px auto;
  }
}
.active {
  display: block !important;
  color: #ef4638 !important;
}
</style>