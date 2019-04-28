<template>
  <div class="orderStatistics">
      <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="8" >
                <div class="filter-container">
                    <el-input v-model="listQuery.searchParam" clearable class="filter-item" style="width: 300px;" placeholder="会员编号/会员名称"/>
                </div>
            </el-col>
            <el-col :span="16"> 
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
            </el-col>
        </el-row>      
      </el-card>

      <el-card class="box-card">
        <el-table v-loading="listLoading" :data="List" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
          <el-table-column align="center" label="id" prop="distributorInfoId"/>
          <el-table-column align="center" label="会员Id" prop="memberId"/>
          <el-table-column align="center" label="会员名称" prop="name"/>
          <el-table-column align="center" label="银行卡号" prop="cardno"/>
          <el-table-column align="center" label="到账银行" prop="depositBank"/>
          <el-table-column align="center" label="添加时间" prop="applyTime"/>
          <el-table-column align="center" label="操作" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="removeMemberLevel(scope.row)">删除</el-button>
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
      }
    },
    mounted () {
      this.GetDataList();
    },
    methods: { 
      handleFilter(){

      },
      GetDataList(){
        let that = this;
        that.listLoading = true;
        API.getBankList(this.listQuery).then(res => {
            that.List = res.rows;
            that.total = res.total;  
            that.listLoading = false;
        }).catch(err => {
            that.$message.error('抱歉，获取列表失败')   
        })
      },
      //删除
      async removeMemberLevel(row){
        let that = this;
        let data;
        let conRes = await that.$confirm('是否删除该用户银行卡信息？','提示',{
             confirmButtonText:'删除',
             cancelButtonText:'取消',
             type:'warning'
         }).then(()=>{
           API.removeBankCard(row).then(function(res){
             that.GetDataList();
           })
         }).catch(() => {
            
         });
      },
    }
  }
</script>

<style lang="scss">
  
</style>
