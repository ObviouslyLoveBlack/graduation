<template>
  <div class="office-container">
    <div class="office-content">
      <div class="office-table">
        <p>电影票房</p>
        <thead>
          <th>影片</th>
          <th>综合票房</th>
          <th>票房占比</th>
          <th>排片场次</th>
          <th>排片占比</th>
          <th>场均人数</th>
          <th>上座率</th>
        </thead>
        <tbody>
          <tr v-for="(action, index) in tableData" :key="index" @click="getDetailFilms(action)">
            <td>
              <span>{{index+1 &lt; 10 ? '0'+(Number(index+1)) : index+1}}</span>
              <div class="td-box">
                <p>{{ action.movieName }}</p>
                <p>上映{{action.money}}天，{{action.shown > 100000000 ? (action.shown/100000000).toFixed(2)+ '亿' : action.shown > 10000 ? (action.shown/10000).toFixed(2) +'万' :'' }}</p>
              </div>
            </td>
            <td>{{ action.office }}万</td>
            <td>{{ action.officeGDP }}</td>
            <td>{{ action.arrangement }}</td>
            <td>{{ action.arrangementGDP }}</td>
            <td>{{ action.fieldAverage }}</td>
            <td>{{ action.rate }}</td>
          </tr>
        </tbody>
      </div>
      <div class="office-detail">
        <div class="real-time-market">
          <h3>实时大盘</h3>
          <h3>{{realmarket.market}} <span>万</span></h3>
          <div class="real-market-info">
            <span>总出票：{{realmarket.ticket}}万张</span>
            <span>总场次：{{realmarket.seat}}万场</span>
          </div>
        </div>
        <div class="office-detail-info">
          <div class="office-image-info">
            <img :src="detailObj.img" alt="" />
            <div class="films-info">
              <h3>{{detailObj.movieName}}</h3>
              <span>{{detailObj.type}}</span>
              <p>上映{{detailObj.money}}天,{{detailObj.shown > 100000000 ? (detailObj.shown/100000000).toFixed(2)+ '亿' : detailObj.shown > 10000 ? (detailObj.shown/10000).toFixed(2) +'万' :'' }}</p>
            </div>
          </div>
          <div class="office-data-info">
            <div class="data-box">
              <div class="data-office-item">
                <p>今日综合票房</p>
                <p>{{detailObj.office}} <span>万</span></p>
              </div>
              <div class="data-office-item">
                <p>票房占比</p>
                <p>{{detailObj.officeGDP}}</p>
              </div>
            </div>
            <div class="seat-info-box">
              <div class="seat-info-item">
                <p>今天排片场次</p>
                <p>{{detailObj.arrangement}}</p>
                <p>排片占比{{detailObj.arrangementGDP}}</p>
              </div>
              <div class="seat-info-item">
                <p>今天上座率</p>
                <p>{{detailObj.rate}}</p>
                <p>场均人次{{detailObj.fieldAverage}}</p>
              </div>
            </div>
          </div>
          <div class="office-echarts-info">
            <span>近期票房趋势</span>
            <!-- <div class="echarts-bar" id="bar" v-if="detailObj.visualiza.length>0"></div> -->
            <div class="echarts-bar" id="bar"></div>
            <!-- <div class="empty" v-else>暂无数据</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {merge} from 'lodash'
export default {
  name: "g-offices",
  data() {
    return {
      tableData: [],
      realmarket:{}, //实时大盘数据
      detailObj:{},
      basicOption:null,
      myChart:null,
      echarVlaue:[],
      value:[]
    };
  },
  created() {
    this.getOfficeData()
    // console.log(this.$moment(new Date()).format('MM-DD'));
  },
  watch:{
    detailObj:{
      immediate:true,
      handler(){
        this.getData()
      }
    },
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    async getOfficeData(){
      const {data:res} = await this.$req.getOfficeData()
      this.tableData = res
      // this.realmarket = realmarket
      this.detailObj = this.tableData[0]
      this.changeStr(this.detailObj.visualiza.split(','))
    },
    getDetailFilms(action){
      this.detailObj = action
      this.changeStr(this.detailObj.visualiza.split(','))
    },
    echartsInit() {
      this.myChart = echarts.init(document.getElementById("bar"));
      this.basicOption = {
        color:['#828282'],
        grid:{top:'20%'},
        xAxis: {
          data: ["2/2", "2/3", "2/4", "2/5",`今日`],
          axisLine:{
            show:false
          },
          axisTick:{
            show:false,
          },
          axisLabel:{
            color:'#fff',
          }
        },
        yAxis: {
          show:false,
          splitLine:{
            lineStyle:{
             opacity:0.1
            }
          }
        },
        series: [
          {
            type: "bar",
            data:JSON.parse(JSON.stringify(this.echarVlaue)),
            label:{
              show:true,
              position:'top',
              color:'#828288',
              formatter:function(params){
                  if(params.data>100000000) return (params.data/100000000).toFixed(2)+'亿'
                  if(params.data>10000) return (params.data/10000 ).toFixed(1)+ '万'
              }
            },
            barWidth:30,
          },
        ],
      };
    },
    mergeOption(data){
      return merge(
        {},
        this.basicOption,
        {series:[{data}]},
      );
    },
    getData(){
      if(!this.myChart) return
      this.myChart.setOption(this.mergeOption([...this.echarVlaue]))
    },
    changeStr(arr){
      this.echarVlaue = []
      arr.forEach(item => {
        this.echarVlaue.push(Number(item))
      });
      
    }
  },
};
</script>

