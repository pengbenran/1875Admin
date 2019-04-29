<template>
  <div class="memberUpLog">
   <el-card class="box-card">
    <el-row :gutter="24">
      <el-col :span="8" >
        <div class="filter-container">
          <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="分享师名称/分享师等级"/>
        </div>
      </el-col>
      <el-col :span="6"> 
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      </el-col>
      <el-col :span="10">
       <div class="block">
        <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
        @blur="handleFilter"
        format="yyyy 年 MM 月 dd 日 HH 时 mm分 ss秒"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
    </div>
  </el-col>
</el-row>      
</el-card>
 <el-card class="box-card">
       <el-table v-loading="listLoading" :data="distribeUpLogList" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
         <!-- <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column> -->
          <el-table-column prop="distributorLogId" label="Id"  align="center"></el-table-column>
          <el-table-column prop="distributorId" label="分享师Id"  align="center"></el-table-column>
          <el-table-column prop="memberName" label="会员名称"  align="center"></el-table-column>
          <el-table-column prop="lvName" label="等级名称"  align="center"></el-table-column>
          <el-table-column prop="oldLv" label="原等级Id"  align="center"></el-table-column>
          <el-table-column prop="oldName" label="原等级名称"  align="center"></el-table-column>
          <el-table-column prop="addTime" label="升级时间"  align="center"></el-table-column>
        </el-table>
      </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetdistribeUpLogList" />

  </div>
</template>

<script>
import API from '@/api/systemLog'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        listLoading:false,
        distribeUpLogList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        value7:'',
        Statuoptions:[{
          value: 1,
          label: '购买获得积分'
        },{
          value: 2,
          label: '分享获得积分'
        }, {
          value: 3,
          label: '购买消费积分'
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    mounted () {
       this.GetdistribeUpLogList();
    },
    methods: {
      //获取所有的等级
      GetdistribeUpLogList(){
        let that = this;
        API.distribeUpLog(Object.assign({},that.listQuery)).then(res => {
          console.log("成功的打印",res)
          if(res != undefined){
            that.distribeUpLogList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('会员升级日志列表获取失败');
          }
        }).catch(err =>{})
      },
      searchGetMenberData(){
        let that = this;
        that.GetdistribeUpLogList();
      },
      handleFilter(){
        let that=this
        that.page=1
        that.listQuery.beginTime=that.value7[0]
        that.listQuery.endTime=that.value7[1]
        that.GetdistribeUpLogList()
      },
    }
  }
</script>

<style lang="scss">
  
</style>
