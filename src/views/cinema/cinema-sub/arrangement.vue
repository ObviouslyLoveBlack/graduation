<template>
  <div>
    <div class="container">
      <div class="arrangment-header">
        <div class="whole" @click="more">
          全国
          <a-icon type="down" />
        </div>
        <div class="header-period">
          <input
            type="radio"
            :checked="period"
            @click="periodChange"
            class="radioStyle"
            :class="period ? 'active' : ''"
          />
          <span>黄金时间段(18:00-21:00)</span>
        </div>
        <div class="header-period">
          <input
            type="radio"
            :checked="seat"
            @click="seatChange"
            class="radioStyle"
            :class="seat ? 'active' : ''"
          />
          <span>按座位</span>
        </div>
      </div>
      <div class="arrangment-echarts">
        <div class="echarts" id="echarts"></div>
      </div>
      <div class="arrangment-table" v-if="!seat">
        <a-table
          :columns="columns"
          :data-source="tabledData"
          :pagination="false"
          :customRow="onClickRow"
        >
        </a-table>
      </div>
      <div class="arrangment-table" v-else>
        <a-table
          :columns="columns2"
          :data-source="tabledData"
          :pagination="false"
        >
        </a-table>
      </div>
      <a-modal
        v-model="visible"
        class="more"
        title="更多数据"
        :width="350"
        :footer="false"
        :closable="false"
      >
        <img src="@/assets/image/code.jpg" alt="" class="image" />
        <div class="scan">打开微信扫一扫浏览更多</div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { merge } from "lodash";
export default {
  name: "l-arrangement",
  data() {
    return {
      seat: false,
      period: false,
      myChart: null,
      basicOption: null,
      visible: false,
      rowRecord: {}, // 点击行数据
      show:false,
      columns: [
        {
          title: "片名",
          dataIndex: "name",
          key: "name",
          align: "center",
          width: "300px",
        },
        {
          title: "场次占比",
          dataIndex: "arrangementGDP",
          align: "center",
          key: "arrangementGDP",
          width: "300px",
        },
        {
          title: "场次",
          dataIndex: "value",
          align: "center",
          key: "value",
          width: "300px",
        },
      ],
      columns2: [
        {
          title: "片名",
          dataIndex: "name",
          key: "name",
          align: "center",
          width: "300px",
        },
        {
          title: "座位占比",
          dataIndex: "arrangementGDP",
          key: "arrangementGDP",
          align: "center",
          width: "300px",
        },
        {
          title: "座位",
          dataIndex: "value",
          align: "center",
          key: "value",
          width: "300px",
        },
      ],
      tabledData: [], //表格--图表数据
      // form:{
      //   commontTable1: [], //普通时间段
      //   commontTable2: [], //黄金时间段
      //   commontTable3: [], //普通-座位
      //   commontTable4: [], //黄金-座位
      // },
      commontTable: [],
      commontSeatTable: [],
      periodTable: [],
      periodSeatTable: [],
    };
  },
  watch: {
    seat: {
      handler() {
        // this.OnTableChange()
        this.getData();
        this.tabledData = this.echartsAll;
      },
    },
    period: {
      handler() {
        // this.OnTableChange()
        this.getData();
        this.tabledData = this.echartsAll;
      },
    },
  },
  computed: {
    echartsAll() {
      return this.period && this.seat
        ? this.periodSeatTable
        : this.period
        ? this.periodTable
        : this.seat
        ? this.commontSeatTable
        : this.commontTable;
    },
  },
  created() {
    this.getCommonTable();
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    async getCommonTable() {
      const { data: res } = await this.$req.arrangementcommon();
      this.commontTable = res.map((v) => ({
        ...v,
        value: v.value1,
        arrangementGDP: v.arrangementGDP1,
        name: v.movieName,
      }));
      this.tabledData = this.commontTable;
      this.periodTable = res.map((v) => ({
        ...v,
        value: v.value2,
        arrangementGDP: v.arrangementGDP2,
        name: v.movieName,
      }));
      this.commontSeatTable = res.map((v) => ({
        ...v,
        value: v.value3,
        arrangementGDP: v.arrangementGDP4,
        name: v.movieName,
      }));
      this.periodSeatTable = res.map((v) => ({
        ...v,
        value: v.value4,
        arrangementGDP: v.arrangementGDP4,
        name: v.movieName,
      }));
      this.getData();
    },
    periodChange() {
      this.period = !this.period;
    },
    seatChange() {
      this.seat = !this.seat;
    },
    echartsInit() {
      this.myChart = echarts.init(document.getElementById("echarts"));
      this.basicOption = {
        color: [
          "#ff574d",
          "#3e8ff4",
          "#2bc7ff",
          "#20d8dc",
          "#35cdca",
          "#88dd2c",
          "#ffef00",
          "#ef3834",
        ],
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              position: "outside",
              fontSize: 12,
              color: "inherit",
            },
            labelLine: {
              show: true,
              lineStyle: {},
            },
            itemStyle: {},
            data: this.echartsAll,
          },
        ],
      };
    },
    mergeOptions(data) {
      return merge({}, this.basicOption, { series: [{ data }] });
    },
    getData() {
      if (!this.myChart) return;
      this.myChart.setOption(this.mergeOptions(this.echartsAll));
    },
    handleResize() {
      if (!this.myChart) return;
      this.myChart.resize();
    },
    more() {
      this.visible = true;
    },
    onClickRow(record) {
      return {
        on: {
          click: () => {
            this.visible = true;
            // console.log(record);
            this.rowRecord = record;
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-width: 1200px;
  margin-top: 30px;
  .arrangment-header {
    width: 80%;
    margin: 0px auto;
    background: #eaeaea;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    .whole {
      line-height: 30px;
      cursor: pointer;
    }
    .header-period {
      display: flex;
      span {
        line-height: 30px;
        margin-left: 5px;
      }
      .radioStyle {
        width: 15px;
        height: 15px;
        margin-top: 8px;
        border: 1px solid #999;
        border-radius: 50%;
      }
      input {
        -webkit-appearance: none;
      }
    }
  }
  .arrangment-echarts {
    width: 100%;
    height: 300px;
    .echarts {
      width: 540px;
      height: 100%;
      // border: 1px solid red;
      margin: 0px auto;
      padding: 20px 0px;
    }
  }
  .arrangment-table {
    margin-top: 20px;
  }
}
.active {
  background-image: url(@/assets/image/checkbox.png);
  background-position: 100% 100%;
  background-size: contain;
}
.more {
  position: relative;
  .image {
    // border: 1px solid red;
    width: 300px;
    height: 300px;
  }
}
.scan {
  color: #ef3834;
  margin-left: 70px;
}
</style>