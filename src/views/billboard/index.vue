<template>
  <div class="container-style">
    <div class="billboard-header">
      <ul>
        <li
          @click="onChange(action)"
          v-for="action in boardTypeList"
          :key="action.code"
          :class="`${action.type}` == type ? 'active' : ''"
        >
          {{ action.name }}
          <div :class="`${action.type}` == type ? 'triangle' : ''"></div>
        </li>
        <div class="triangle"></div>
      </ul>
    </div>
    <div class="billboard-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-billboard",
  data(){
    return{
      boardTypeList:[],
      type: '',
    }
  },
  created(){
   this.getboardType()
    const type = this.$route.path.split('/')[2];
    this.type = type || 'praise'
  },
  methods:{
   getboardType(){
    this.$req.getboardType().then(res=>{
      this.boardTypeList = res.data
    })
   },
    onChange(action) {
      this.type = action.type;
      this.$router.push({
        path:`${action.path}`
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.container-style {
  width: 100%;
  .billboard-header {
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
      width: 30%;
      margin: 0 auto;
      color: #999;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 16px;
        font-weight: 500;
        position: relative;
        // border: 1px solid #ef4638;
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
}
.active {
  display: block !important;
  color: #ef4638 !important;
}
</style>