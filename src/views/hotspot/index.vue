<template>
  <div class="hotspot-container">
    <div class="header-top">
      故之最受欢迎的影评
    </div>
    <a-tabs @change="callback">
      <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
      </a-tab-pane>
    </a-tabs>
    <component
      ref="current"
      :is="current"
    />
  </div>
</template>

<script>
import filmsreview from "./filmsreview.vue";
import newfilmsreview from "./newfilmsreview.vue";
export default {
  name: "hot-post",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    filmsreview,
    // eslint-disable-next-line vue/no-unused-components
    newfilmsreview,
  },
  data() {
    return {
      tabList: [
        {key: "filmsreview",tab: "最受欢迎的",},
        {key: "newfilmsreview",tab: "新片评论",},
      ],
      current:'filmsreview'
    };
  },
  methods: {
    callback(key) {
      this.current = key
    },
  },
};
</script>

<style lang="scss" scoped>
.hotspot-container {
  width: 80%;
  min-width: 1200px;
  margin: 0 auto;
  margin-top: 100px;
  .header-top{
    text-align: left;
    font-size: 20px;
    margin:0px 0px 20px 17px;
    color: #ef4238;
  }
}
::v-deep .ant-tabs-nav .ant-tabs-tab-active{
  color: #ef4238;
}
::v-deep .ant-tabs-nav .ant-tabs-tab:hover{
  color: #ef4238;
}
::v-deep .ant-tabs-ink-bar{
  background: #ef4238;
}

</style>