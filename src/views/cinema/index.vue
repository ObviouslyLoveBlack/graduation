<template>
  <div class="cinema-container">
     <div class="cinema-header">
      <ul>
        <li @click="navDetail('office')" :class="isActive ==='office' ? 'active' :''">
          票房
          <div v-if="isActive ==='office'" class="triangle"></div>
        </li>
        <li @click="navDetail('aggregate')" :class="isActive ==='aggregate' ? 'active' :''">
          综合数据
          <div v-if="isActive ==='aggregate'" class="triangle"></div>
        </li>
        <li @click="navDetail('arrangement')" :class="isActive ==='arrangement' ? 'active' :''">
          排片
          <div v-if="isActive ==='arrangement'" class="triangle"></div>
        </li>
      </ul>
     </div>
     <div class="cinema-nav">
      <router-view></router-view>
     </div>
  </div>
</template>

<script>
export default {
  name: "g-cinema",
  data(){
    return{
      isActive:'aggregate'
    }
  },
  created() {
    this.isActive = String(this.$route.path.split('/')[2])
  },
  mounted() {
  },
  methods: {
   navDetail(path){
    this.isActive = `${path}`
    this.$router.push({
      path:`/cinema/${path}`
    })
   }
  },
};
</script>

<style lang="scss" scoped>
.cinema-container {
  min-width: 1200px;
  margin: 0px auto;
  .cinema-header{
    width: 100%;
    background-image: linear-gradient(to right, #3e3b31 0%, #31322c 30%, #39363f 60%, #2d2d30 100%);;
    ul{
      width: 40%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      li{
        padding: 15px 20px;
        color: #999;
        font-size: 20px;
        cursor: default;
        position: relative;
        &:hover{
          color: #fff;
        }
         .triangle {
          width: 8px;
          height: 8px;
          border: 8px solid transparent;
          border-bottom: 8px solid #fff;
          position: absolute;
          bottom: 0px;
          right: 40%;
        }
      }
    }
  }
  .cinema-nav{
    width: 100%;
  }
}
.active{
  color: #ef3438 !important;
}
</style>