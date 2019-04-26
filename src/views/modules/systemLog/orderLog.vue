<template>
  <div class="orderStatistics">
      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="14" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchName" clearable class="filter-item" style="width: 300px;" placeholder="订单编号/商品名称/订单用户/店铺搜索"/>
                </div>
            </el-col>
            <el-col :span="10"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                <!-- <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button> -->
                <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>删除</el-button>
            </el-col>
        </el-row>      
      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" @selection-change="handleSelectionChange" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="日志Id" prop="logId"/>
          <el-table-column align="center" label="订单Id" prop="orderId"/>
          <el-table-column align="center" label="商品名称" prop="goodName"/>
          <el-table-column align="center" label="订单类型" prop="status">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status == 0">待支付</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 1">待核销</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 2">已核销</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 3">已取消</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="会员名称" prop="memberName"/>
          <el-table-column align="center" label="核销时间" prop="opTime"/>
          <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteList(scope.$index,scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getOrderList" />
  </div>
</template>
<script>
import API from '@/api/order'
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
      }
    },
    mounted () {
      this.GetOrderLogList();
    },
    methods: { 
      GetOrderLogList(){
        let that = this;
        that.listLoading = true;
        API.GetOrderLog(this.listQuery).then(res => {
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

      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleFilter(){},
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
