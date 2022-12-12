<template>
  <div>登录
     <a-button @click="goback">返回</a-button>
  </div>
 
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
 name:'login',
 created(){
  console.log(this.$route);
 },
 methods:{
  goback(){
    this.$router.back()
  }
 }
}
</script>

<style>

</style>