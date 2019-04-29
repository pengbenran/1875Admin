<template>
  <div class="orderStatistics">


      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="7" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="会员名称/分享师名称"/>
                </div>
            </el-col>
            <el-col :span="8"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
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
          <el-table-column align="center" label="绑定日志Id" prop="boundId"/>
          <el-table-column prop="face" label="头像"  align="center">
            <template slot-scope="scope">
                 <img :src="scope.row.face" :alt="scope.row.name" width="80">
            </template>
          </el-table-column>
          <el-table-column align="center" label="会员名称" prop="name"/>
           <el-table-column align="center" label="分享师微信名" prop="upName"/>
          <el-table-column align="center" label="类型" prop="type">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.type == 1">商品二维码</el-tag>
                  <el-tag type="success" v-if="scope.row.type == 2">分享师二维码</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="绑定时间" prop="addTime"/>
        </el-table>
      </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetOrderLogList" />
  </div>
</template>
<script>
import API from '@/api/systemLog'
import Pagination from '@/components/Pagination' 
  export default {
    components:{Pagination},
    data () {
      return {
        List:[],
        listQuery: {
          page: 1,
          limit: 10,
        },
        total:8,
        multipleSelection:[],
        value7:'',
        listLoading:false,
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
        API.GetDistributorBandDing(this.listQuery).then(res => {
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

      //根据时间筛选
      handleChange(val){
          let that = this;
         that.listQuery.beginTime = val[0];
         that.listQuery.endTime = val[1];
         this.GetOrderLogList();
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
                this.getOrderList();
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
