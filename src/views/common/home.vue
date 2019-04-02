<template>
  <div class="mod-home">
  	<panel-group :IndexInfo='IndexInfo' @handleSetLineChartData="handleSetLineChartData"/>
  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  export default {
    data(){
      return{
        IndexInfo:{},
      }
    },
  	components: {
      PanelGroup 
    },
    methods:{
     handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>

