<template>
  <div class="costEffective">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="热卖" name="first">
       <goodThingsHot></goodThingsHot>
      </el-tab-pane>
      <el-tab-pane label="人气" name="second">
        <goodThingsPerson></goodThingsPerson>
      </el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
  import goodThingsHot from './components/goodThingsHot'
  import goodThingsPerson from './components/goodThingsPerson'
  export default {
    data () {
      return {
      activeName2: "first",
      }
    },
    components:{goodThingsHot,goodThingsPerson},
    mounted () {
   
    },
    methods: {
 
    }
  }
</script>

<style lang="scss" scoped>

</style>