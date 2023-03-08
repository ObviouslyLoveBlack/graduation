<template>
  <div class="board-main">
    <div class="main-header" v-if="show">
      <div class="middle">
        <p>2022-12-29<span v-if="hour > 10">已更新</span></p>
        <p>
          榜单规则：将昨日国内待映影片，按照之前30天的想看数总量从高到低排列取前50名，每天上午10点更新。相关数据来源于“故之电影库”。
        </p>
      </div>
      <div class="main-wrapper">
        <div class="item" v-for="action in expectList" :key="action.id">
          <img :src="action.img" alt="" />
          <div class="introduce-wrapper">
            <div class="introduce">
              <div class="title">
                <p>{{ action.movieName }}</p>
                <p>主演：{{ action.act }}</p>
                <p>上映时间：{{ action.updateTime }}</p>
              </div>
              <div class="score">
                <p>
                  本月新增想看：<span>{{ action.newIce }}</span
                  >人
                </p>
                <i>总想看：{{ action.num }}人</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <a-pagination
          :total="total"
          :pageSize="5"
          @change="change"
        />
      </div>
    </div>
    <p class="maker-empot" v-else>
      <a-spin size="large" tip="数据加载中..." />
    </p>
  </div>
</template>

<script>
export default {
  name: "b-expect",
  data() {
    return {
      nowDate: "",
      hour: "",
      expectList: [],
      show: false,
      total:''
    };
  },
  created() {
    this.getnowDate();
    this.getexpect();
  },
  methods: {
    getnowDate() {
      const time = new Date();
      this.hour = time.getHours();
      this.nowDate = this.$moment(time).format("YYYY-MM-DD");
    },
    getexpect(pageNum=1,pageSize = 5) {
      const params = {
        pageNum: pageNum,
        pageSize: pageSize,
      };
      this.$req.getexpect(params).then((res) => {
        this.expectList = res.data.records;
        this.total = res.data.total
        this.show = true;
      });
    },
    change(pageNum,pageSize){
      this.getexpect(pageNum,pageSize)
      window.scrollTo(0,0)
    }
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
    // height: 500px;
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
            p {
              margin-bottom: 10px;
              color: #ffb400;
              font-size: 16px;
              span {
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
  .maker-empot {
    height: 150px;
    width: 80%;
    margin: 0 auto;
  }
}
</style>