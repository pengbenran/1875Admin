<template>
  <div class="membershipManagerment">
    <el-row :gutter="24">
       <el-col :span="24">
          <el-input v-model="listQuery.searchParam" style="width:180px;" placeholder="请输入用户名搜索"></el-input> <el-button type="success" @click="searchGetMenberData" icon="el-icon-search">用户搜索</el-button>
       </el-col>
       <el-col :span="24"  v-loading="loading"  element-loading-text="正在查询中。。。" >
         <el-table ref="multipleTable" :data="DistributorList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="distributorId" label="分享师Id"  align="center"></el-table-column>
          <el-table-column prop="memberName" label="分享师名称"  align="center"></el-table-column>
          <el-table-column prop="lvName" label="等级"  align="center"></el-table-column>
          <el-table-column prop="balance" label="余额"  align="center"></el-table-column>
          <el-table-column prop="total" label="返佣总额"  align="center"></el-table-column>
          <el-table-column prop="withdraw" label="提现总额"  align="center"></el-table-column>
          <el-table-column prop="recommendedNum" label="推荐的人数"  align="center"></el-table-column>
          <el-table-column prop="createTime" label="添加时间"  align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
             <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="GetDistributorList" />
       </el-col>
    </el-row>

  </div>
</template>

<script>
import API from '@/api/member'
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    data () {
      return {
        loading:false,
        DistributorList:[],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total:10,
        multipleSelection:[],
      }
    },
    mounted () {
       this.GetDistributorList();
    },
    methods: {
      //获取所有的等级
      GetDistributorList(){
        let that = this;
        API.getDistributorList(Object.assign({},that.listQuery)).then(res => { 
          if(res != undefined){
            that.DistributorList = res.rows;
            that.total = res.total;
          }else{
            this.$message.error('会员列表获取失败');
          }
        }).catch(err =>{})
      },

      //删除
      handleDelete(index,row){
        let that = this;
        that.loading = true;
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {confirmButtonText: '确定',cancelButtonText: '取消', type: 'warning'
        }).then(() => {
            API.deleteDistributors({distributorId:row.distributorId}).then(res => {
              if(res.code == 0){
                  this.$message({ message: '删除成功', type: 'success'});
                  that.GetDistributorList();
              }else{
                  this.$message.error('删除失败');
              }
              that.loading = false;
            }).catch(err => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });        
          that.loading = false;  
        });
      },

      searchGetMenberData(){
        let that = this;
        that.GetDistributorList();
      },

      //多选
      handleSelectionChange(){
        let that = this;
        this.multipleSelection = val;
      },
     
    }
  }
</script>

<style lang="scss">
  
</style>
