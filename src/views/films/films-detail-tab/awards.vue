<template>
  <div>
    <div class="awards-item" v-for="(action,index) in awards" :key="index">
      <div class="awards-title">
       <div style="border:1px solid #eaeaea">
        <img :src="action.img" alt="">
       </div>
       <p>{{action.title}}</p>
      </div>
      <p class="awards-content">{{action.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'awards-1',
  props:['awards']
}
</script>

<style lang="scss" scoped>
.awards-title{
  display: flex;
  align-items: center;
  p{
    margin-left: 20px;
    color: #000;
    font-size: 18px;
  }
}
.awards-content{
  color: #000;
  margin-top: 20px;
  font-size: 15px;
}
</style>