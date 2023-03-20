<template>
  <div>
    <div class="atlas-box">
      <div class="atlas-item" v-for="(action,index) in atlasurls" :key="index">
        <img :src="action.img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'atlas-1',
  props:['atlasurls'],
  created(){
  }
}
</script>

<style lang="scss" scoped>
.atlas-box{
  display: flex;
  flex-wrap: wrap;
  .atlas-item{
    margin:0px 14px 20px 0px;
    img{
      width: 104px;
      height: 104px;
    }
    &:nth-child(6n){
      margin-right: 0px;
    }
  }
}
</style>