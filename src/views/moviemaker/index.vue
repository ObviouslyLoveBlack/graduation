<template>
  <div class="maker-container">
    <div class="maker-header">
      <div class="image">
        <img src="@/assets/image/maker/1.jpg" alt="" />
      </div>
      <div class="maker-info">
        <p>雷佳音</p>
        <p>jiayin Lei</p>
        <p>演员 | 1983-08-29 | 184cm</p>
        <div class="maker-piece">
          <p>代表作</p>
          <div class="piece-image">
            <img src="@/assets/image/热门影评/1.jpg" alt="" />
            <img src="@/assets/image/热门影评/2.jpg" alt="" />
            <img src="@/assets/image/热门影评/3.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "movie-maker",
  data() {
    return {
      targetObj: {},
    };
  },
  created() {
    const { target } = this.$route.query;
    this.targetObj = JSON.parse(decodeURIComponent(target));
    console.log(this.targetObj);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.maker-container {
  width: 100%;
  border: 1px solid #eaeaea;
  background-image: url(@/assets/image/maker.jpg);
  background-repeat: no-repeat;
  background-size: 100% 95%;
  .maker-header {
    width: 80%;
    min-width: 1200px;
    height: 330px;
    margin: 0 auto;
    margin-top: 70px;
    background: pink;
    display: flex;
    .image {
      border: 1px solid #eaeaea;
      img {
        width: 240px;
        height: 330px;
      }
    }
    .maker-piece {
        width: 340px;
      .piece-image {
        display: flex;
        justify-content: space-around;
        img {
          width: 100px;
          height: 150px;
        }
      }
    }
  }
}
</style>