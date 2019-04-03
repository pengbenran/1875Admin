<template>
  <div>
     <el-date-picker size='mini' value-format='timestamp' @change='changTime' v-model="dataTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
     <div id="J_chartLineBox" class="chart-box"></div>
  </div>
</template>
<script>
export default {
  props: ['chartLine'],
  data() {
    return {
      dataTime:''
    }
  },
  mounted() {
    this.initChartLine()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
        this.chartLine.resize()
    }
    },
  methods: {
    //根据时间筛选数据
    changTime(e){
     let that = this;
     console.log("数据",e,that.dataTime)
     that.GetdateTimeData(that.dataTime[0],that.dataTime[1])
    },

    //获取时间周期数据
    async GetdateTimeData(beginTime,endTime){
      let that = this;
      let data = {
        beginTime:beginTime,
        endTime:endTime
      }
    },
  }
}
</script>
