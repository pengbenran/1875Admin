<template>
  <div class="pointLog">
        <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="8" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchName" clearable class="filter-item" style="width: 300px;" placeholder="订单编号/消费者姓名/分润获得者微信名"/>
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
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                    </div>
                </el-col>
        </el-row>      
      </el-card>
   <el-card class="box-card">
       <el-table v-loading="listLoading" :data="pointLogList" @selection-change="handleSelectionChange" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
         <!-- <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column> -->
          <el-table-column prop="pointLogId" label="Id"  align="center":width='40'></el-table-column>
          <el-table-column prop="name" label="会员名称"  align="center"></el-table-column>
          <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column>
          <el-table-column prop="orderSn" label="订单编号"  align="center"></el-table-column>
          <el-table-column prop="type" label="积分类型"  align="center">
             <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.type == 1">购买获得积分</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 2">分享获得积分</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 3">购买消费积分</el-tag>
              </template>
          </el-table-column>
          <el-table-column prop="point" label="获得积分"  align="center"></el-table-column>
          <el-table-column prop="addTime" label="生成时间"  align="center"></el-table-column>
        </el-table>
      </el-card>
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetpointLog" />
  </div>
</template>

<script>
import API from '@/api/systemLog'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        loading:false,
        pointLogList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        value7:'',
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
       this.GetpointLog()
    },
    methods: {
      //获取所有的等级
      GetpointLog(){
        let that = this;
        API.pointLog(Object.assign({},that.listQuery)).then(res => {
          console.log("成功的打印",res)
          if(res != undefined){
            that.pointLogList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('积分日志列表获取失败');
          }
        }).catch(err =>{})
      },
      searchGetMenberData(){
        let that = this;
        that.GetpointLog()
      }
    }
  }
</script>

<style lang="scss">
  
</style>
