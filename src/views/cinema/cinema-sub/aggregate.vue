<template>
  <div class="aggregate-container">
    <div class="aggregate-content">
      <div class="aggregate-table">
        <p>电影综合票房</p>
          <thead>
            <th>影片</th>
            <th>综合票房</th>
            <th>票房占比</th>
            <th>排片场次</th>
          </thead>
          <tbody>
            <tr v-for="(action,index) in tableData" :key="index">
              <td>
                <span>{{index+1 &lt; 10 ? '0'+(Number(index+1)) : index+1}}</span>
                <div class="td-box">
                  <p>{{action.moviename}}</p>
                  <!-- <p>上映{{action.money}}天,{{action.Shown}}亿</p> -->
                  <p>上映{{action.money}}天,{{typeof(action.Shown) == 'number' ?  action.Shown+'亿' : action.Shown}}</p>
                </div>
              </td>
              <td>{{action.office}}</td>
              <td>{{action.officeGDP}}</td>
              <td>{{action.arrangement}}</td>
            </tr>
          </tbody>
      </div>
      <div class="aggregate-detail">
        <div class="aggregate-detail-item">
          <p>网播热度</p>
            <thead>
            <th>节目</th>
            <th>实时热度</th>
          </thead>
          <tbody>
            <tr v-for="(action,index) in hotData" :key="index">
              <td>
                <span>{{index+1 &lt; 10 ? '0'+(Number(index+1)) : index+1}}</span>
                <div class="td-box">
                  <p>{{action.moviename}}</p>
                  <p>{{action.movieUrl}},上映时间{{action.Shown}}天</p>
                </div>
              </td>
              <td class="progress">
                <span>{{action.hots}}</span>
                <a-progress :percent="(action.hots)/50" :show-info="false" strokeColor="#d58b16" class="progress-info"/>
              </td>
            </tr>
          </tbody>
        </div>
        <div class="aggregate-detail-item">
          <p>电视收视</p>
          <thead>
            <th>节目</th>
            <th>实时直播关注度</th>
            <th>市占率</th>
          </thead>
          <tbody>
            <tr v-for="(action,index) in marketData" :key="index">
              <td>
                <span>{{index+1 &lt; 10 ? '0'+(Number(index+1)) : index+1}}</span>
                <div class="td-box">
                  <p>{{action.moviename}}</p>
                  <p>{{action.movieUrl}}</p>
                </div>
              </td>
              <td>{{action.attention}}</td>
              <td>{{action.market}}</td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-aggregate",
  data() {
    return {
      tableData: [],
      hotData: [],
      marketData:[]
    };
  },
  created() {
    this.getAggregateData()
    this.getWeblogData()
    this.getTvVewingData()
  },
  mounted() {},
  methods: {
    async getAggregateData(){
      const {data:res} = await this.$req.getAggregateData()
      this.tableData = res
    },
    async getWeblogData(){
      const {data:res} = await this.$req.getWeblogData()
      this.hotData = res
    },
    async getTvVewingData(){
      const {data:res} = await this.$req.getTvVewingData()
      this.marketData = res
    },
  },
};
</script>

<style lang="scss" scoped>
.aggregate-container {
  width: 100%;
  border-top: 1px solid transparent;
  background: #eaeaea;
  .aggregate-content {
    width: 95%;
    margin: 20px auto;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    .aggregate-table {
      width: 65%;
      border-radius: 20px;
      background: #3e3b4d;
      p {
        margin: 10px 0px 10px 10px;
        color: #ef4238;
        font-size: 20px;
      }
      thead {
          background: #383743;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          th {
            // border: 1px solid red;
            width: 40%;
            text-align: left;
            color: #afafad;
            &:nth-child(2){
              width: 20%;
              // text-align: center;
            }
            &:nth-child(4),
            &:nth-child(3) {
              width: 20%;
              // text-align: center;
            }
          }
      }
      tbody {
          display: inline-block;
          width: 100%;
          height: 500px;
          overflow-y: auto;
          tr {
            background: #454454;
            width: 100%;
            display: flex;
            padding: 8px 20px;
            td {
              width: 40%;
              // border: 1px solid red;
              text-align: left;
              color: #fff;
              display: flex;
              align-items: center;
              &:nth-child(4),
              &:nth-child(3) {
                width: 20%;
                text-align: center;
              }
              &:nth-child(2){
                width: 20%;
                color: #d58b16;
                font-size: 17px;
                font-weight: 500;
                span{
                  color: white;
                }
                .progress-info{
                  margin-left: 10px;
                }
              }
              span{
                color: #afafad;
              }
              .td-box{
                margin-left: 15px;
                p{
                  margin: 0px;
                  font-size: 20px;
                  color: white;
                  &:last-child{
                    font-size: 13px;
                    color: #afafad;
                  }
                }
              }
            }
            &:nth-child(2n){
              background: #383743;
              // border: 1px solid red;
            }
            .progress{
              width: 40% !important;
            }
          }
          &::-webkit-scrollbar {
            width: 6px;
            height: 8px;
            // background: #999;
          }
          // 滚动轨道
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            background-color: #383743;
          }
          //滚动滑块
          &::-webkit-scrollbar-thumb {
            // width: 6px;
            height: 3px;
            border-radius: 16px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            background: #999;
          }
      }
    }
    .aggregate-detail {
      width: 33%;
      height: 100%;
      .aggregate-detail-item {
        // margin-bottom: 30px;
        border-radius: 20px;
        background: #3e3b4d;
        height: 300px;
        overflow: hidden;
        p {
          margin: 0px 0px 10px 10px;
          padding: 10px 0px 0px 0px;
          color: white;
          font-size: 20px;
        }
        thead {
          background: #383743;
          padding: 10px;
          display: flex;
          align-items: center;
          th {
            width: 50%;
            text-align: left;
            color: #afafad;
            &:nth-child(2),
            &:nth-child(3) {
              width: 25%;
              // text-align: center;
            }
          }
        }
        tbody {
          display: inline-block;
          width: 100%;
          height: 200px;
          overflow-y: auto;
          tr {
            background: #454454;
            width: 100%;
            display: flex;
            padding: 10px;
            td {
              width: 50%;
              // border: 1px solid red;
              text-align: left;
              color: #fff;
              display: flex;
              align-items: center;
              &:nth-child(2),
              &:nth-child(3) {
                width: 25%;
                // text-align: center;
              }
              &:nth-child(2){
                color: #d58b16;
                font-size: 17px;
                font-weight: 500;
                span{
                  color: white;
                }
                .progress-info{
                  margin-left: 10px;
                }
              }
              span{
                color: #afafad;
              }
              .td-box{
                margin-left: 15px;
                p{
                  margin: 0px;
                  font-size: 20px;
                  &:last-child{
                    font-size: 13px;
                    color: #afafad;
                  }
                }
              }
            }
            &:nth-child(2n){
              background: #383743;
              // border: 1px solid red;
            }
            .progress{
              width: 40% !important;
            }
          }
          &::-webkit-scrollbar {
            width: 6px;
            height: 8px;
            // background: #999;
          }
          // 滚动轨道
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            border-radius: 16px;
            background-color: #383743;
          }
          //滚动滑块
          &::-webkit-scrollbar-thumb {
            // width: 6px;
            height: 3px;
            border-radius: 16px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
            background: #999;
          }
        }
        &:last-child {
          margin-top: 20px;
          p {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>