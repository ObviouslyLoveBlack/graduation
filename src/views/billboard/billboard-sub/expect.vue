<template>
  <div class="board-main">
    <div class="main-header">
      <div class="middle">
        <p>2022-12-29<span v-if="hour > 10">已更新</span></p>
        <p>
          榜单规则：将昨日国内待映影片，按照之前30天的想看数总量从高到低排列取前50名，每天上午10点更新。相关数据来源于“故之电影库”。
        </p>
      </div>
      <div class="main-wrapper">
        <div class="item">
          <img src="@/assets/image/films/即将上映/4.jpg" alt="" />
          <div class="introduce-wrapper">
            <div class="introduce">
              <div class="title">
                <p>放牛班的春天</p>
                <p>主演：热拉尔·朱诺,弗朗西斯·贝尔兰德,凯德·麦拉德</p>
                <p>上映时间：2004-10-16</p>
              </div>
              <div class="score">
                <p>本月新增想看：<span>217321</span>人</p>
                <i>总想看：789782人</i>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/image/films/即将上映/5.jpg" alt="" />
          <div class="introduce-wrapper">
            <div class="introduce">
              <div class="title">
                <p>放牛班的春天</p>
                <p>主演：热拉尔·朱诺,弗朗西斯·贝尔兰德,凯德·麦拉德</p>
                <p>上映时间：2004-10-16</p>
              </div>
             <div class="score">
                <p>本月新增想看：<span>217321</span>人</p>
                <i>总想看：789782人</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "b-expect",
  data() {
    return {
      nowDate: "",
      hour: "",
    };
  },
  created() {
    this.getnowDate();
  },
  methods: {
    getnowDate() {
      const time = new Date();
      this.hour = time.getHours();
      this.nowDate = this.$moment(time).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss" scoped>
.board-main {
  width: 80%;
  min-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
  .middle {
    width: 70%;
    margin: 0 auto;
    // border: 1px solid red;
    text-align: center;
    p {
      margin-bottom: 0px;
      color: #999;
      font-size: 13px;
      margin-top: 6px;
      span {
        color: #ffb400;
        margin-left: 5px;
      }
    }
  }
  .main-wrapper {
    width: 76%;
    height: 500px;
    // border: 1px solid red;
    margin: 50px auto;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      .introduce-wrapper {
        flex: 1;
        height: 220px;
        .introduce {
          height: 100%;
          margin-left: 30px;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            p {
              margin-bottom: 0px;
              &:first-child {
                font-size: 26px;
                color: #333;
              }
              &:nth-child(2) {
                margin-top: 13px;
                color: #333;
              }
              &:last-child {
                margin-top: 4px;
                color: #999;
              }
            }
          }
          .score {
            text-align: right;
            p{
              margin-bottom: 10px;
              color: #ffb400;
              font-size: 16px;
              span{
                font-size: 26px;
                font-weight: 700;
              }
            }
            i {
              color: #999;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>