<style lang="scss" scoped>
.office-container {
  width: 100%;
  border-top: 1px solid transparent;
  background: #eaeaea;
  .office-content {
    width: 95%;
    margin: 20px auto;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    .office-table {
      width: 70%;
      border-radius: 20px;
      background: #3e3b4d;
      overflow: hidden;
      p {
        margin: 10px 0px 10px 10px;
        color: #fff;
        font-size: 20px;
      }
      thead {
        background: #383743;
        padding: 10px 6px 10px 30px;
        display: flex;
        align-items: center;
        th {
          // border: 1px solid red;
          width: 300px;
          text-align: left;
          color: #afafad;
          &:nth-child(2) {
            width: 200px;
            // text-align: center;
          }
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7),
          &:nth-child(3) {
            width: 153px;
            // text-align: right;
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
          // padding: 8px 20px;
          padding: 8px 0px 10px 30px;
          td {
            width: 30%;
            // border: 1px solid red;
            text-align: left;
            color: #fff;
            display: flex;
            align-items: center;
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6),
            &:nth-child(7),
            &:nth-child(3) {
              width: 15%;
            }
            &:nth-child(2) {
              width: 20%;
              color: #ff9400;
              font-size: 17px;
              font-weight: 500;
              span {
                color: white;
              }
              .progress-info {
                margin-left: 10px;
              }
            }
            span {
              color: #afafad;
            }
            .td-box {
              margin-left: 15px;
              p {
                margin: 0px;
                font-size: 20px;
                color: white;
                &:last-child {
                  font-size: 13px;
                  color: #afafad;
                }
              }
            }
          }
          &:nth-child(2n) {
            background: #383743;
            // border: 1px solid red;
          }
          .progress {
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
    .office-detail {
      width: 28%;
      height: 590px;
      overflow-y: auto;
      .real-time-market {
        border-radius: 20px;
        background: #3e3b4d;
        height: 150px;
        overflow: hidden;
        margin-bottom: 20px;
        h3 {
          color: #fff;
          text-align: center;
          font-size: 20px;
          font-weight: 200;
          margin: 8px 0px 0px 0px;
          &:nth-child(2) {
            color: #ff9400;
            font-weight: 400;
            font-size: 30px;
            span {
              font-size: 13px;
            }
          }
        }
        .real-market-info {
          padding: 15px 20px;
          display: flex;
          font-size: 16px;
          color: #afafad;
          justify-content: space-between;
        }
      }
      .office-detail-info {
        border-radius: 20px;
        background: #3e3b4d;
        overflow: hidden;
        .office-image-info {
          padding: 20px 30px;
          display: flex;
          img {
            width: 120px;
            height: 170px;
          }
          .films-info {
            padding: 20px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h3 {
              color: white;
              font-size: 20px;
              margin-bottom: 0px;
            }
            span {
              color: #afafad;
            }
            p {
              color: #afafad;
            }
          }
        }
        .office-data-info {
          padding: 10px 30px;
          .data-box {
            padding: 0px 30px;
            display: flex;
            text-align: center;
            justify-content: space-between;
            .data-office-item {
              width: 200px;
              color: #afafad;
              font-size: 16px;
              p {
                margin-bottom: 0px;
                span {
                  font-size: 15px;
                }
                &:nth-child(2) {
                  color: #ff9400;
                  font-size: 30px;
                }
              }
            }
          }
          .seat-info-box {
            padding: 0px 30px;
            display: flex;
            text-align: center;
            justify-content: space-between;
            .seat-info-item {
              width: 200px;
              margin-top: 10px;
              p {
                margin-bottom: 0px;
                color: #afafad;
                font-size: 16px;
                &:nth-child(2) {
                  color: #fff;
                  font-size: 25px;
                }
                &:nth-child(3) {
                  font-size: 14px;
                }
              }
            }
          }
        }
        .office-echarts-info {
          margin: 20px 30px;
          height: 160px;
          background: #454454;
          position: relative;
          span{
            position: absolute;
            color: #afafad;
            top: 10px;
            left: 10px;
          }
          .echarts-bar {
            width: 338px;
            height: 206px;
            margin: 0px auto;
          }
          .empty{
            position: absolute;
            top: 40%;
            left: 36%;
            color: #afafad;
            font-size: 25px;
          }
        }
      }
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
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
}
</style>