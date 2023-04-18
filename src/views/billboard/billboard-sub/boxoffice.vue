<template>
  <div class="board-main">
    <div class="main-header" v-if="show">
      <div class="middle">
        <p>{{nowDate}}<span v-if="hour > 10">已更新</span></p>
        <p>
          榜单规则：将昨日国内热映的影片，按照昨日票房从高到低排列，每天上午10点更新。相关数据来源于“猫眼专业版”
        </p>
      </div>
      <div class="main-wrapper">
        <div class="item" v-for="action in boxofficeList" :key="action.id" @click="filmsDetail(action)">
          <img :src="action.img" alt="" />
          <div class="introduce-wrapper">
            <div class="introduce">
              <div class="title">
                <p>{{action.movieName}}</p>
                <p>主演：{{action.act}}</p>
                <p>上映时间：{{action.updateTime}}</p>
              </div>
              <div class="score">
                <p>实时票房：<span>{{action.newIce}}</span>万</p>
                <i>总票房：{{action.num > 100000000 ? (action.num/100000000).toFixed(2) +'亿' : (action.num/10000).toFixed(2) +'万' }}</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="maker-empot" v-else>
      <a-spin  size="large" tip="数据加载中..."/>
    </p>
  </div>
</template>

<script>
export default {
  name: "box-office",
  data() {
    return {
      nowDate: "",
      hour: "",
      boxofficeList:[],
      show:false
    };
  },
  created() {
    this.getnowDate();
    this.getboxoffice()
  },
  methods: {
     filmsDetail(action) {
      let url = this.$router.resolve({
        path: "/movie/flims/detail",
        query: {
          id: action.id,
        },
      });
      window.open(url.href, "_blank");
    },
    getnowDate() {
      const time = new Date();
      this.hour = time.getHours();
      this.nowDate = this.$moment(time).format("YYYY-MM-DD");
    },
    getboxoffice(){
      this.$req.boardboxoffice().then((res)=>{
        this.boxofficeList = res.data
        this.show=true
      })
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
            p{
              margin-bottom: 10px;
              color: #ef4238;
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
  .maker-empot{
    height: 150px;
    width: 80%;
    margin: 0 auto;
  }
}
</style>