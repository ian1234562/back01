<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 40px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl()" alt="" class="user" />
          <div class="user-info">
            <p>Admin</p>
            <p>超級管理員</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登入時間<span>2024-11-1</span></p>
          <p>上次登入地點<span>蘆洲</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            :is="item.icon"
            class="icons"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="txt">${{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart" style="margin-top: 20px">
        <div ref="echart" style="height: 260px"></div>
      </el-card>
      <div class="graph" style="margin-top: 20px">
        <el-card>
          <div ref="userEchart" style="height: 240px"></div>
        </el-card>
        <el-card>
          <div ref="videoEchart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  ref,
  getCurrentInstance,
  onMounted,
  reactive,
  onBeforeUnmount,
} from "vue";
import * as echarts from "echarts";

interface TableItem {
  name: string;
  todayBuy: number;
  monthBuy: number;
  totalBuy: number;
}

interface CountItem {
  name: string;
  value: number;
  icon: string;
  color: string;
}

const tableData = ref<TableItem[]>([]);
const observer = ref<ResizeObserver | null>(null);
const countData = ref<CountItem[]>([]);
const tableLabel = ref({
  name: "課程",
  todayBuy: "今日購買",
  monthBuy: "本月購買",
  totalBuy: "總購買",
});
let oneEchart: echarts.ECharts; // 第一個圖表實例
let twoEchart: echarts.ECharts; // 第二個圖表實例
let threeEchart: echarts.ECharts; // 第三個圖表實例
//折線圖和柱狀圖的公共配置 x軸
const xOptions: any = reactive({
  //圖例文字顏色
  textStyle: {
    color: "#333",
  },
  //長
  legend: {},
  grid: {
    left: "20%",
  },
  //提示框
  tooltip: {
    trigger: "axis",
  },
  //x軸
  xAxis: {
    type: "category", //纇目軸
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  //y軸
  yAxis: {
    type: "value",
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
  },
  color: ["#2ce7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
//餅狀配置
const pieOptions: any = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
//獲取圖片
const getImageUrl = () => {
  return new URL(`../assets/user.jpeg`, import.meta.url).href;
};
//類似this只給這組件用 利用解構賦職
//相當於this的意思
const instance = getCurrentInstance();
if (!instance) {
  throw new Error("組件實例不存在");
}
//獲取數據
const getTableData = async () => {
  const data = await (instance.proxy as any).$api.getTableData();
  tableData.value = data.tableData;
};
const getCountData = async () => {
  const data = await (instance.proxy as any).$api.getCountData();
  countData.value = data;
};
const getChartData = async () => {
  const { orderData, userData, videoData } = await (
    instance.proxy as any
  ).$api.getChartData();
  initializeCharts(orderData, userData, videoData);
};
//初始化
const initializeCharts = (orderData: any, userData: any, videoData: any) => {
  const refs = (instance.proxy as any).$refs;
  // 初始化訂單圖表
  if (refs.echart) {
    oneEchart = echarts.init(refs.echart);
    xOptions.xAxis.data = orderData.date;
    xOptions.series = Object.keys(orderData.data[0]).map((val) => ({
      name: val,
      data: orderData.data.map((item: any) => item[val]),
      type: "line",
    }));
    oneEchart.setOption(xOptions);
  }
  // 初始化用戶圖表
  if (refs.userEchart) {
    twoEchart = echarts.init(refs.userEchart);
    xOptions.xAxis.data = userData.map((item: any) => item.date);
    xOptions.series = [
      {
        name: "新增用戶",
        data: userData.map((item: any) => item.new),
        type: "bar",
      },
      {
        name: "活躍用戶",
        data: userData.map((item: any) => item.active),
        type: "bar",
      },
    ];
    twoEchart.setOption(xOptions);
  }

  // 初始化視頻圖表
  if (refs.videoEchart) {
    threeEchart = echarts.init(refs.videoEchart);
    pieOptions.series = [{ data: videoData, type: "pie" }];
    threeEchart.setOption(pieOptions);
  }
};
//監聽變化
const setupResizeObserver = () => {
  observer.value = new ResizeObserver(() => {
    oneEchart?.resize();
    twoEchart?.resize();
    threeEchart?.resize();
  });

  const refs = (instance.proxy as any).$refs;
  if (refs.echart) {
    observer.value.observe(refs.echart);
    observer.value.observe(refs.userEchart);
    observer.value.observe(refs.videoEchart);
  }
};
onMounted(async () => {
  await getTableData();
  await getCountData();
  await getChartData();
  setupResizeObserver();
  // console.log(countData.value);
});
onBeforeUnmount(() => {
  // 清理監聽器和圖表實例
  observer.value?.disconnect();
  oneEchart?.dispose();
  twoEchart?.dispose();
  threeEchart?.dispose();
});
</script>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: hidden;

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info p {
      line-height: 40px;
    }
    .user-info p:nth-child(1) {
      font-size: 34px;
    }
    .user-info p:nth-child(2) {
      color: #999;
    }
  }
  .login-info {
    line-height: 30px;
    font-size: 14px;
    columns: #999;
    span {
      color: #666;
      margin-left: 100px;
    }
  }
  .user-table {
    margin-top: 30px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-top: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 30px;
        // margin-bottom: 10px;
      }
      .txt {
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
      // height: 260px;
    }
  }
}
</style>
