<template>
  <div class="orderStatistics">
      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="14" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchName" clearable class="filter-item" style="width: 300px;" placeholder="会员Id/会员名称/审核状态"/>
                </div>
            </el-col>
            <el-col :span="10"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
                <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleRemove" :disabled='multipleSelection.length == 0'>批量审核</el-button>
            </el-col>
        </el-row>      
      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" @selection-change="handleSelectionChange" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="申请Id" prop="applyId"/>
          <el-table-column align="center" label="会员Id" prop="memberId"/>
          <el-table-column align="center" label="名称" prop="name"/>
          <el-table-column align="center" label="类型" prop="status">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status == 1">未审核</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 2">已通过</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 3">未通过</el-tag>
                  <el-tag type="success" v-if="scope.row.status == 4">已取消</el-tag>
              </template>
          </el-table-column>
          <el-table-column align="center" label="电话" prop="mobile"/>
          <el-table-column align="center" label="审核人" prop="username"/>
          <el-table-column align="center" label="推荐人Id" prop="tjunionid"/>
          <el-table-column align="center" label="申请时间" prop="applyTime"/>
          <el-table-column align="center" label="审核时间" prop="auditTime"/>
          <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="examine(scope.$index,scope.row)">审核</el-button>
              <el-button type="danger" size="mini" @click="deleteList(scope.$index,scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-card>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDataList" />
  </div>
</template>
<script>
import API from '@/api/member'
import Pagination from '@/components/Pagination' 
  export default {
    components:{Pagination},
    data () {
      return {
        List:[],
        listLoading:false,
        listQuery: {
          page: 1,
          limit: 10,
        },
        total:8,
        multipleSelection:[],
      }
    },
    mounted () {
      this.GetDataList();
    },
    methods: { 
      GetDataList(){
        let that = this;
        that.listLoading = true;
        API.GetDistributorReview(this.listQuery).then(res => {
          if(res != undefined){
            that.List = res.rows;
            that.total = res.total;
          }else{
            that.$message.error('抱歉,获取数据失败')            
          }
          that.listLoading = false;
        }).catch(err => {
            that.$message.error('抱歉,获取数据失败')   
        })
      },
      // 删除审核记录
      async deleteList(index,row){
        let that=this
        let conRes = await that.$confirm('是否删除该条记录','提示',{
             confirmButtonText:'删除',
             cancelButtonText:'取消',
             type:'warning'
         })
         if(conRes == 'confirm'){
           let params={}
           params.applyId=row.applyId
           API.deleteDistributorReview(params).then(function(res){
            if(res.code==0){
              that.$message({
               message:'删除成功',
               type:'success'
             })
              that.GetDataList()
            }   
           })
         }     
      },
      //审核
      async  examine(index,row){
        let that = this;
        let data;
        let conRes = await that.$confirm('是否审核通过？','提示',{
             confirmButtonText:'通过',
             cancelButtonText:' 不通过',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '审核已拒绝'
             });
         });
         if(conRes == 'confirm'){
            data = {applyId:row.applyId,status:2}
            that.Que(data)
         }else{
            data = {applyId:row.applyId,status:3}
            that.Que(data)
         }

      },

      async Que(data){
         let that = this;
         that.listLoading = true;
         let res = await API.QueDistributorReview(data).catch(err => {
                 that.$message.error('审核失败')
             })
             if(res.code == 0){
                 that.GetDataList();
                 that.$message({
                     message:'审核成功',
                     type:'success'
                 })
             }else{
                 that.$message.error('审核失败')
             }
          that.listLoading = false;
      },
      //多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleFilter(){},
      async handleRemove(){
        let that = this;
        //  let res = await 
        let conRes = await that.$confirm('是否审核通过？','提示',{
             confirmButtonText:'通过',
             cancelButtonText:' 不通过',
             type:'warning'
         }).catch(() => {
             that.$message({
                 type: 'info',
                 message: '已审核'
             });
         });
         if(conRes == 'confirm'){
            that.QueLists();
         }else{
            that.QueList();
         }
      },

      async QueList(){
        let that = this;
        that.listLoading = true;
          let idsarr = []
          this.multipleSelection.map(v => {
              idsarr.push(v.applyId);
          })
          let data = {ids:idsarr.join(',')}
          let res = await API.BatchQueDistributorReview(data).catch(err => {
              this.$message.error("抱歉,审核失败")
          })
          if(res.code == 0){
              this.GetDataList();
              that.$message({
                  message:'审核成功',
                  type:'success'
              })
          }else{
              this.$message.error("抱歉,审核失败")       
          }
          that.listLoading = false;
      },

      async QueLists(){
        let that = this;
        that.listLoading = true;
          let idsarr = []
          this.multipleSelection.map(v => {
              idsarr.push(v.applyId);
          })
          let data = {ids:idsarr.join(',')}
          let res = await API.BatchQueDistributorReviews(data).catch(err => {
              this.$message.error("抱歉,审核失败")
          })
          if(res.code == 0){
              this.GetDataList();
              that.$message({
                  message:'审核成功',
                  type:'success'
              })
          }else{
              this.$message.error("抱歉,审核失败")       
          }
          that.listLoading = false;
      },
    }
  }
</script>

<style lang="scss">
  
</style>
