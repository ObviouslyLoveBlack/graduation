<template>
  <div>
    <div class="home-header">
    <Header/>
    </div>
    <div class="home-main">
      <router-view></router-view>
    </div>
    <div class="home-footer" v-if="!$route.meta.isFooter">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "@/layout/header.vue";
import Footer from "@/layout/footer.vue";
export default {
 // eslint-disable-next-line vue/multi-word-component-names
 name:'layout',
 components:{
  Header,
  Footer
 },
 data(){
  return{
    isFooter:''
  }
 },
 created(){
 }
}
</script>

<style lang="scss">
// .home-header {
//   width: 100%;
//   height: 70px;
//   min-width: 1200px;
//   border: 1px solid #efefef;
//   display: flex;
//   margin-bottom: 40px;
// }
.home-main {
  margin-top: 70px;
}
// .home-footer {
//   width: 100%;
//   background: #000;
//   height: 28.5rem;
// }
</style>