<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return{
      
    }
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 400px;
  background: #fff;
}
*,
body {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
//     "vue": "^2.7.13",
//     "vue-router": "^3.5.4",
//     "vuex": "^3.4.0"
</style>
