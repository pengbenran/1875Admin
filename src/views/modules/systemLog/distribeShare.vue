<template>
  <div class="orderStatistics">

      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="7" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="订单编号/消费者姓名/微信名"/>
                </div>
            </el-col>
            <el-col :span="8"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                <!-- <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button> -->
                <!-- <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>删除</el-button> -->
            </el-col>
            <el-col :span="9">
                <div class="block">
                <el-date-picker  v-model="value7" type="daterange" align="right" @change="handleChange" value-format='yyyy-MM-dd'
                    unlink-panels  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
                </div>
            </el-col>
        </el-row>   
          

      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="分润日志Id" prop="distributorLogId"/>
          <el-table-column align="center" label="订单编号" prop="orderSn"/>
          <el-table-column align="center" label="购买人头像" prop="face">
              <template slot-scope="scope">
                   <img :src="scope.row.face" width="55"/>
              </template>
          </el-table-column>
          <el-table-column align="center" label="购买人" prop="froms"/>
          <el-table-column align="center" label="分润获得者微信名" prop="tos"/>
          <el-table-column align="center" label="类型" prop="type">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.type == 1">分享师佣金</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 2">上下线佣金</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 3">抵扣</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 4">提现</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="分润金额" prop="amount"/>
          <el-table-column align="center" label="添加时间" prop="addTime"/>
          <!-- <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteList(scope.$index,scope.row)">删除</el-button>
              </template>
          </el-table-column> -->
        </el-table>
      </el-card>

        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetOrderLogList" />

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
        List:[],
        listQuery: {
          page: 1,
          limit: 10,
        },
        total:8,
        multipleSelection:[],
        listLoading:false,
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
        },
      }
    },
    mounted () {
      this.GetOrderLogList();
    },
    methods: { 
      GetOrderLogList(){
        let that = this;
        that.listLoading = true;
        API.GetDistributorMoney(this.listQuery).then(res => {
          console.log("查看所有的数据",res)
          if(res != undefined){
            that.List = res.rows;
            that.total = res.total;
          }else{
            that.$message.error('抱歉，删除失败')            
          }
          that.listLoading = false;
        }).catch(err => {
            that.$message.error('抱歉，删除失败')   
        })
      },

      //删除
      async deleteList(){
        let that = this;
        //  let res = await 
        let conRes = await that.$confirm('是否确定删除？','提示',{
             confirmButtonText:'确定',
             cancelButtonText:' 取消',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已取消删除'
             });
         });
         if(conRes == 'confirm'){
             that.listLoading = true;
             let data = {logId:row.logId}
             let res = await API.DeleteOrderLog(data).catch(err => {
                 that.$message.error('抱歉，删除失败')
             })
             if(res.code == 0){
                 that.GetOrderLogList();
                 that.$message({
                     message:'删除成功',
                     type:'success'
                 })
             }else{
                 that.$message.error('抱歉，删除失败')
             }
            that.listLoading = false;
         }
      },


      //按时间查找
      handleChange(val){
         console.log(val,"选择时间")
         let that = this;
         that.listQuery.beginTime = val[0];
         that.listQuery.endTime = val[1];
         that.GetOrderLogList();
      },

      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleFilter(){
        this.GetOrderLogList();       
      },


      async handleRemove(){
        let that = this;
        //  let res = await 
        let conRes = await that.$confirm('是否确定删除？','提示',{
             confirmButtonText:'确定',
             cancelButtonText:' 取消',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已取消删除'
             });
         });
         if(conRes == 'confirm'){
             that.listLoading = true;
            let idsarr = []
            this.multipleSelection.map(v => {
                idsarr.push(v.logId);
            })
            let data = {ids:idsarr.join(',')}
            let res = await API.batchRemovOrderLog(data).catch(err => {
                this.$message.error("抱歉,删除失败")
            })
            if(res.code == 0){
                this.GetOrderLogList();
                that.$message({
                    message:'删除成功',
                    type:'success'
                })
            }else{
                this.$message.error("抱歉,删除失败")       
            }
            that.listLoading = false;
         }
      }
    }
  }
</script>

<style lang="scss">
  
</style>
